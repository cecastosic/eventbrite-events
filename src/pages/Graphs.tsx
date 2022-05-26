import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import filteredDataBasedOnYear from "../helpers/getGraphsData";

export const Graphs = (fetchedData: any) => {
  const [graphsData, setGraphsData] = useState<any>([]);

  useEffect(() => {
    setGraphsData([
      filteredDataBasedOnYear({ year: 2018, data: fetchedData.data }),
      filteredDataBasedOnYear({ year: 2019, data: fetchedData.data }),
      filteredDataBasedOnYear({ year: 2020, data: fetchedData.data }),
      filteredDataBasedOnYear({ year: 2021, data: fetchedData.data }),
      filteredDataBasedOnYear({ year: 2022, data: fetchedData.data }),
    ]);
  }, [fetchedData]);

  return (
    <>
      <Header />
      <main className="graphs">
        <h1>Online/Onsite events from 2018</h1>
        {graphsData.length ? (
          <ResponsiveContainer width="60%" height="40%">
            <BarChart
              width={500}
              height={400}
              data={graphsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="online" fill="#2c3e87" />
              <Bar dataKey="onsite" fill="#5269c7" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};
