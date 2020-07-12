const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let dataset = [];
fetch(url)
    .then(res => res.json())
    .then(data => {
        dataset = data.data;
        console.log(dataset);
    })
    .catch(err => console.log(err));



const w = 800;
const h = 500;
const padding = 50;

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
