var barchartsvg = d3.select("#mybarchart").append("svg")
    .attr("height",300)
    .attr("width",300);

var timeseriessvg = d3.select("#mytimeseries").append("svg")
    .attr("height",300)
    .attr("width",600);

d3.csv("data/Mag6PlusEarthquakes_1900-2013.csv",function(data) {
    
    console.log(data);

    var mag = data.map(function(d) { return +d.mag; }).filter(function(d) { return d > 0; });
    
    var barx = d3.scaleLinear()
        .domain(d3.extent(mag))
        .rangeRound([40, 300]);

    console.log(d3.extent(mag));

    var bins = d3.histogram()
        .domain(barx.domain())
        .thresholds(barx.ticks(20))
    (mag);

    console.log(bins);

    var bary = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([280, 10]);

    var bar = barchartsvg.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + barx(d.x0) + "," + bary(d.length) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", barx(bins[0].x1) - barx(bins[0].x0) - 1)
        .attr("height", function(d) { return 280 - bary(d.length); })
        .attr("fill","red")
        .on("click",function(d,i) {
            console.log("clicked");
            // console.log(d);
            // console.log(i);
            // the variable d is an array, and d3.histogram also gave us
            // the x0, x1 attributes on the array
            var range = [d.x0,d.x1];
            
            // here's one way to show just the ones we want, using visibility style
            // d3.selectAll("circle").style("visibility","hidden");
            // d3.selectAll("circle").filter(function(d,i) {
            //     return (mag[i] > range[0]) && (mag[i] < range[1]);
            // })
            //     .style("visibility","visible");
            
            // another way, using the opacity. this leaves
            // the ones behind with a small amount of opacity, so we can just
            // barely see them
            d3.selectAll("circle").style("opacity",0.01);
            d3.selectAll("circle").filter(function(d,i) {
                return (mag[i] > range[0]) && (mag[i] < range[1]);
            })
                .style("opacity",0.3);

            // yet another way, by adjusting the cy attribute
            // this time, we don't use a filter either (see the diff)
            // d3.selectAll("circle").transition()
            //     .attr("cy",function(d,i) {
            //         if ((mag[i] > range[0]) && (mag[i] < range[1])) {
            //             return timey(mag[i]);                    
            //         }
            //         else {
            //             return timey(mag[i]+7);
            //         }});

            // same, but fancier, for fun
            // d3.selectAll("circle").transition()
            //     .attr("cy",function(d,i) {
            //         return ((mag[i] > range[0]) && (mag[i] < range[1])) ? timey(mag[i]) : timey(mag[i]+7);
            //     });
        });

    // bar.append("text")
    //     .attr("dy", ".75em")
    //     .attr("y", 6)
    //     .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
    //     .attr("text-anchor", "middle")
    //     .text(function(d) { return formatCount(d.length); });

    barchartsvg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + 280 + ")")
        .call(d3.axisBottom(barx));

    barchartsvg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(40," + 00 + ")")
        .call(d3.axisLeft(bary));

    // var format = d3.timeFormat("");

    var times = data.filter(function(d) { return (+d.mag) > 0; }).map(function(d) { return d3.isoParse(d.time); });

    var timex = d3.scaleLinear()
        .domain(d3.extent(times))
        .range([40, 600]);

    var timey = d3.scaleLinear()
        .domain(d3.extent(mag))
        .range([280,10]);

    timeseriessvg.selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",function(d,i) { return timex(times[i]); })
        .attr("cy",function(d,i) { return timey(mag[i]); })
        .attr("r",4)
        .attr("fill","red")
        .style("opacity",0.3);

    timeseriessvg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + 280 + ")")
        .call(d3.axisBottom(timex).tickFormat(d3.timeFormat("%Y")));

    timeseriessvg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(40," + 00 + ")")
        .call(d3.axisLeft(timey));
});
