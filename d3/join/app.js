// Join tutorial: http://bost.ocks.org/mike/join/

app = (function(d3, window) {

  var options = {
    "chartWidth": 700,
    "chartHeight": 500,
    "maxRadius": 10,
    "maxElements": 50
  };

  var rScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, options.maxRadius]);

  var xScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, options.chartWidth]);

  var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, options.chartHeight]);

  var svg = d3
    .select("#join-demo")
    .attr("width", options.chartWidth)
    .attr("height", options.chartHeight);

  function generateData() {

    var numElements = Math.floor(options.maxElements * Math.random());
    var data = [];
    for (var i = 0; i < numElements; i++) {
      data[i] = {
        "radius": Math.random(),
        "x": Math.random(),
        "y": Math.random()
      };
    }

    console.log("generated " + numElements + " data points");
    return data;
  }

  function renderCircles() {
    data = generateData();

    var circles = svg.selectAll("circle")
      .data(data);

    circles.enter().append("circle");

    circles.exit()
      .transition()
        .attr("r", 0)
        .remove();

    circles
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("r", 0)
      .transition()
        .attr("r", function(d) { return rScale(d.radius); });
  }

  return {
    'render': renderCircles
  };

})(d3, window);
