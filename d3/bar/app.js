// Tutorial: http://bost.ocks.org/mike/bar/

(function ($, d3) {
  $(document).ready(function() {
    var section = d3.selectAll("section");
    var div = section.append("div");
    div.html("Hello, world!");
  });
})(jQuery, d3);
