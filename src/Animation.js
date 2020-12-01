import React, { Component } from "react";
import * as d3 from "d3";

const data = [
  { name: "Medellín", index2005: 3, index2006: 33 },
  { name: "Cali", index2005: 39, index2006: 45 },
  { name: "Bogotá", index2005: 7, index2006: 31 },
  { name: "Pereira", index2005: 35, index2006: 36 },
  { name: "Bucaramanga", index2005: 16, index2006: 23 },
  { name: "Cúcuta", index2005: 45, index2006: 45 },
  { name: "Armenia", index2005: 6, index2006: 16 },
];

const width = 700;
const height = 500;
const margin = { top: 10, left: 100, bottom: 40, right: 10 };
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

class Animation extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const canvas = d3.select(this.refs.canvas);

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 50]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "#29B6F6")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.index2005))
      .attr("height", (d) => iheight - y(d.index2005))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    d3.select("#d2006").on("click", function () {
      d3.selectAll("rect")
        .transition()
        .attr("class", "bar")
        .style("fill", "#01579B")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2006))
        .attr("height", (d) => iheight - y(d.index2006))
        .attr("width", x.bandwidth());
    });

    d3.select("#d2005").on("click", function () {
      d3.selectAll("rect")
        .transition()
        .attr("class", "bar")
        .style("fill", "#29B6F6")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2005))
        .attr("height", (d) => iheight - y(d.index2005))
        .attr("width", x.bandwidth());
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div ref="canvas"></div>
          <button id="d2006">Revisar datos 2006</button>
          <button id="d2005">Revisar datos 2005</button>
        </div>
      </div>
    );
  }
}

export default Animation;
