//MOVIES LIST AND GROUP
//Bottle Rocket - 1,
//Rushmore - 2,
//Royal Tenenbaums - 3,
// The Life Aquatic with Steve Zissou - 4,
// The Darjeeling Limited - 5,
// Fantastic Mr. Fox - 6,
// Moonrise Kingdom - 7,
// The Grand Budapest Hotel - 8,
// Isle of Dogs 0 9


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// choosing the colors for the graph (align with the movie list & group)
var color = ['#CFB791','#153F33','#B61219','#D39F3C', '#3E89A8', '#AA4C26', '#649488', '#C47594', '#C8D1CE', '#c5c6c8'];

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("anderson.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", function(d){if(d.group < 10){return "node movie"}else{return "node actor"}})
      .attr("r", function(d) { if(d.group < 10){return "15"}else{return "10"} })
      .attr("fill", function(d) { return color[d.group - 1]; }) //
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.5).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
