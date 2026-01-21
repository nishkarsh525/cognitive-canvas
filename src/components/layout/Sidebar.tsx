import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  GitBranch,
  Brain,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/tasks", icon: ListTodo, label: "Tasks" },
  { path: "/prompts", icon: GitBranch, label: "Prompt Evolution" },
  { path: "/memory", icon: Brain, label: "Memory Graph" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-50 blur-lg" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">MetaMind</h1>
            <p className="text-xs text-muted-foreground">Self-Improving AI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200 group
                  ${isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Status Indicator */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="status-dot status-thinking" />
            <span className="text-xs font-medium text-foreground">Agent Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Learning from 127 iterations
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
