function zoomThreshold(hidden,visible){ //param1 hidden, param2 visible
    //remove and hide visibility of the maps
    var currentZoom = map.getZoom();
    console.log('current zoom: '+currentZoom);
    if(currentZoom <= hidden){
        const targetDiv = document.querySelector('.leaflet-pane.leaflet-marker-pane');
        targetDiv.style.visibility = 'hidden';
    }
    if(currentZoom > visible){
        const targetDiv = document.querySelector('.leaflet-pane.leaflet-marker-pane');
        targetDiv.style.visibility = 'visible';
    }
}
    