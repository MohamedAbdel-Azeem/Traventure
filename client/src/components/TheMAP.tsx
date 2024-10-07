import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

interface TheMAPProps {
  lat?: number;
  long?: number;
  className?: string;
  setLatitude: (lat: number) => void;
  setLongitude: (long: number) => void;
}


const TheMAP: React.FC<TheMAPProps> = (props) => {
  TheMAP.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
    className: PropTypes.string,
    setLatitude: PropTypes.func.isRequired,
    setLongitude: PropTypes.func.isRequired,
  };
  function handleMapChange(long:number, lat:number){
    setLongitude(long);
    setLatitude(lat);
    props.setLongitude(long);
    props.setLatitude(lat);
  }
  const className = props.className;
  const lat = props.lat ?? 0;
  const long = props.long ?? 0;

  const snapshotLatitude = lat;
  const snapshotLongitude = long;

  const [latitude, setLatitude] = useState<number>(snapshotLatitude);
  const [longitude, setLongitude] = useState<number>(snapshotLongitude);



  async function initMap() {
    const { Map } = await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
    
    const map = new Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 13,
      mapId: "4504f8b37365c3d0",
    });
    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      gmpDraggable: true,
      title: "This marker is draggable.",
    });
    
    draggableMarker.addListener("dragend", (event) => {
      const position = draggableMarker.position;
      handleMapChange(position.lng, position.lat);
      });
  }
  initMap();

  return (<div> 
   <div id="map" className={`z-1 ${className}`}/>
   </div>

  );
};

export default TheMAP;