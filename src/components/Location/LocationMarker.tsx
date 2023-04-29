import { LatLngLiteral } from "leaflet";

import { useMapEvents, Marker, Popup } from "react-leaflet";
export default function LocationMarker({
  position,
  setPosition,
}: {
  position?: LatLngLiteral;
  setPosition?: React.Dispatch<React.SetStateAction<LatLngLiteral | undefined>>;
}) {
  const map = useMapEvents({
    click(d) {
      setPosition && setPosition(d.latlng);
    },
    locationfound(e: any) {
      setPosition && setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return !position ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
