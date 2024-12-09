import { useState, useEffect } from "react";
import PropTypes from "prop-types";

interface Location {
  latitude: number;
  longitude: number;
}

interface TheBIGMAPProps {
  arrayofmarkers: Location[];
  className?: string;
  id: string;
}

const TheBIGMAP: React.FC<TheBIGMAPProps> = ({ arrayofmarkers, className, id }) => {

  function calculatecenter(arrayofmarkers:{longitude:number, latitude:number}[]){
    var totallong = 0;
    var totallat = 0;
    arrayofmarkers.forEach(marker => {
      totallong += marker.longitude;
      totallat += marker.latitude;
    });
    var averagelong:number = totallong/arrayofmarkers.length;
    var averagelat:number = totallat/arrayofmarkers.length;
    return {longitude:averagelong,latitude:averagelat};
  } 

  async function initMap() {
    const { Map } = await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement  } = await window.google.maps.importLibrary(
      "marker"
    );

    const map = new Map(document.getElementById(id), {
      center: { lat: calculatecenter(arrayofmarkers).latitude, lng: calculatecenter(arrayofmarkers).longitude },
      zoom: 13,
      mapId: "4504f8b37365c3d0",
    });

    if (arrayofmarkers.length === 1) {
      const marker = new window.google.maps.Marker({
        position: { lat: arrayofmarkers[0].latitude, lng: arrayofmarkers[0].longitude },
        map: map,
      });
    } else {
      const pinStart = document.createElement('div');
      pinStart.className = 'pin-tag relative m-0 bg-green-500 rounded-lg text-white text-sm p-2.5 border-0';
      pinStart.textContent = 'Pick Up Here';

      const MarkerStart = new AdvancedMarkerElement({
        map,
        position: { lat: arrayofmarkers[0].latitude, lng: arrayofmarkers[0].longitude },
        content: pinStart
      });

      const pinEnd = document.createElement('div');
      pinEnd.className = 'pin-end relative m-0 bg-red-500 rounded-lg text-white text-sm p-2.5 border-0';
      pinEnd.textContent = 'Drop Off Here';

      const MarkerEnd = new AdvancedMarkerElement({
        map,
        position: { lat: arrayofmarkers[1].latitude, lng: arrayofmarkers[1].longitude },
        content: pinEnd
      });

      arrayofmarkers.slice(2).map((marker) => {
        const templong = marker.longitude;
        const templat = marker.latitude;
        const pinBackground = new PinElement({
          background: '#FBBC04',
          glyphColor: 'white',
          borderColor: '#FBBC04'
        });
        const MarkerX = new AdvancedMarkerElement({
          map,
          position: { lat: templat, lng: templong },
          content: pinBackground.element
        });
      });
    }
  }

  useEffect(() => {
    initMap();
  }, [arrayofmarkers]);

  return (
    <div
      id={id}
      className={className ?? "h-[900px] w-[500px] ml-auto"}
    />
  );
};

export default TheBIGMAP;