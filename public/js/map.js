maptilersdk.config.apiKey = mapToken;



const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates, 
    zoom: 9,
    interactive: true,
});


const marker = new maptilersdk.Marker({ color: "#fe424d" })
    .setLngLat(coordinates) 
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
        .setHTML(`<h3>${titleStr}</h3><p>${locationStr}</p>`)
    )
    .addTo(map);