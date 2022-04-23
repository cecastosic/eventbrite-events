import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Index } from "./components/Index";
import { List } from "./components/List";
import { isConstructorDeclaration } from "typescript";

function App() {
  const { data: eventsData } = useFetch("/");
  const [continuation, setContinuation] = useState<string>("");
  const { data: pageTwoData } = useFetch(`/?continuation=${continuation}`);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (eventsData) {
      //todo: check how many pages
      //pagination
      setFilteredData([]);
      setContinuation(eventsData.pagination.continuation);

      const filteredEvents = eventsData.events.filter(
        (event: any) => event.status === "completed"
      );

      const filteredEventsPageTwo =
        pageTwoData &&
        pageTwoData.events.filter((event: any) => event.status === "completed");

      setFilteredData(filteredEvents);

      filteredEventsPageTwo &&
        filteredEventsPageTwo.length &&
        setFilteredData(
          filteredEvents
            .concat(filteredEventsPageTwo)
            // .sort((a: any, b: any) => {
            //   const dateB = new Date(b.start.utc).getTime();
            //   const dateA = new Date(a.start.utc).getTime();
            //   return dateB - dateA;
            // })
        );
    }
  }, [eventsData, pageTwoData]);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Index data={filteredData} />} />
          <Route path="/list" element={<List data={filteredData} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
