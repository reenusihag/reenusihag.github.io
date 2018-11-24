//Credit to Siddharth Parmar at https://codepen.io/Siddharth11/pen/LVQmjN
const dataset = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

//let colors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd'];
//let colors = ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'];
//const colors = ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']

 colors = ['#0B00FF', '#0097FF', '#00FFF0', '#00FF74', '#0BFF00', '#FFF900', '#FF5500', '#FF0500', '#FF007F', '#B800FF']
  mcolors =['#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3','#d3d3d3']
//'#FF004C', #FF00D9


const content = [
    'Heard', 'Studied', 'Practiced', 'Applied', 'Project', 'Tester', 'Mentor', 'Product', 'Research', 'Ninja'
];

const width = document.querySelector('.chart-wrapper').offsetWidth
const height = document.querySelector('.chart-wrapper').offsetHeight
const minOfWH = Math.min(width, height) / 2;
const initialAnimDelay = 300
const arcAnimDelay = 150
const arcAnimDur = 3000
const secDur = 1000
const secIndividualdelay = 150

let mmm= window.innerWidth;

let radius =200;

// calculate minimum of width and height to set chart radius
if (mmm < 650) {
    radius = 100;
} else {
    radius =150;
}

// append svg
let svg = d3.select('.chart-wrapper').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'pieChart')
    .append('g')

svg.attr('transform', `translate(${width / 2}, ${height / 2})`);

// for drawing slices
let arc = d3.arc()
    .outerRadius(radius * 0.6)
    .innerRadius(radius * 0.45)

// for labels and polylines
let outerArc = d3.arc()
    .innerRadius(radius * 0.85)
    .outerRadius(radius * 0.85)

// d3 color generator
//let c10 = d3.scaleOrdinal(d3.schemeCategory10);
//console.log(radius/8);
let pie = d3.pie()
    .value(d => d)
//console.log(minOfWH/8);
let draw = function() {

    svg.append("g").attr("class", "lines")
    svg.append("g").attr("class", "slices")
    svg.append("g").attr("class", "labels")

    // define slice
    let slice = svg.select('.slices')
        .datum(dataset)
        .selectAll('path')
        .data(pie)

    slice.enter()
        .append('path')
        .attrs({
            'fill': (d, i) => colors[i],
            'd': arc,
            'transform': (d, i) => 'rotate(-180, 0, 0)'
        })
        .attr('stroke-width', (d, i) => `${radius / 8}px`) // resize properly
        .style('opacity', 0)
        .transition()
        .delay((d, i) => (i * arcAnimDelay) + initialAnimDelay)//
        .duration(arcAnimDur)
        .ease(d3.easeElastic)
        .style('opacity', 1)
        .attr('transform', 'rotate(0,0,0)')


    svg.selectAll('path')
        .datum(dataset)
        .transition()
        .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
        .duration(secDur)
        .attr('stroke-width', '5px')

    let midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2

    let text = svg.select(".labels")
        .selectAll("text")
        .data(pie(dataset))

    text.enter()
        .append('text')
        .attr('dy', '0.35em')
        .style("opacity", 0)
        .style("font-size",16.4)


        .style('fill', (d, i) => mcolors[i])
        .text((d, i) => content[i])
        .attr('transform', d => {
            // calculate outerArc centroid for 'this' slice
            let pos = outerArc.centroid(d)
            // define left and right alignment of text labels
            pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
            return `translate(${pos})`
        })
        .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")
        .transition()
        .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
        .duration(secDur)
        .style('opacity', 1)

    let polyline = svg.select(".lines")
        .selectAll("polyline")
        .data(pie(dataset))

    polyline.enter()
        .append("polyline")
        .style("opacity", 0.5)
        .attr('points', d => {
            let pos = outerArc.centroid(d)
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
            return [arc.centroid(d), arc.centroid(d), arc.centroid(d)]
        })
        .transition()
        .duration(secDur)
        .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
        .attr('points', d => {
            let pos = outerArc.centroid(d)
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
            return [arc.centroid(d), outerArc.centroid(d), pos]
        })
}



let removeChart = () => {

    svg.selectAll('.slices').transition()
        .ease(d3.easeBack)
        .duration(500)
        .delay(0)
        .style('opacity', 0)
        .attr('transform', 'translate(0, 250)')
        .remove()

    svg.selectAll('.lines')
        .transition()
        .ease(d3.easeBack)
        .duration(500)
        .delay(100)
        .style('opacity', 0)
        .attr('transform', 'translate(0, 250)')
        .remove()

    svg.selectAll('.labels')
        .transition()
        .ease(d3.easeBack)
        .duration(500)
        .delay(200)
        .style('opacity', 0)
        .attr('transform', 'translate(0, 250)')
        .remove()

    //setTimeout(draw, 800)
}


var controller = new ScrollMagic.Controller();

var pieScene = new ScrollMagic.Scene({
    triggerElement: '.chart-wrapper',
    triggerHook: .7,
    duration: '150%',
})
    .on('enter', function() {
        draw();
        //this.off('enter');  // don't remove chart ever
    })
    .on('leave', function() {
        removeChart();
    })
    //  .addIndicators()
    .addTo(controller);
