import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Settings as SettingsIcon,
  Shield,
  Brain,
  Download,
  Trash2,
  Key,
  AlertTriangle,
} from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <SettingsIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Configure agent behavior and system preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Learning Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Learning</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Live Learning</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow agent to update prompts in real-time
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Autonomous Improvements</Label>
                  <p className="text-xs text-muted-foreground">
                    Let agent make self-improvements without approval
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Memory Persistence</Label>
                  <p className="text-xs text-muted-foreground">
                    Retain learned patterns across sessions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>

          {/* Safety Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-success" />
              <h3 className="text-lg font-semibold text-foreground">Safety</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Safety Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable additional safety checks on outputs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Hallucination Detection</Label>
                  <p className="text-xs text-muted-foreground">
                    Flag potential hallucinations for review
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>

          {/* API Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold text-foreground">API Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground mb-2 block">API Key</Label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  className="bg-muted border-border"
                />
              </div>

              <div>
                <Label className="text-foreground mb-2 block">Endpoint URL</Label>
                <Input
                  type="text"
                  placeholder="https://api.example.com/v1"
                  className="bg-muted border-border"
                />
              </div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="w-4 h-4" />
                Export Logs
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="w-4 h-4" />
                Export Prompt History
              </Button>

              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset Memory
                </Button>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  This will clear all learned patterns
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
