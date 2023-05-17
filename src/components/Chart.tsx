import { useState } from 'react';
import { mockHistoricalData } from '../constants/mock.ts';
import { convertUnixTimestampToDate } from '../helpers/date-helpers.ts';
import Card from './Card.tsx';
import { chartConfig } from '../constants/config.ts';
import ChartFilter from './ChartFilter.tsx';
import { HistoricalData } from '../types/stock.ts';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../contexts/themeContext.tsx';

type FilterType = '1D' | '1W' | '1M' | '1Y';

export default function Chart() {
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState<FilterType>('1W');
  const { theme } = useTheme();

  const formData = (historicalData: HistoricalData) => {
    return historicalData.c.map((item, index) => ({
      value: item.toFixed(2),
      date: convertUnixTimestampToDate(data.t[index]),
    }));
  };

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
      <ResponsiveContainer>
        <AreaChart data={formData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme === 'light' ? 'rgb(199 210 254)' : '#312e81'}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme === 'light' ? 'rgb(199 210 254)' : '#312e81'}
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
              theme === 'dark' ? { backgroundColor: '#111827' } : undefined
            }
            itemStyle={theme === 'dark' ? { color: '#818cf8' } : undefined}
          />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin', 'dataMax']} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
