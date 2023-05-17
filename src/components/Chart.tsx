import { useCallback, useEffect, useState } from "react";
import {
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
  createDate,
} from "../utils/helpers/date-helpers.ts";
import Card from "./Card.tsx";
import { chartConfig } from "../constants/config.ts";
import ChartFilter from "./ChartFilter.tsx";
import { HistoricalData } from "../types/stock.ts";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../contexts/themeContext.tsx";
import { useStock } from "../contexts/stockContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "../utils/api/stock-api.ts";

type FilterType = "1D" | "1W" | "1M" | "1Y";

export default function Chart() {
  const [filter, setFilter] = useState<FilterType>("1W");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [resolution, setResolution] = useState<string>("1");

  const { stockSymbol } = useStock();
  const { theme } = useTheme();

  /**
   * 필터에 따라 차트에 표시할 데이터의 기간을 설정한다.
   */
  const getDateRange = useCallback(() => {
    const { days, weeks, months, years } = chartConfig[filter];

    const endDate = new Date();
    const startDate = createDate(endDate, -days, -weeks, -months, -years);

    const startTimestampUnix = convertDateToUnixTimestamp(startDate);
    const endTimestampUnix = convertDateToUnixTimestamp(endDate);

    setStartTime(startTimestampUnix);
    setEndTime(endTimestampUnix);
  }, [filter]);

  useEffect(() => {
    getDateRange();
    setResolution(chartConfig[filter].resolution);
  }, [filter, getDateRange]);

  /**
   * 차트에 표시할 데이터를 가져온다.
   */
  const { data } = useQuery({
    queryKey: ["historicalData", stockSymbol, resolution, startTime, endTime],
    queryFn: () =>
      fetchHistoricalData({
        stockSymbol,
        resolution,
        from: startTime ?? 0,
        to: endTime ?? 0,
      }),
    select: (res) => res.data,
    enabled: !!stockSymbol && !!startTime && !!endTime,
    keepPreviousData: true, //? 이전 데이터를 유지해야 차트 깜박임을 방지할 수 있다.
    onSuccess: (data) => {
      console.log("historical data: ", data);
    },
  });

  /**
   * 데이터를 차트에 표시하기 위해 포맷팅한다.
   * @param historicalData
   */
  const formatData = useCallback(
    (historicalData: HistoricalData) => {
      return historicalData.c.map((item, index) => ({
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data?.t[index]),
      }));
    },
    [data]
  );

  return (
    <Card>
      <ul className={`absolute right-2 top-2 z-40 flex bg-slate-300/10`}>
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => setFilter(item as FilterType)}
            />
          </li>
        ))}
      </ul>
      {data && (
        <>
          <ResponsiveContainer>
            <AreaChart data={formatData(data)}>
              <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={
                      theme === "light" ? "rgb(199 210 254)" : "#312e81"
                    }
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={
                      theme === "light" ? "rgb(199 210 254)" : "#312e81"
                    }
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#312e81"
                fillOpacity={1}
                fill="url(#chartColor)"
                strokeWidth={0.5}
              />
              <Tooltip
                contentStyle={
                  theme === "dark" ? { backgroundColor: "#111827" } : undefined
                }
                itemStyle={theme === "dark" ? { color: "#818cf8" } : undefined}
              />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin", "dataMax"]} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
}
