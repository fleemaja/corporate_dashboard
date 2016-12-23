(function () {
  'use strict';

  angular.module('corporateDashboard.directives')
    .directive('locationMap', ['d3', function(d3) {
      return {
        restrict: 'E',
        scope: {
          data: "="
        },
        link: function(scope, iElement, iAttrs) {
          // Set the dimensions of the canvas / graph
          var width = parseInt(d3.select('#map').style('width')),
              mapRatio = 0.5,
              height = width * mapRatio;
          // Adds the svg canvas
          var svg = d3.select(iElement[0])
              .append("svg")
                  .attr("width", width)
                  .attr("height", height)
              .append("g")

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
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){

            if (data) {
              var projection = d3.geo.mercator()
                  .translate([4*width/5, height + (height/8)])
                  .scale(width/3);

              var path = d3.geo.path()
                  .projection(projection);

              var g = svg.append("g");

              // Define the div for the tooltip
              var div = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              g.selectAll("path")
                    .data(topojson.object(data, data.objects.countries)
                        .geometries)
                  .enter()
                    .append("path")
                    .attr("d", path)

              // load and display the meteor strikes
              d3.json("./data/cities.json", function(error, mData) {
                  var rangeVals = width < 500 ? [5, 15] : [10, 30];
                  rangeVals = width < 1200 ? rangeVals : [20, 50];
                  var rscale = d3.scale.linear()
                    .domain([1, 700])
                    .range(rangeVals);

                  g.selectAll("circle")
                     .data(mData)
                     .enter()
                     .append("circle")
                     .attr("class", "meteor")
                     .attr("cx", function(d) {
                             return projection([d['coordinates'][1], d['coordinates'][0]])[0];
                     })
                     .attr("cy", function(d) {
                             return projection([d['coordinates'][1], d['coordinates'][0]])[1];
                     })
                     .attr("r", function(d) {
                       return rscale(d['numberOfEmployees']);
                     })
                     .style("fill", "#4682b4")
                     .on("mouseover", function(d) {
                       div.transition()
                          .duration(200)
                          .style("opacity", .9);
                       div.html('<strong>City</strong>: ' + d['city'] + '<br/><strong>Number of Employees</strong>: ' + d['numberOfEmployees'])
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function(d) {
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);
                      });
              });
            }
          };
        }
      };
    }]);
}());
