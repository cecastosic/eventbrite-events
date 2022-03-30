import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { Event } from "./components/Event";
import { useEffect, useState } from "react";

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
        setFilteredData(filteredEvents.concat(filteredEventsPageTwo));
    }
  }, [eventsData, pageTwoData]);

  return (
    <main>
      <h1>HYF events on Eventbrite</h1>
      <div className="cards">
        {filteredData.length ? (
          filteredData.map((event: any) => {
            return <Event data={event} key={event.id} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default App;
