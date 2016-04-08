"use strict";

var width = 960,
    height = 500;

var margin = {
    top: 25,
    left: 5
};

var rect = {
    width: 19.2,
    height: 50
};

var xDomain = 50;

var proportion = width / xDomain;

var y = d3.scale.linear()
    .domain([0, 1])
    .range([height, 0]);

var x = d3.scale.linear()
    .domain([0, xDomain])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(height)
    .ticks(xDomain / 2)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(width)
    .orient("right")
    .tickFormat("");

var svg = d3.select("svg")
    .attr("width", 0)
    .attr("height", 0)
    .append("g")
    .attr("transform", "translate(0, " + margin.top + ")");

var gy = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .call(yAxis);

var gx = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.left + ", " + height + ")")
    .call(xAxis);

var bar = svg.append("g")
    .attr("class", "bar")
    .attr("transform", "translate(5, " + (height - rect.height) + ")");

function pintar_proceso(proceso, length) {
    var svgHeight = Number(d3.select("svg").attr("height"));
    var svgWidth = Number(d3.select("svg").attr("width"));
    var rectY = -(height - (rect.height * length));

	d3.select("svg").attr("height", svgHeight + rect.height + 6);
	d3.select("svg").attr("width", svgWidth + (rect.width * proceso.rafaga) + 6);

    if (svgWidth > width) {
        x.domain([0, (svgWidth + 200) / proportion])
            .range([0, svgWidth + 200]);

        xAxis.scale(x)
            .ticks((svgWidth + 200) / proportion / 2)

        gx.call(xAxis);

        yAxis.tickSize(svgWidth + 200);
        gy.call(yAxis);
    }

    if (svgHeight > height) {

    }

    bar.append("rect")
	    .attr("class", "restante proceso-" + (length - 1))
	    .attr("x", proceso.llegada * rect.width) //x=5-->155
	    .attr("y", rectY)
	    .attr("width", proceso.retorno * rect.width)
	    .attr("height", rect.height);

	bar.append("rect")
	    .attr("class", "espera proceso-" + (length - 1))
	    .attr("x", proceso.llegada * rect.width) //x=5-->155
	    .attr("y", rectY)
	    .attr("width", proceso.espera * rect.width)
	    .attr("height", rect.height);

	bar.append("rect")
	    .attr("class", "ejecucion proceso-" + (length - 1))
	    .attr("x", proceso.comienzo * rect.width) //x=5-->155
	    .attr("y", rectY)
	    .attr("width", proceso.rafaga * rect.width)
	    .attr("height", rect.height)

    bar.append("text")
        .attr("class", 'texto-nombre proceso-' + (length - 1))
	    .attr("x", (proceso.llegada * rect.width) + 40)
	    .attr("y", rectY + 28)
	    .text(proceso.nombre);

    var textoEspera = bar.append("text")
        .attr("class", 'texto-espera proceso-' + (length - 1))
        .attr("x", (proceso.llegada * rect.width) + 5)
        .attr("y", rectY + 28);

    if (proceso.espera > 0) {
        textoEspera.text(proceso.espera);
    }

    bar.append("text")
        .attr("class", 'texto-rafaga proceso-' + (length - 1))
	    .attr("x", (proceso.comienzo * rect.width) + 5)
	    .attr("y", rectY + 28)
	    .text(proceso.rafaga);

    bar.append("text")
	    .attr("class", 'texto-restante proceso-' + (length - 1))
	    .attr("y", rectY + 28);
}
