const w = 825;
const h = 400;
const padding = 30;
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let dataset = [];


const svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

const title = svg.append('text')
    .attr('x', 400)
    .attr('y', padding)
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text("United States GDP");

fetch(url)
    .then(res => res.json())
    .then(data => {
        dataset = data.data;

        const xScale = d3.scaleLinear();
        xScale.domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])]);
        xScale.range([padding, w - padding]);

        const yScale = d3.scaleLinear();
        yScale.domain([0, d3.max(dataset, d => d[1])]);
        yScale.range([0, h - padding]);

        const rect = svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('width', 2)
            .attr('height', d => yScale(d[1]))
            .attr('x', (d, i) => padding + i * 2.78)
            .attr('y', d => h - padding - yScale(d[1]))
            .attr('fill', 'green');

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${h - padding})`)
            .call(xAxis);

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${padding}, 0)`)
            .call(yAxis);
    })
    .catch(err => console.log(err));


// ignore
// const xAxis = d3.axisBottom(xScale);
// const yAxis = d3.axisLeft(yScale);

// svg.append('g')
//     .attr('id', 'x-axis')
//     .attr('transform', `translate(0, ${h - padding})`)
//     .call(xAxis);

// svg.append('g')
//     .attr('id', 'y-axis')
//     .attr('transform', `translate(${padding}, 0)`)
//     .call(yAxis);
