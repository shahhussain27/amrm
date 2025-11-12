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
  
  const labelMap: Record<"pv" | "uv", string> = {
    pv: "Operators Required",
    uv: "Operators Available",
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center text-left bg-gray-700 p-4 mb-6 max-sm:flex-col max-sm:gap-4">
          <h1 className="text-2xl font-bold text-gray-100">
            Management Reviews - Digital Dashboard
          </h1>
        </div>

        {/* Charts + Summary Section */}
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
          {/* left Summary */}
          <div className="bg-white p-4 rounded-none shadow flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-lg text-center font-semibold mb-4 bg-gray-300">
                Training Summary
              </h3>

              {/* 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "New Operators Joined", avail: 271 },
                  { name: "New Operators Trained", avail: 271 },
                  { name: "Total training plan", avail: 271 },
                  { name: "Total Training Act.", avail: 271 },
                ].map((lvl, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-4 shadow-xl py-6 px-1 rounded-md bg-gray-50"
                  >
                    <p className="text-2xl font-bold">{lvl.avail}</p>
                    <p className="text-sm font-medium text-center">
                      {lvl.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg text-center font-semibold mb-4 bg-gray-300">
                Man Related Defects
              </h3>

              {/* 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Total Defects at MSIL", avail: 27 },
                  { name: "CTQ Defects at MSIL", avail: 7 },
                  { name: "Total defects at Tier-1", avail: 152 },
                  { name: "CTQ defects at Tier-1", avail: 152 },
                  { name: "Total internal Rejection", avail: 12 },
                  { name: "CTQ-Internal Rejection", avail: 12 },
                ].map((lvl, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-4 shadow-xl py-6 px-1 rounded-md bg-gray-50"
                  >
                    <p className="text-2xl font-bold">{lvl.avail}</p>
                    <p className="text-sm font-medium text-center">
                      {lvl.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="text-lg py-6">
            <div className="bg-gray-700 text-gray-100 p-1">
              Actions Planned for Manpower Shortage
            </div>
            <div className="bg-gray-300 p-1">Special perks</div>
            <div className="bg-gray-400 p-1">Salary revision</div>
            <div className="bg-gray-300 p-1">Buffer manpower planning</div>
          </div> */}
          </div>

          {/* Graphs */}
          <div className="col-span-3 grid grid-cols-2 gap-4 max-sm:grid-cols-1 overflow-hidden">
            <div className="bg-white p-4 rounded-none shadow">
              <h3 className="text-lg font-bold text-center mb-2 text-gray-600">
                Operator Trainings - Joined Vs Trained
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
                <Tooltip
                  formatter={(value, name) => {
                    const key = name as keyof typeof labelMap;
                    return [value, labelMap[key]];
                  }}
                />

                <Legend
                  formatter={(value) => {
                    const key = value as keyof typeof labelMap;
                    return labelMap[key];
                  }}
                />
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
                No. of Training Plan Vs Actual
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
                Man Related Defects Trend at MSIL
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
                Man Related defects internal rejection Overall & CTQ
              </h3>
              <AreaChart width={500} height={250} data={areaData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area dataKey="value" fill="#fca5a5" stroke="#ef4444" />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Page;
