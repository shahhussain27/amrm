type TableRow = Record<string, string | number | boolean| null | undefined>;

interface TableProps {
  data: TableRow[];
}

const headers = [
  "Sr. No.",
  "Comp",
  "SubUnit",
  "E_id",
  "E_Name",
  "Doj",
  "Catg",
  "Cost_Center",
  "CC_Code",
  "Dept",
  "Desg",
  "Gender",
  "Date",
  "Stat",
  "Shft",
  "In_Ti",
  "ou_ti",
  "Late",
  "Early",
  "Outp",
  "OT",
  "Dur",
] as const;

const Table: React.FC<TableProps> = ({ data }) =>  {
  return (
    <div className="w-full h-[500px] overflow-auto border border-gray-300 shadow-md">
      <table className="min-w-max border-collapse w-full">
        <thead className="bg-linear-to-r from-gray-700 to-gray-600 text-white sticky top-0 z-10">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-sm font-semibold text-center border-b border-gray-400 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-gray-100 text-gray-800 divide-y divide-gray-300">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-gray-500"
              >
                No data to display. Please upload a file.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 transition-colors duration-150"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-2 text-left text-sm whitespace-nowrap"
                  >
                    {row[header] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
