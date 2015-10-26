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
    d3.select("#generatedBarChart")
      .selectAll("div")
        .data(data)
      .enter().append("div")
        .style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; });
  });
})(jQuery, d3);
