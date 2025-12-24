import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const DURATION_BUCKETS = [
  { label: "1 night", min: 1, max: 1 },
  { label: "2 nights", min: 2, max: 2 },
  { label: "3 nights", min: 3, max: 3 },
  { label: "4-5 nights", min: 4, max: 5 },
  { label: "6-7 nights", min: 6, max: 7 },
  { label: "8-14 nights", min: 8, max: 14 },
  { label: "15-21 nights", min: 15, max: 21 },
  { label: "21+ nights", min: 22, max: Infinity },
];

const COLORS = {
  light: [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#a855f7",
  ],
  dark: [
    "#b91c1c",
    "#c2410c",
    "#a16207",
    "#4d7c0f",
    "#15803d",
    "#0f766e",
    "#1d4ed8",
    "#7e22ce",
  ],
};

function prepareData(stays, isDarkMode) {
  const themeColors = isDarkMode ? COLORS.dark : COLORS.light;

  const data = DURATION_BUCKETS.map((bucket, index) => ({
    duration: bucket.label,
    value: 0,
    color: themeColors[index],
  }));

  stays.forEach(({ numNights }) => {
    const bucket = data.find(
      (b, i) =>
        numNights >= DURATION_BUCKETS[i].min &&
        numNights <= DURATION_BUCKETS[i].max
    );

    if (bucket) bucket.value += 1;
  });

  return data.filter((item) => item.value > 0);
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();

  const data = prepareData(confirmedStays, isDarkMode);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={86}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map(({ duration, color }) => (
              <Cell key={duration} fill={color} stroke={color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
