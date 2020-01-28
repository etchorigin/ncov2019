import React, { useState } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Card, H6 } from "@blueprintjs/core";
import "../App.css";

const CustomizedAxisTick = props => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor="middle" fill="#a7b6c2">
        {moment(payload.value).format("MMM DD")}
      </text>
    </g>
  );
};

const TrendsComponent = props => {
  const [opacity, setOpacity] = useState({
    Mainland_China: true,
    Other_Locations: true,
    Total_Confirmed: false
  });

  const handleClick = o => {
    const { dataKey } = o;
    setOpacity({ ...opacity, [dataKey]: !opacity[dataKey] });
  };

  return (
    <div className="Trends-Container ">
      <Card className="Trends-Card Statistics-Card">
        <H6 className="bp3-text-muted">Trend of Confirmed Cases</H6>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={props.data}
            margin={{
              top: 0,
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Report_Date" tick={<CustomizedAxisTick />} />
            <YAxis tick={{ fill: "#a7b6c2" }} />
            <Tooltip />
            <Legend onClick={handleClick} />
            <Line
              type="monotone"
              dataKey="Mainland_China"
              name="China"
              strokeOpacity={opacity.Mainland_China ? 1 : 0}
              stroke="red"
            />
            <Line
              type="monotone"
              dataKey="Other_Locations"
              name="Rest of the World"
              strokeOpacity={opacity.Other_Locations ? 1 : 0}
              stroke="#48aff0"
            />
            <Line
              type="monotone"
              dataKey="Total_Confirmed"
              name="Total Confirmed"
              strokeOpacity={opacity.Total_Confirmed ? 1 : 0}
              stroke="#ffaa00"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default TrendsComponent;
