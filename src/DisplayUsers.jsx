import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function DisplayUsers({ users, myPositon, categories }) {
  const [filterCategory, setFilterCategory] = React.useState(null);
  const filterUsers = filterCategory
    ? users.filter((user) => user.category === filterCategory)
    : (users)

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

        {filterUsers.map((user) => (
          <Marker
            key={user.id}
            position={[user.location.latitude, user.location.longitude]}
          >
            <Popup>A pretty CSS with users info</Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
}
