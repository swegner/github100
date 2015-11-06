// Circles tutorial: http://bost.ocks.org/mike/circles/

(function(d3) {
  // Selecting elements
  var data = [12, 45, 72];
  var circle = d3.select("#circle-demo");

  circle.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .style("fill", "steelblue")
      .attr("cy", 60)
      .attr("cx", function(d, i) { return (720/3) * i + Math.random() * 100; })
      .attr("r", function(d) { return Math.sqrt(d); });

})(d3);
