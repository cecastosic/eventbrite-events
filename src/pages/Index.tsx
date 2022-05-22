import { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { Loading } from "../components/Loading";
import { Search } from "../components/Search";
import { NoResults } from "../components/NoResults";
import { Header } from "../components/Header";
import { Button } from "../components/Button";

type IndexProps = {
  data: any;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onLoadClick?: () => void;
  continuation?: string;
};

export const Index = ({
  data,
  searchQuery,
  setSearchQuery,
  onLoadClick,
  continuation,
}: IndexProps) => {
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
        {!loading && continuation && (
          <Button
            text="Load more"
            onClick={() => onLoadClick && onLoadClick()}
            className="load"
          />
        )}
      </main>
    </>
  );
};
