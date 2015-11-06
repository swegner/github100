// Join tutorial: http://bost.ocks.org/mike/join/

app = (function(d3, window) {

  var chartWidth = 700;
  var chartHeight = 500;

  var svg = d3.select("#join-demo");
  svg
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("circle")
      .attr("r", 5)
      .attr("cx", 50)
      .attr("cy", 50);

  function renderCircles() {
    window.alert('rendering!');
  }

  return {
    'render': renderCircles
  };

})(d3, window);
