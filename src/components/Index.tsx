import { useEffect, useState } from "react";
import { Event } from "./Event";
import { Loading } from "./Loading";
import { Search } from "./Search";
import { NoResults } from "./NoResults";

export const Index = ({ data, searchQuery, setSearchQuery }: any) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setFilteredData(data);
    data.length && setLoading(false);
  }, [data]);

  useEffect(() => {
    if (searchQuery !== "") {
      setFilteredData(
        data.filter((event: any) =>
          event.name.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [data, searchQuery]);

  return (
    <>
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
    </>
  );
};
