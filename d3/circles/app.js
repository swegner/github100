// Circles tutorial: http://bost.ocks.org/mike/circles/

(function(d3) {
  // Selecting elements
  var circles = d3.selectAll("circle");
  circles
    .style("fill", "steelblue")
    .attr("r", 30)
    .attr("cx", function() { return Math.random() * 720; });
})(d3);
