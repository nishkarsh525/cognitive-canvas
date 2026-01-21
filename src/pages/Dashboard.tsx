import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AgentExecutionTimeline } from "@/components/agent/AgentExecutionTimeline";
import { RewardChart } from "@/components/charts/RewardChart";
import { MetricsPanel } from "@/components/charts/MetricsPanel";
import { ToolSuccessHeatmap } from "@/components/charts/ToolSuccessHeatmap";
import { Activity, Brain, Sparkles } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Agent Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time monitoring of your self-improving AI agent
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Tasks", value: "1,247", icon: Activity, change: "+23 today" },
            { label: "Active Sessions", value: "3", icon: Sparkles, change: "2 learning" },
            { label: "Memory Nodes", value: "847", icon: Brain, change: "+12 new" },
            { label: "Uptime", value: "99.9%", icon: Activity, change: "Last 30 days" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Agent Timeline */}
          <div className="col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5 h-full"
            >
              <AgentExecutionTimeline />
            </motion.div>
          </div>

          {/* Right Column - Metrics */}
          <div className="col-span-7 space-y-6">
            <RewardChart />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-5">
                <MetricsPanel />
              </div>
              <ToolSuccessHeatmap />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
