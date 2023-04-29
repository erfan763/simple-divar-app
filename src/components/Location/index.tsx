import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { LatLngExpression, LatLngLiteral } from "leaflet";
export default function Location({
  position,
  setPosition,
  staticLoaction,
}: {
  position?: LatLngLiteral;
  setPosition?: React.Dispatch<React.SetStateAction<LatLngLiteral | undefined>>;
  staticLoaction?: boolean;
}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <MapContainer
        center={
          {
            lat: position?.lat || 51.505,
            lng: position?.lng || -0.09,
          } as LatLngExpression
        }
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "50vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {staticLoaction ? (
          <>
            {position ? (
              <Marker position={position}>
                <Popup>The home is here</Popup>
              </Marker>
            ) : null}
          </>
        ) : (
          <LocationMarker position={position} setPosition={setPosition} />
        )}
      </MapContainer>
    </Box>
  );
}
