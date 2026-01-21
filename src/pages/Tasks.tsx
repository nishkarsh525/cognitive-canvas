import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  Send,
  Loader2,
  Sparkles,
  Settings2,
  Zap,
} from "lucide-react";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [strictness, setStrictness] = useState([0.7]);
  const [maxIterations, setMaxIterations] = useState([5]);

  const handleSubmit = async () => {
    if (!task.trim()) return;
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setTask("");
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Submit Task</h1>
          </div>
          <p className="text-muted-foreground">
            Describe a task for the agent to solve and learn from
          </p>
        </motion.div>

        {/* Task Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 gradient-border"
        >
          {/* Textarea */}
          <div className="relative mb-4">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe the task you want the agent to solve..."
              className="w-full h-40 bg-muted/50 border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {task.length} characters
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <Settings2 className="w-4 h-4" />
            <span>Advanced Options</span>
            <motion.div
              animate={{ rotate: showAdvanced ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          {/* Advanced Options */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-muted/30 rounded-lg mb-4 space-y-6">
                  {/* Evaluation Strictness */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-foreground">
                        Evaluation Strictness
                      </Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {(strictness[0] * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Slider
                      value={strictness}
                      onValueChange={setStrictness}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher strictness requires more precise outputs
                    </p>
                  </div>

                  {/* Max Iterations */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-foreground">
                        Max Iterations
                      </Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {maxIterations[0]}
                      </span>
                    </div>
                    <Slider
                      value={maxIterations}
                      onValueChange={setMaxIterations}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum self-improvement cycles before giving up
                    </p>
                  </div>

                  {/* Allowed Tools */}
                  <div className="space-y-3">
                    <Label className="text-sm text-foreground">
                      Allowed Tools
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {["Code Analyzer", "Web Search", "File Reader", "API Caller", "Calculator"].map(
                        (tool) => (
                          <label
                            key={tool}
                            className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full cursor-pointer hover:bg-muted/80 transition-colors"
                          >
                            <Switch defaultChecked className="scale-75" />
                            <span className="text-xs text-foreground">{tool}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!task.trim() || isSubmitting}
            className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all glow-cyan"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Agent is thinking...</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Task</span>
                <Send className="w-4 h-4" />
              </motion.div>
            )}
          </Button>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {[
              { task: "Analyze code for potential security vulnerabilities", status: "completed", iterations: 2 },
              { task: "Generate unit tests for authentication module", status: "completed", iterations: 3 },
              { task: "Optimize database query performance", status: "learning", iterations: 1 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card-hover p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.task}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.iterations} iteration{item.iterations > 1 ? "s" : ""}
                  </p>
                </div>
                <div className={`status-dot ${item.status === "completed" ? "status-success" : "status-thinking"}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
