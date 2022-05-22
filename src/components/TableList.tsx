import { Row, UseTableInstanceProps } from "react-table";
import { Cols } from "./List";

type TableListProps = Pick<
  UseTableInstanceProps<Cols>,
  "getTableProps" | "headerGroups" | "getTableBodyProps" | "prepareRow"
> & { page: Array<Row<Cols>> };

export const TableList = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
}: TableListProps) => {
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
