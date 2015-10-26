// Tutorial: http://bost.ocks.org/mike/bar/

(function ($, d3) {
  $(document).ready(function() {
    var body = d3.select("body");
    var div = body.append("div");
    div.html("Hello, world!");
  });
})(jQuery, d3);
