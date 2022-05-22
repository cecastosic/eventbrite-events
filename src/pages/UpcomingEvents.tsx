import { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { Loading } from "../components/Loading";
import { Search } from "../components/Search";
import { NoResults } from "../components/NoResults";
import { Header } from "../components/Header";

type UpcomingEventsProps = {
  data: any;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const UpcomingEvents = ({
  data,
  searchQuery,
  setSearchQuery,
}: UpcomingEventsProps) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setFilteredData(data);
    data.length && setLoading(false);
  }, [data]);

  return (
    <>
      <Header />
      <main>
        <h1>HYF events on Eventbrite</h1>
        <Search value={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="cards">
          {loading ? (
            <Loading />
          ) : filteredData.length ? (
            filteredData.map((event: any) => {
              return <Event data={event} key={event.id} />;
            })
          ) : (
            <NoResults />
          )}
        </div>
      </main>
    </>
  );
};