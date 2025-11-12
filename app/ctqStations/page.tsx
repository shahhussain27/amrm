"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
  CartesianGrid,
  Rectangle,
} from "recharts";
import Table from "../components/Table";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ProtectedPage } from "../utils/ProtectedPage";

const areaData = [
  { name: "Apr 2024", value: 90 },
  { name: "Jul 2024", value: 100 },
  { name: "Oct 2024", value: 95 },
  { name: "Jan 2025", value: 92 },
];

const BarData = [
  {
    name: "Apr 2024",
    uv: 1000,
    pv: 2000,
    amt: 2000,
  },
  {
    name: "Apr 2025",
    uv: 1000,
    pv: 700,
    amt: 700,
  },
];

const Page = () => {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      const withSerials = jsonData.map((row, index) => ({
        "Sr. No.": index + 1,
        ...row,
      }));
      setData(withSerials);
    };
    reader.readAsBinaryString(file);
  };

  const labelMap = {
    pv: "Operators Required",
    uv: "Operators Available",
  };

  return (
    <ProtectedPage>
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center text-left bg-gray-700 p-4 mb-6 max-sm:flex-col max-sm:gap-4">
        <h1 className="text-2xl font-bold text-gray-100">
          DOJO 2.0 Monitoring Dashboard - CTQ Stations
        </h1>
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
          Upload Excel/CSV
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-5 mb-6 max-sm:grid-cols-1 max-sm:gap-4">
        {[
          { title: "Total CTQ Stations", value: 5 },
          { title: "Operations Required", value: 83 },
          { title: "Operations Available", value: 84 },
          { title: "Buffer Manpower Required", value: 10 },
          { title: "Buffer Manpower Available", value: data.length },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center w-3/4 bg-white p-4 rounded-none shadow  max-sm:w-full"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {card.value}
            </h2>
            <p className="text-sm text-gray-500">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts + Summary Section */}
      <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
        {/* Graphs */}
        <div className="col-span-3 grid grid-cols-2 gap-4 max-sm:grid-cols-1 overflow-hidden">
          <div className="bg-white p-4 rounded-none shadow">
            <h3 className="text-lg font-bold text-center mb-2 text-gray-600">
              Manpower Availability Trend
            </h3>
            <BarChart
              style={{
                width: "100%",
                maxWidth: "700px",
                maxHeight: "70vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={BarData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip formatter={(value, name) => [value, labelMap[name]]} />
              <Legend formatter={(value) => labelMap[value]} />
              <Bar
                dataKey="pv"
                fill="#82ca9d"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#8884d8"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </div>

          <div className="bg-white p-4 rounded-none shadow">
            <h3 className="text-lg font-bold text-center mb-2 text-gray-600">
              Attrition Rate Trend
            </h3>
            <AreaChart
              style={{
                width: "100%",
                maxWidth: "700px",
                maxHeight: "70vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={areaData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip />
              <Area dataKey="value" fill="#fca5a5" stroke="#ef4444" />
            </AreaChart>
          </div>

          <div className="bg-white p-4 rounded-none shadow">
            <h3 className="text-lg font-bold text-center mb-2 text-gray-600">
              Buffer Manpower Availability
            </h3>
            <AreaChart width={500} height={250} data={areaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area dataKey="value" fill="#a7f3d0" stroke="#10b981" />
            </AreaChart>
          </div>

          <div className="bg-white p-4 rounded-none shadow">
            <h3 className="text-lg font-bold text-center mb-2 text-gray-600">
              Absentism Rate Trend
            </h3>
            <AreaChart width={500} height={250} data={areaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area dataKey="value" fill="#fca5a5" stroke="#ef4444" />
            </AreaChart>
          </div>
        </div>

        {/* Right Summary */}
        <div className="bg-white p-4 rounded-none shadow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-600">
              Operators Required vs Available
            </h3>
            {[
              { level: "L1", req: 25, avail: 23 },
              { level: "L2", req: 25, avail: 24 },
              { level: "L3", req: 25, avail: 25 },
              { level: "L4", req: 25, avail: 25 },
            ].map((lvl, idx) => (
              <div
                key={idx}
                className="flex justify-between py-1 text-sm text-gray-700"
              >
                <div className="flex flex-col justify-center items-center shadow-xl p-6">
                  <p className="text-xl font-bold">{lvl.req}</p>
                  <p>{lvl.level} Required</p>
                </div>
                <div className="flex flex-col justify-center items-center shadow-xl p-6">
                  <p className="text-xl font-bold">{lvl.avail}</p>
                  <p>{lvl.level} Available</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-lg py-6">
            <div className="bg-gray-700 text-gray-100 p-1">
              Actions Planned for Manpower Shortage
            </div>
            <div className="bg-gray-300 p-1">Special perks</div>
            <div className="bg-gray-400 p-1">Salary revision</div>
            <div className="bg-gray-300 p-1">buffer manpower planning</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          className="bg-gray-500 text-white py-2 px-4 cursor-pointer hover:bg-gray-600"
          onClick={() => setShowTable(true)}
        >
          Show Table
        </button>
      </div>
      {showTable ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white shadow-xl w-[90vw] h-[80vh] p-3 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Employee Data</h2>

              <span className="text-sm text-gray-600">
                {data.length > 0
                  ? `${data.length} records loaded`
                  : "No file uploaded"}
              </span>
              <button
                className="bg-gray-600 text-white py-1 px-3 hover:bg-gray-700"
                onClick={() => setShowTable(false)}
              >
                Close
              </button>
            </div>
            {/* Table fills remaining space and scrolls */}
            <div className="flex-1 overflow-hidden">
              <Table data={data} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
    </ProtectedPage>
  );
};

export default Page;
