import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const rewardData = [
  { iteration: 1, reward: 0.45 },
  { iteration: 2, reward: 0.52 },
  { iteration: 3, reward: 0.48 },
  { iteration: 4, reward: 0.61 },
  { iteration: 5, reward: 0.58 },
  { iteration: 6, reward: 0.72 },
  { iteration: 7, reward: 0.69 },
  { iteration: 8, reward: 0.78 },
  { iteration: 9, reward: 0.82 },
  { iteration: 10, reward: 0.85 },
  { iteration: 11, reward: 0.79 },
  { iteration: 12, reward: 0.88 },
  { iteration: 13, reward: 0.91 },
  { iteration: 14, reward: 0.89 },
  { iteration: 15, reward: 0.94 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border">
        <p className="text-xs text-muted-foreground">Iteration {label}</p>
        <p className="text-sm font-semibold text-primary">
          Reward: {payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function RewardChart() {
  const currentReward = rewardData[rewardData.length - 1].reward;
  const previousReward = rewardData[rewardData.length - 2].reward;
  const change = ((currentReward - previousReward) / previousReward * 100).toFixed(1);
  const isPositive = currentReward > previousReward;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Reward Score</h3>
          <p className="text-xs text-muted-foreground">Learning progress over iterations</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">{currentReward.toFixed(2)}</p>
          <p className={`text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '↑' : '↓'} {change}%
          </p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rewardData}>
            <defs>
              <linearGradient id="rewardGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(192, 91%, 56%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(192, 91%, 56%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="iteration"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
            />
            <YAxis
              domain={[0, 1]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="reward"
              stroke="hsl(192, 91%, 56%)"
              strokeWidth={2}
              fill="url(#rewardGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
