import { useMemo } from "react";
import { useTable, TableOptions, Column } from "react-table";
import { CSVLink } from "react-csv";

type Cols = {
  EventName: string;
  Date: string;
  NumberOfAttendees: string;
  Location: string;
};

export const List = (fetchedData: any) => {
    
    const columns: Column<{
        EventName: string;
        Date: string;
        NumberOfAttendees: string;
        Location: string;
    }>[] = useMemo(
        () => [
            {
                Header: "Event name",
                accessor: "EventName", // accessor is the "key" in the data
            },
            {
                Header: "Date",
                accessor: "Date",
            },
            {
                Header: "Number of attendees",
                accessor: "NumberOfAttendees",
            },
            {
                Header: "Location",
                accessor: "Location",
            },
        ],
        []
        );
        
        const data = useMemo(
            (): Cols[] =>
            fetchedData.data.map((el: any) => {
                return {
                    EventName: el.name.text,
                    Date: new Date(el.start.utc).toLocaleString(),
                    NumberOfAttendees: el.capacity,
                    Location: el.online_event ? "Online" : "Real life",
                };
            }),
            [fetchedData.data]
            );
            
            const options: TableOptions<{
                EventName: string;
                Date: string;
                NumberOfAttendees: string;
                Location: string;
            }> = {
                data,
                columns,
            };
                        
            const tableInstance = useTable(options);
            
            const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
            tableInstance;
            
            return (
                <>
      <h1>List of the events</h1>
      {data.length ? (
          <>
          <CSVLink data={data}>Export to CSV</CSVLink>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
