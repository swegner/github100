// Tutorial: http://bost.ocks.org/mike/bar/

(function ($, d3) {
  "use strict";

  $(document).ready(function() {

    var data = [ 4, 3, 2, 10, 5, 7, 9 ];


    // Selections!
    d3.selectAll("section")
      .append("div")
        .style("color", "white")
        .style("background-color", "black")
        .html("Hello, world!");


    // Generated Bar Chart
    var scaleWidth = 500;
    var scale = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, scaleWidth]);

    d3.select("#generatedBarChart")
      .selectAll("div")
        .data(data)
      .enter().append("div")
        .style("width", function(d) { return scale(d) + "px"; })
        .text(function(d) { return d; });


    // Generated SVG Bar Chart
    var barheight = 20;

    var svgBarSelect = d3.select("#generatedSvgBarChart")
      .append("svg")
        .attr("class", "chart")
        .attr("width", scaleWidth)
        .attr("height", barheight * data.length)
        .selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + barheight * i + ")"; });

    svgBarSelect.append("rect")
      .attr("height", barheight - 1)
      .attr("width", scale);

    svgBarSelect.append("text")
      .attr("y", (barheight - 1) / 2)
      .attr("dy", ".35em")
      .attr("x", function(d) { return scale(d) - 3; })
      .text(function(d) { return d; });
  });
})(jQuery, d3);
