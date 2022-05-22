import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../components/Header";

const data = [
  {
    name: "2018",
    online: 0,
    onsite: 3,
  },
  {
    name: "2019",
    online: 0,
    onsite: 34,
  },
  {
    name: "2020",
    online: 25,
    onsite: 34,
  },
  {
    name: "2021",
    online: 10,
    onsite: 7,
  },
  {
    name: "2022",
    online: 1,
    onsite: 5,
  },
];

export const Graphs = () => {
  return (
    <>
      <Header />
      <main className="graphs">
        <h1>List of the past events</h1>
        <ResponsiveContainer width="60%" height="40%">
          <BarChart
            width={500}
            height={400}
            data={data}
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
      </main>
    </>
  );
};
