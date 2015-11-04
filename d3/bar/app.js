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
      top: 25,
      left: 30,
      right: 30,
      bottom: 25,
    };

    var outerWidth = 500;
    var outerHeight = 300;

    var chartWidth = outerWidth - margin.left - margin.right;
    var chartHeight = outerHeight - margin.top - margin.bottom;

    var chart = d3.select("#generatedSvgColumnChart")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("dataset.tsv",
      function(d) { d.value = +d.value; return d; },
      function(error, data) {

      // Generated Bar Chart
      var maxDataVal = d3.max(data, function(d) { return d.value; });

      var yScale = d3.scale.linear()
        .domain([0, maxDataVal])
        .range([chartHeight, 0]);


      // Generated SVG Column chart
      var xScale = d3.scale.ordinal()
        .domain(data.map(function(d) { return d.name; }))
        .rangeRoundBands([0, chartWidth], 0.1);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

      chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("values");

      var svgColSelect = chart
          .selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.name); })
            .attr("y", function(d) { return yScale(d.value); })
            .attr("height", function(d) { return chartHeight - yScale(d.value); })
            .attr("width", xScale.rangeBand());
      });
    });
  })(jQuery, d3);
