// Define city locations
const cities = {
    'Lisbon': { latitude: 38.7223, longitude: -9.1393 },
    'Berlin': { latitude: 52.5200, longitude: 13.4050 },
    'Bonn': { latitude: 50.7374, longitude: 7.0982 },
    'Shanghai': { latitude: 31.2304, longitude: 121.4737 },
    'New Delhi': { latitude: 28.6139, longitude: 77.2090 }
};

const svgMarker = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>')}`;
const markerWidth = 20;
const markerHeight = 30;

function drawMap() {
    const svgContainer = d3.select("#my_dataviz");
    svgContainer.selectAll("*").remove();

    // Get the panel element
    const panel = document.getElementById('panel-1');
    
    // Use the panel's dimensions for the SVG container
    const containerWidth = panel.clientWidth;
    const containerHeight = panel.clientHeight;
    
    let zoomScale = containerWidth / (1.2 * Math.PI);
    if (window.innerWidth <= 768) { // Assuming 768px is a breakpoint for phones
        zoomScale = containerWidth / (0.8 * Math.PI); // Closer zoom for smaller widths
    }

    // Set the dimensions of the SVG to fill the container
    const svg = svgContainer.attr("width", containerWidth).attr("height", containerHeight);

    const projection = d3.geoMercator()
        .center([60, 36])
        .scale(zoomScale)
        .translate([containerWidth / 2, containerHeight / 2]);

    d3.json("static/img/custom.geo.json").then(function(data) {
        const path = d3.geoPath().projection(projection);
        
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
                .attr("fill", function(d) {
                    switch (d.properties.name) {
                        case 'Portugal': return '#7ddf98';
                        case 'China': return '#7ddf98';
                        case 'India': return '#7ddf98';
                        case 'Germany': return '#7ddf98';
                        default: return '#e6e6e6';
                    }
                })
                .attr("d", path)
                .style("stroke", "#e6e6e6");

                svg.selectAll(".marker")
                .data(Object.entries(cities))
                .enter()
                .append("image")
                .attr('xlink:href', svgMarker)
                .attr("x", d => projection([d[1].longitude, d[1].latitude])[0] - markerWidth / 2) // Center the marker horizontally
                .attr("y", d => projection([d[1].longitude, d[1].latitude])[1] - markerHeight) // Place the bottom of the marker on the location
                .attr("width", markerWidth)
                .attr("height", markerHeight)
                .attr("class", "marker");
    });
}

// Draw the map for the first time
drawMap();

// Redraw the map when the window is resized
window.addEventListener('resize', function() {
    // Add a delay to the resize event to prevent excessive redrawing while resizing
    clearTimeout(window.resizeId);
    window.resizeId = setTimeout(drawMap, 500);
});
