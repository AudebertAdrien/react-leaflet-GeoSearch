import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function DisplayCrimes({ crimes, myPositon, categories }) {
  const [filterCategory, setFilterCategory] = React.useState(null);
  const filterCrimes = filterCategory
    ? crimes.filter((crime) => crime.category === filterCategory)
    : (crimes)

  return (
    <>
      <div className="my-container">
        {categories.map((category) => (
          <button key={category} onClick={() => setFilterCategory(category)}>
            {category}
          </button>
        ))}
        {filterCategory && (
          <button onClick={() => setFilterCategory(null)}>reset</button>
        )}
      </div>

      <Map center={myPositon} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {filterCrimes.map((crime) => (
          <Marker
            key={crime.id}
            position={[crime.location.latitude, crime.location.longitude]}
          >
            <Popup>A pretty CSS with crimes info</Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
}
