const cities = {
    'Lisbon': { latitude: 38.7223, longitude: -9.1393, logos: ['static/img/nova-logo.svg'] },
    'Berlin': { latitude: 52.5200, longitude: 13.4050, logos: ['static/img/hwr-logo.svg', 'static/img/KPMG-logo.svg', 'static/img/tu-logo.svg'] },
    'Shanghai': { latitude: 31.2304, longitude: 121.4737, logos: ['static/img/dss-logo.svg'] },
    'Bonn': { latitude: 50.7374, longitude: 7.0982, logos: [] },
    'New Delhi': { latitude: 28.6139, longitude: 77.2090, logos: ['static/img/DSND-logo.png'] }
};

// SVG marker
const svgMarker = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>')}`;
const markerWidth = 20;
const markerHeight = 30;


function drawMap() {
    const svgContainer = d3.select("#my_dataviz");
    svgContainer.selectAll("*").remove();

    const panel = document.getElementById('panel-1');
    const containerWidth = panel.clientWidth;
    const containerHeight = panel.clientHeight * 2;
    
    let zoomScale = containerWidth / (1.2 * Math.PI);
    if (window.innerWidth <= 768) {
        zoomScale = containerWidth / (1.0 * Math.PI);
    }

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
            .attr("fill", d => {
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
            .attr("x", d => projection([d[1].longitude, d[1].latitude])[0] - markerWidth / 2)
            .attr("y", d => projection([d[1].longitude, d[1].latitude])[1] - markerHeight)
            .attr("width", markerWidth)
            .attr("height", markerHeight)
            .attr("class", "marker")
            
            .on("mouseover", function(event, d) {
                d3.select(this).transition().duration(0).attr("width", markerWidth * 1.2).attr("height", markerHeight * 1.2);
                const [x, y] = projection([d[1].longitude, d[1].latitude]);
                // Display city label
                svg.append("text")
                    .attr("x", x)
                    .attr("y", y - markerHeight)
                    .text(d[0])
                    .attr("class", "city-label")
                    .attr("text-anchor", "middle")
                    .attr("dy", "-1em");
            
                    const logoSpacing = 70; // Space between logos
                    d[1].logos.forEach((logo, index) => {
                        const logoX = x + markerWidth / 2 + 20; // Position to the right of the marker
                        const logoY = y - 30 + (index * logoSpacing) - (d[1].logos.length * logoSpacing) / 2; // Center logos vertically around marker
        
                        svg.append("image")
                            .attr('xlink:href', logo)
                            .attr("x", logoX) // Place to the right of marker
                            .attr("y", logoY) // Stack vertically
                            .attr("width", 100) // Logo size
                            .attr("height", 100) // Logo size
                            .attr("class", "city-logo")
                            .style("opacity", 0)
                            .style("opacity", 1); // Fade-in effect
                    });
                })
                .on("mouseout", function() {
                    d3.select(this).transition().duration(100).attr("width", markerWidth).attr("height", markerHeight);
                    svg.select(".city-label").remove();
                    svg.selectAll(".city-logo").remove(); // Remove logos
                });
    });
}

// Initial draw
drawMap();
