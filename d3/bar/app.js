// Tutorial: http://bost.ocks.org/mike/bar/

(function ($, d3) {
  "use strict";

  $(document).ready(function() {

    // Selections!
    d3.selectAll("section")
      .append("div")
        .style("color", "white")
        .style("background-color", "black")
        .html("Hello, world!");

    var chartWidth = 500;

    var generatedBarChart = d3.select("#generatedBarChart")
      .attr("width", chartWidth);

    var svgBarChart = d3.select("#generatedSvgBarChart")
      .attr("width", chartWidth);

    d3.tsv("dataset.tsv",
      function(d) { d.value = +d.value; return d; },
      function(error, data) {

      // Generated Bar Chart
      var scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([0, chartWidth]);

      generatedBarChart
        .selectAll("div")
          .data(data)
        .enter().append("div")
          .style("width", function(d) { return scale(d.value) + "px"; })
          .text(function(d) { return d.value; });


      // Generated SVG Bar Chart
      var barheight = 20;

      var svgBarSelect = svgBarChart
        .attr("height", barheight * data.length)
        .selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + barheight * i + ")"; });

      svgBarSelect.append("rect")
        .attr("height", barheight - 1)
        .attr("width", function(d) { return scale(d.value); });

      svgBarSelect.append("text")
        .attr("y", (barheight - 1) / 2)
        .attr("dy", ".35em")
        .attr("x", function(d) { return scale(d.value) - 3; })
        .text(function(d) { return d.value; });
      });
    });
  })(jQuery, d3);
