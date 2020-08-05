// declare the public object
var myfunctions = myfunctions || {};

// now we can use this object to build our extensible barchart
myfunctions.barchart = function() {
    // we have default values still
    var data = [4, 8, 15, 16, 23, 42];
    var _data = function(_) {
        if (!arguments.length) return data;
        data = _;
        return myfunctions.barchart;
    }
    var width = 300;
    var _width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return myfunctions.barchart;
    }
    var barHeight = 20;
    var _barHeight = function(_) {
        if (!arguments.length) return barHeight;
        barHeight = _;
        return myfunctions.barchart;
    }

    var _plot = function(selection) {
        var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        // clear current svgs (this is optional)
        selection.selectAll("svg").remove();

        var chart = selection.append("svg")
            .attr("class", "chart")
            .attr("width", width)
            .attr("height", barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", x)
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function(d) { return x(d) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });

        return myfunctions.barchart;
    }

    var public = {"plot": _plot,
                  "data": _data,
                  "width": _width,
                  "barHeight": _barHeight,
                 };

    return public;
};

