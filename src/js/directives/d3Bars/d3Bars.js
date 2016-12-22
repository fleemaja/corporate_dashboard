(function () {
  'use strict';

  angular.module('corporateDashboard.directives')
  .directive('d3Bars', ['d3', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        data: "=",
        label: "@",
        onClick: "&"
      },
      link: function(scope, iElement, iAttrs) {
        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 40, bottom: 30, left: 40},
            width = parseInt(d3.select('#bar-chart').style('width')) - margin.left - margin.right,
            mapRatio = width > 500 ? 0.5 : 1,
            height = (width * mapRatio) - margin.top - margin.bottom;
        // Adds the svg canvas
        var chart = d3.select(iElement[0])
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

        // on window resize, re-render d3 canvas
        window.onresize = function() {
          return scope.$apply();
        };
        
        scope.$watch(function(){
            return angular.element(window)[0].innerWidth;
          }, function(){
            return scope.render(scope.data);
          }
        );

        // watch for data changes and re-render
        scope.$watch('data', function() {
          return scope.render(scope.data);
        }, true);

        // define render function
        scope.render = function(data){

          if (data) {
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            x.domain(data.map(function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.numIssues; })]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            chart.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.date); })
                .attr("y", height)
                .attr("height", 0)
                .transition()
  			        .duration(500)
                .attr("y", function(d) { return y(d.numIssues); })
                .attr("height", function(d) { return height - y(d.numIssues); })
                .attr("width", x.rangeBand());

            chart.append("text")
              .attr("x", (width / 2))
              .attr("y", 0 - (margin.top / 2))
              .attr("text-anchor", "middle")
              .style("font-size", "16px")
              .text("Reported Issues Over Time");

            function type(d) {
              d.value = +d.value; // coerce to number
              return d;
            }
          };
        }
      }
    };
  }])
}());
