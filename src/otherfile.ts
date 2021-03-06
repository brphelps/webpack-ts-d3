import * as d3 from 'd3';
import * as $ from 'jquery';

let url: string = <any>require("./data.tsv");
$("body").append($("<svg class=\"chart\"></svg>"));


function type(d: any) {
    d.value = +d.value; // coerce to number
    return d;
}

var width = 960,
    height = 500;

var y = d3.scaleLinear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.tsv(url, type, (error, data) => {

    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .attr("width", barWidth - 1);

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function (d) { return y(d.value) + 3; })
        .attr("dy", ".75em")
        .text(function (d) { return d.value; });



    d3.selectAll(".chart rect").style("fill", "steelblue");
    d3.selectAll(".chart text").style("fill", "white")
        .style("font", "10px sans-serif")
        .style("text-anchor", "end");

});
