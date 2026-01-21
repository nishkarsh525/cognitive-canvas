import { motion } from "framer-motion";
import { TrendingUp, Zap, RefreshCw, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  delay?: number;
}

function MetricCard({ title, value, subtitle, icon, trend, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="glass-card-hover p-4"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{title}</p>
      </div>
      <p className="text-xs text-muted-foreground/70 mt-2">{subtitle}</p>
    </motion.div>
  );
}

export function MetricsPanel() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Learning Metrics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          title="Success Rate"
          value="87.3%"
          subtitle="Last 100 tasks"
          icon={<Target className="w-4 h-4 text-primary" />}
          trend={{ value: "4.2%", positive: true }}
          delay={0.1}
        />
        
        <MetricCard
          title="Prompt Version"
          value="v24"
          subtitle="3 updates today"
          icon={<RefreshCw className="w-4 h-4 text-primary" />}
          delay={0.2}
        />
        
        <MetricCard
          title="Avg. Iterations"
          value="2.3"
          subtitle="Per task completion"
          icon={<Zap className="w-4 h-4 text-primary" />}
          trend={{ value: "0.4", positive: true }}
          delay={0.3}
        />
        
        <MetricCard
          title="Learning Rate"
          value="0.94"
          subtitle="Improvement velocity"
          icon={<TrendingUp className="w-4 h-4 text-primary" />}
          trend={{ value: "12%", positive: true }}
          delay={0.4}
        />
      </div>
    </div>
  );
}
