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

    var margin = {
      top: 15,
      left: 20,
      right: 20,
      bottom: 15,
    };

    var outerWidth = 500;
    var outerHeight = 300;

    var chartWidth = outerWidth - margin.left - margin.right;
    var chartHeight = outerHeight - margin.top - margin.bottom;

    var generatedBarChart = d3.select("#generatedBarChart")
      .attr("width", chartWidth);

    var svgColumnChart = d3.select("#generatedSvgColumnChart")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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


      // Generated SVG Column chart
      var labelScale = d3.scale.ordinal()
        .domain(data.map(function(d) { return d.name; }))
        .rangeRoundBands([0, chartWidth], 0.1);

      var svgColSelect = svgColumnChart
          .selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + labelScale(d.name) + ",0)"; });

        svgColSelect.append("rect")
          .attr("y", function(d) { return verticalScale(d.value); })
          .attr("width", labelScale.rangeBand())
          .attr("height", function(d) { return chartHeight - verticalScale(d.value); });

        svgColSelect.append("text")
          .attr("x", labelScale.rangeBand() / 2)
          .attr("dy", ".75em")
          .attr("y", function(d) { return verticalScale(d.value) + 3; })
          .text(function(d) { return d.value; });
      });
    });
  })(jQuery, d3);
