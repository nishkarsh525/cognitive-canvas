import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Wrench,
  XCircle,
  RefreshCw,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface ExecutionStep {
  id: string;
  type: "planning" | "tool" | "evaluation" | "reflection" | "success";
  status: "pending" | "active" | "completed" | "failed";
  title: string;
  description: string;
  timestamp: string;
  details?: string;
}

const mockSteps: ExecutionStep[] = [
  {
    id: "1",
    type: "planning",
    status: "completed",
    title: "Planning task",
    description: "Analyzing input and determining execution strategy",
    timestamp: "12:34:56",
    details: "Identified 3 sub-tasks. Estimated complexity: Medium. Selecting appropriate tools...",
  },
  {
    id: "2",
    type: "tool",
    status: "completed",
    title: "Calling tool: Code Analyzer",
    description: "Parsing and analyzing code structure",
    timestamp: "12:34:58",
    details: "Scanned 247 lines. Found 3 potential issues. Confidence: 0.94",
  },
  {
    id: "3",
    type: "evaluation",
    status: "failed",
    title: "Evaluation failed",
    description: "Hallucination detected in response",
    timestamp: "12:35:02",
    details: "Response contained fabricated function names. Triggering self-correction...",
  },
  {
    id: "4",
    type: "reflection",
    status: "completed",
    title: "Reflecting & updating prompt",
    description: "Adjusting approach based on failure analysis",
    timestamp: "12:35:04",
    details: "Updated prompt template v23 → v24. Added constraint: verify all function references.",
  },
  {
    id: "5",
    type: "success",
    status: "active",
    title: "Success after 2 iterations",
    description: "Task completed with verified output",
    timestamp: "12:35:08",
  },
];

const stepConfig = {
  planning: { icon: Brain, color: "text-primary", bgColor: "bg-primary/10" },
  tool: { icon: Wrench, color: "text-blue", bgColor: "bg-blue/10" },
  evaluation: { icon: XCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  reflection: { icon: RefreshCw, color: "text-warning", bgColor: "bg-warning/10" },
  success: { icon: CheckCircle, color: "text-success", bgColor: "bg-success/10" },
};

function TimelineStep({ step, index }: { step: ExecutionStep; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = stepConfig[step.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="relative"
    >
      {/* Timeline Line */}
      {index < mockSteps.length - 1 && (
        <div className="absolute left-5 top-12 w-px h-full bg-border" />
      )}

      <div
        className="glass-card-hover p-4 cursor-pointer"
        onClick={() => step.details && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`relative p-2 rounded-lg ${config.bgColor}`}>
            {step.status === "active" ? (
              <Loader2 className={`w-6 h-6 ${config.color} animate-spin`} />
            ) : (
              <Icon className={`w-6 h-6 ${config.color}`} />
            )}
            {step.status === "active" && (
              <div className={`absolute inset-0 rounded-lg ${config.bgColor} animate-pulse-ring`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-medium text-foreground truncate">
                {step.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {step.timestamp}
                </span>
                {step.details && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {step.description}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && step.details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border">
                <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                  {step.details}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function AgentExecutionTimeline() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Live Agent Reasoning
        </h3>
        <div className="flex items-center gap-2">
          <div className="status-dot status-thinking" />
          <span className="text-xs text-muted-foreground">Processing</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockSteps.map((step, index) => (
          <TimelineStep key={step.id} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}
