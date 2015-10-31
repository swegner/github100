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
    var chartHeight = 300;

    var generatedBarChart = d3.select("#generatedBarChart")
      .attr("width", chartWidth);

    var svgBarChart = d3.select("#generatedSvgBarChart")
      .attr("width", chartWidth);

    var svgColumnChart = d3.select("#generatedSvgColumnChart")
      .attr("height", chartHeight);

    d3.tsv("dataset.tsv",
      function(d) { d.value = +d.value; return d; },
      function(error, data) {

      // Generated Bar Chart
      var maxDataVal = d3.max(data, function(d) { return d.value; });
      var horizontalScale = d3.scale.linear()
        .domain([0, maxDataVal])
        .range([0, chartWidth]);

      var verticalScale = d3.scale.linear()
        .domain([0, maxDataVal])
        .range([chartHeight, 0]);

      generatedBarChart
        .selectAll("div")
          .data(data)
        .enter().append("div")
          .style("width", function(d) { return horizontalScale(d.value) + "px"; })
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
        .attr("width", function(d) { return horizontalScale(d.value); });

      svgBarSelect.append("text")
        .attr("y", (barheight - 1) / 2)
        .attr("dy", ".35em")
        .attr("x", function(d) { return horizontalScale(d.value) - 3; })
        .text(function(d) { return d.value; });


        // Generated SVG Column chart
        var barWidth = 20;

        var svgColSelect = svgColumnChart
          .attr("width", barWidth * data.length)
          .selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + (i * barWidth) + ",0)"; });

        svgColSelect.append("rect")
          .attr("y", function(d) { return verticalScale(d.value); })
          .attr("width", barWidth - 1)
          .attr("height", function(d) { return chartHeight - verticalScale(d.value); });

        svgColSelect.append("text")
          .attr("x", (barWidth) / 2)
          .attr("dy", ".75em")
          .attr("y", function(d) { return verticalScale(d.value) + 3; })
          .text(function(d) { return d.value; });
      });
    });
  })(jQuery, d3);
