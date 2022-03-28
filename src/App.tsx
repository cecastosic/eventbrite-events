import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { Event } from "./components/Event";
import { useEffect, useState } from "react";

function App() {
  const { data: eventsData } = useFetch("/");
  const [continuation, setContinuation] = useState<string>("");
  const { data: pageTwoData } = useFetch(`/?continuation=${continuation}`);

  useEffect(() => {
    if (eventsData) {
      //todo: check how many pages 
      //pagination
      setContinuation(eventsData.pagination.continuation);
    }
  }, [eventsData]);

  return (
    <main>
      <h1>HYF events on Eventbrite</h1>
      <div className="cards">
        {eventsData ? (
          eventsData.events.map((event: any) => {
            return <Event data={event} key={event.id} />;
          })
        ) : (
          <p>Loading...</p>
        )}
         {pageTwoData ? (
          pageTwoData.events.map((event: any) => {
            return <Event data={event} key={event.id} />;
          })
        ) : (
          <p>Loading page two...</p>
        )}
      </div>
    </main>
  );
}

export default App;
