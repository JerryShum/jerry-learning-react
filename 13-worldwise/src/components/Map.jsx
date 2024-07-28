import { useNavigate, useSearchParams } from "react-router-dom";
import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   useMap,
   useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";

function Map() {
   /* When we load the application, the original position is [40,0]
- once we click on a city item, the searchParams will get a new value from the URL
- This will update the mapLat and mapLng values 
- Since our useEffect is dependent on these two values, it will change and activate 
- This sets our current mapPosition to the new position
- Since our state changed, the values of the position of the map will change and refresh
- (center and changeCenter)

*/

   const navigate = useNavigate();
   const { cities } = useCities();
   const [mapPosition, setMapPosition] = useState([40, 0]);
   const [searchParams] = useSearchParams();
   const [maplat, maplng] = useURLPosition();
   const {
      isLoading: isLoadingPosition,
      position: geoLocationPosition,
      getPosition,
   } = useGeolocation();

   // sync mapPosition with maplat and maplng
   useEffect(
      function () {
         if (maplat && maplng) setMapPosition([maplat, maplng]);
      },
      [maplat, maplng]
   );

   // sync geoLocationPosition with mapPosition state
   useEffect(
      function () {
         if (geoLocationPosition)
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      },
      [geoLocationPosition]
   );

   return (
      <div className={styles.mapContainer}>
         {!geoLocationPosition && (
            <Button type="position" onClick={getPosition}>
               {isLoadingPosition ? "Loading" : "Use your position!"}
            </Button>
         )}
         <MapContainer
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            className={styles.map}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
               <Marker
                  position={[city.position.lat, city.position.lng]}
                  key={city.id?.toString()}
               >
                  <Popup>
                     <span>{city.emoji}</span>
                     <span>{city.cityName}</span>
                  </Popup>
               </Marker>
            ))}

            <ChangeCenter position={mapPosition} />
            <DetectClick />
         </MapContainer>
      </div>
   );
}

function ChangeCenter({ position }) {
   const map = useMap();
   map.setView(position);
   return null;
}

// DetectClick function for detecting clicks on any of the map tiles
// If a click was detected, we are navigating to the form URL and also putting some state there using the URL
// We got the position information from the event that was sent and included it into the URL
// Since we change URL, the mapLat and mapLng values will change -> effect -> setState -> new position on map
function DetectClick() {
   const navigate = useNavigate();
   useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
   });
}

export default Map;
