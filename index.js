import { select, selectAll } from "d3-selection";
import { csv, svg } from "d3-fetch";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { axisLeft } from "d3-axis";

select("svg")
  .append("g")
  .attr("class", "overallG")
  .attr("transform", "translate(90, 15)");

csv(require("./data/cities.csv")).then((data) => {
  console.log(data);
  vizData("g.overallG", data);
});

function vizData(tagRaiz, inconmingData) {
  let maxPopulation = max(inconmingData, (d) => {
    return +d.population;
  });

  let yScale = scaleLinear().domain([0, maxPopulation]).range([0, 480]);
  let yScaleAxis = scaleLinear().domain([maxPopulation, 0]).range([0, 480]);
  let yAxis = axisLeft(yScaleAxis).ticks(20).tickSize(-300).tickPadding(3);

  select(tagRaiz)
    .append("g")
    .attr("transform", "translate(-10, -5)")
    .attr("id", "yAxisG")
    .style("opacity", 0.7)
    .call(yAxis);

  select(tagRaiz)
    .selectAll("rect")
    .data(inconmingData)
    .enter()
    .append("rect")
    .attr("y", (d) => {
      return 473 - yScale(+d.population);
    })
    .attr("width", 20)
    .attr("height", (d) => {
      return yScale(+d.population);
    })
    .attr("x", (d, i) => {
      return i * 25;
    })
    .style("fill", "#592e83");
}
