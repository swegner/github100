// Tutorial: http://bost.ocks.org/mike/bar/

(function ($, d3) {
  $(document).ready(function() {

    d3.selectAll("section")
      .append("div")
        .style("color", "white")
        .style("background-color", "black")
        .html("Hello, world!");
  });
})(jQuery, d3);
