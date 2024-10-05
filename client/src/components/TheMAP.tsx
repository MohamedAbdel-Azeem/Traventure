import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

interface TheMAPProps {
  lat?: number;
  long?: number;
  width?: string;
  setLatitude: (lat: number) => void;
  setLongitude: (long: number) => void;
}


const TheMAP: React.FC<TheMAPProps> = (props) => {
  TheMAP.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
    width: PropTypes.string,
    setLatitude: PropTypes.func.isRequired,
    setLongitude: PropTypes.func.isRequired,
  };
  function handleMapChange(long:number, lat:number){
    console.log("interimLAT",lat);
    console.log("interimLONG",long);
    setLongitude(long);
    setLatitude(lat);
    props.setLongitude(long);
    props.setLatitude(lat);
    }
  const width = props.width;
  const actual = width ? width : "311px";
  const lat = props.lat ?? 0;
  console.log("LAT", lat);
  const long = props.long ?? 0;
  console.log("LONG", long);

  const snapshotLatitude = lat;
  const snapshotLongitude = long;

  const [latitude, setLatitude] = useState<number>(snapshotLatitude);
  const [longitude, setLongitude] = useState<number>(snapshotLongitude);
  console.log("COORDS", latitude, longitude);



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
      console.log(latitude, longitude);
      });
  }
  initMap();


  return (
    <div>
          <div id="map"  className="z-1" style={{height:"211px", width:actual}}></div>
    </div>
  );
};

export default TheMAP;