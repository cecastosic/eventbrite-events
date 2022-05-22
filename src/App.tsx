import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

import { PastEvents } from "./pages/PastEvents";
import { UpcomingEvents } from "./pages/UpcomingEvents";
import { List } from "./pages/List";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryUpcoming, setSearchQueryUpcoming] = useState<string>("");
  const [continuation, setContinuation] = useState<string>("");

  const { data: eventsData } = useFetch(
    `/?continuation=${continuation}&name_filter=${searchQuery}&order_by=start_desc&page_size=28&status=completed&expand=ticket_classes`
  );

  console.log(eventsData && eventsData.events[0].ticket_classes[0].quantity_sold);
  const { data: upcomingData } = useFetch(
    `/?name_filter=${searchQueryUpcoming}&page_size=40&order_by=start_desc&status=live&expand=ticket_classes`
  );

  //page size 200 events
  const { data: allData } = useFetch(
    `/?order_by=start_desc&page_size=200&status=completed&expand=ticket_classes`
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
            <UpcomingEvents
              data={upcomingEvents}
              searchQuery={searchQueryUpcoming}
              setSearchQuery={setSearchQueryUpcoming}
            />
          }
        />
        <Route
          path="/past"
          element={
            <PastEvents
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
        <Route path="/list" element={<List data={listData} />} />
      </Routes>
    </Router>
  );
}

export default App;
