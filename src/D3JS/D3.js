import React, { useEffect } from 'react';
import '../App.scss';
import * as d3 from 'd3';

function D3() {
  useEffect(() => {
    const data = [
      { title: 'Red', budget: 300 },
      { title: 'Blue', budget: 50 },
      { title: 'Yellow', budget: 100 }
    ];

    const width = 960,
      height = 450,
      radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select('#d3Chart')
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.budget);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    outerArc.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.title));

    outerArc.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(d => `${d.data.title}: ${d.data.budget}`);

    const key = d => d.data.title;

    function randomData() {
      return data.map(d => ({ ...d, budget: Math.random() * 1000 }));
    }

    d3.select(".randomize")
      .on("click", () => change(randomData()));

    function change(data) {
      const slice = svg.selectAll("path.slice")
        .data(pie(data), key);

      slice.enter()
        .insert("path")
        .style("fill", d => color(d.data.title))
        .attr("class", "slice");

      slice.transition().duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return t => arc(interpolate(t));
        });

      slice.exit().remove();

      const text = svg.selectAll("text")
        .data(pie(data), key);

      text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(d => d.data.title);

      text.transition().duration(1000)
        .attrTween("transform", function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return t => `translate(${arc.centroid(interpolate(t))})`;
        })
        .styleTween("text-anchor", function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return t => (d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? "start" : "end";
        });

      text.exit().remove();

      const polyline = svg.selectAll("polyline")
        .data(pie(data), key);

      polyline.enter()
        .append("polyline");

      polyline.transition().duration(1000)
        .attrTween("points", function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return t => {
            const d2 = interpolate(t);
            const pos = arc.centroid(d2);
            pos[0] = radius * 0.95 * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), arc.centroid(d2), pos];
          };
        });

      polyline.exit().remove();
    }
  }, []);

  return (
    <div>
      <div id="d3Chart"></div>
      <button className="randomize">Randomize Data</button>
    </div>
  );
}

export default D3;