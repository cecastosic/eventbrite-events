import { Event } from "./Event";
import { Loading } from "./Loading";

export const Index = ({ data }: any) => {
  return (
    <>
      <h1>HYF events on Eventbrite</h1>
      <div className="cards">
        {data.length ? (
          data.map((event: any) => {
            return <Event data={event} key={event.id} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
