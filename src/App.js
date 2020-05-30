import React, { useState } from "react";
import "./style.css";
import userSWR, { SWRConfig } from "swr";
import DisplayUsers from "./DisplayUsers";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
      <Users />
    </SWRConfig>
  );
}

function Users() {
  const [state, setState] = useState(null);

  const myPositon = [52.6386, -1.13169];

  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";

  const { data, error } = userSWR(url);
  const users = data && !error ? data.slice(0, 1000) : [];

  if (error) return <div>error...</div>;
  if (!data) return <div>loading...</div>;
  console.log(users);

  return (
    <DisplayUsers
      users={users}
      myPositon={myPositon}
      categories={[...new Set(users.map((user) => user.category))]}
    />
  );
}
