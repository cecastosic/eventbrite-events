import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

import { Index } from "./pages/Index";
import { UpcomingEvents } from "./pages/UpcomingEvents";
import { List } from "./pages/List";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryUpcoming, setSearchQueryUpcoming] = useState<string>("");
  const [continuation, setContinuation] = useState<string>("");

  const { data: eventsData } = useFetch(
    `/?continuation=${continuation}&name_filter=${searchQuery}&order_by=start_desc&page_size=28&status=completed`
  );
  const { data: upcomingData } = useFetch(
    `/?name_filter=${searchQueryUpcoming}&page_size=40&order_by=start_desc&status=live`
  );

  //page size 200 events
  const { data: allData } = useFetch(
    `/?order_by=start_desc&page_size=200&status=completed`
  );

  const [filteredData, setFilteredData] = useState<any>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any>([]);
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    if (eventsData) {
      setFilteredData([...filteredData, ...eventsData.events]);
    }
  }, [eventsData]);

  useEffect(() => {
    if (upcomingData) {
      setUpcomingEvents(upcomingData.events);
    }
  }, [upcomingData]);

  useEffect(() => {
    if (allData) {
      setListData(allData.events);
    }
  }, [allData]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Index
              data={filteredData}
              searchQuery={searchQuery}
              setSearchQuery={(s) => {
                setFilteredData([]);
                setSearchQuery(s);
              }}
              onLoadClick={() =>
                eventsData.pagination.continuation &&
                setContinuation(eventsData.pagination.continuation)
              }
              continuation={eventsData?.pagination?.continuation}
            />
          }
        />
        <Route
          path="/upcoming"
          element={
            <UpcomingEvents
              data={upcomingEvents}
              searchQuery={searchQueryUpcoming}
              setSearchQuery={setSearchQueryUpcoming}
            />
          }
        />
        <Route path="/list" element={<List data={listData} />} />
      </Routes>
    </Router>
  );
}

export default App;
