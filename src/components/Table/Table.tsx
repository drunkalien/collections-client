import { useRouter } from "next/router";
import { Column, useTable } from "react-table";

type Props = {
  columns: readonly Column<any>[];
  data: any[];
};

const Table = ({ columns, data = [] }: Props) => {
  const router = useRouter();
  const table = useTable({
    columns,
    data,
  });
  return (
    <table {...table.getTableProps()}>
      <thead>
        {table.headerGroups.map((headerGroup, idx) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
            {headerGroup.headers.map((column, idx) => (
              <th {...column.getHeaderProps()} key={idx}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...table.getTableBodyProps()}>
        {table.rows.map((row, idx) => {
          table.prepareRow(row);
          return (
            <tr
              className="cursor-pointer"
              {...row.getRowProps()}
              key={idx}
              onClick={() => {
                router.push(
                  `/collections/${row.original.itemCollection}/items/${row.original._id}`
                );
              }}
            >
              {row.cells.map((cell, idx) => (
                <td {...cell.getCellProps()} key={idx}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
