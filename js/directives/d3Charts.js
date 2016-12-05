// code from the following tutorial:  https://github.com/EpiphanyMachine/d3AngularIntegration

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
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

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

            // setup variables
            var width, height, max;
            width = d3.select(iElement[0])[0][0].offsetWidth - 20;
              // 20 is for margins and can be changed
            height = scope.data.length * 35;
              // 35 = 30(bar height) + 5(margin between bars)
            max = 98;
              // this can also be found dynamically when the data is not static
              // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .attr("height", 30) // height of each bar
                .attr("width", 0) // initial width of 0 for transition
                .attr("x", 10) // half of the 20 side margin specified above
                .attr("y", function(d, i){
                  return i * 35;
                }) // height + margin between bars
                .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    return d.score/(max/width);
                  }); // width based on scale

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return i * 35 + 22;})
                .attr("x", 15)
                .text(function(d){return d.title;});

          };
        }
      };
    }])
    .directive('d3Lines', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          // Set the dimensions of the canvas / graph
          var margin = {top: 30, right: 20, bottom: 30, left: 50},
              width = 600 - margin.left - margin.right,
              height = 270 - margin.top - margin.bottom;
          // Adds the svg canvas
          var svg = d3.select(iElement[0])
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
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){

            // Parse the date / time
            var parseDate = d3.time.format("%d-%b-%y").parse;

            // Set the ranges
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Define the line
            var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

            // Get the data
            d3.csv("./data/data.csv", function(error, data) {
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain([0, d3.max(data, function(d) { return d.close; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            });

          };
        }
      };
    }])
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
            d3.json("https://fleemaja.github.io/corporate_dashboard/data/cities.json", function(error, mData) {
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
                   .style("fill", "#b0c4de")
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

          };
        }
      };
    }]);

}());
