import React, { useState } from "react";
import "./style.css";
import useSWR, { SWRConfig } from "swr";
import DisplayCrimes from "./DisplayCrimes";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
      <Crimes />
    </SWRConfig>
  );
}

function Crimes() {
  const [state, setState] = useState(null);

  const myPositon = [52.6386, -1.13169];

  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";

  const { data, error } = useSWR(url);
  const crimes = data && !error ? data.slice(0, 1000) : [];

  if (error) return <div>error...</div>;
  if (!data) return <div>loading...</div>;

  return (
    <DisplayCrimes
      crimes={crimes}
      myPositon={myPositon}
      categories={[...new Set(crimes.map((crime) => crime.category))]}
    />
  );
}