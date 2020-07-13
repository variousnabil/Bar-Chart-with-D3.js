const w = 925;
const h = 600;
const paddingHorizontal = 75;
const paddingVertical = 30;
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let dataset = [];
const arrYears = [];
for (let i = 1950; i <= 2015; i += 5) {
    arrYears.push(i);
}
console.log(arrYears);

const svg = d3.select('.container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

const title = svg.append('text')
    .attr('x', 450)
    .attr('y', paddingVertical)
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text("United States GDP");

fetch(url)
    .then(res => res.json())
    .then(data => {
        dataset = data.data;

        const xScale = d3.scaleTime();
        xScale.domain(d3.extent(dataset, d => new Date(d[0])));
        xScale.range([paddingHorizontal, w - paddingHorizontal]);

        const yScale = d3.scaleLinear();
        yScale.domain([0, d3.max(dataset, d => d[1])]);
        yScale.range([0, h - (paddingVertical * 4)]);

        const yAxisScale = d3.scaleLinear();
        yAxisScale.domain([0, d3.max(dataset, d => d[1])]);
        yAxisScale.range([h - (paddingVertical * 4), 0]);

        const rect = svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('width', 2)
            .attr('height', d => yScale(d[1]))
            .attr('x', (d, i) => paddingHorizontal + i * 2.82)
            .attr('y', d => h - paddingVertical * 2 - yScale(d[1]))
            .attr('fill', 'green')
            .attr('class', 'bar');

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yAxisScale);

        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${h - paddingVertical * 2})`)
            .call(xAxis);

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${paddingHorizontal}, ${paddingVertical * 2})`)
            .call(yAxis);
    })
    .catch(err => console.log(err));
