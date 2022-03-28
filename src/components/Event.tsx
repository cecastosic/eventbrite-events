export const Event = (data: any) => {
    return (
      <article className="card" key={data.data.id}>
        <img src={data.data.logo ? data.data.logo.url : ""} alt={data.data.name.text} /> 
        <div>
          <h2>{data.data.name.text}</h2>
          <p className="date">
            {new Date(data.data.start.utc).toLocaleString()}
          </p>
          <p>Number of Attendees: {data.data.capacity}</p>
        </div>
      </article>
    );
};
