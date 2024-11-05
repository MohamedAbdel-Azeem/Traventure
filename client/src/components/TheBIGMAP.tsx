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
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
      "marker"
    );

    const map = new Map(document.getElementById(id), {
      center: { lat: calculatecenter(arrayofmarkers).latitude, lng: calculatecenter(arrayofmarkers).longitude },
      zoom: 13,
      mapId: "4504f8b37365c3d0",
    });
    
  arrayofmarkers.map((marker) => {
    const templong = marker.longitude;
    const templat = marker.latitude;
    const MarkerX = new AdvancedMarkerElement({
      map,
      position: { lat: templat, lng: templong }
    });
  });

  }
  useEffect(() => {
    initMap();
  }, [arrayofmarkers]);

  return (
      <div
        id={id}
        className={className??"h-[900px] w-[500px] ml-auto"}
      />
  );
};

export default TheBIGMAP;
