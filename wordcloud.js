
const drawViz = (data, element, config) => {
  element.innerHTML = "";
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const words = data.tables.DEFAULT.map(row => ({
    text: row["wordField"] ? row["wordField"].value : "",
    size: row["sizeField"] ? +row["sizeField"].value * 10 : 10
  }));

  const svg = d3.select(element)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(words)
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * 90)
    .fontSize(d => d.size)
    .on("end", draw);

  layout.start();

  function draw(words) {
    svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("fill", "#61dafb")
      .attr("text-anchor", "middle")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }
};
