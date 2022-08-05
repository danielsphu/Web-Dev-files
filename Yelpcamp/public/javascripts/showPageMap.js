mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsc3BodTIiLCJhIjoiY2w2Z21vMWY3MDA2MzNkb2h4N2UzbTljaCJ9.QyrUpbTIjmny7-IfE5WbIg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates,
    zoom: 10, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);
