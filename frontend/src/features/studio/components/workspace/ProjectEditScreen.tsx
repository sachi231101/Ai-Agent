import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Rocket,
  Check,
  Copy,
  Sparkles,
  Paperclip,
  Mic,
  Send,
  ShieldAlert,
  GitBranch,
  FileCode,
  Layers,
  CheckCircle2,
  RefreshCw,
  Eye,
  ExternalLink,
  Plug,
} from "lucide-react";
import type { ProjectItem } from "../../data/sampleProjects";
import { LiveAgentSpecPanel } from "../blueprint/LiveAgentSpecPanel";
import { IntelligenceCenterPanel } from "../workspace/IntelligenceCenterPanel";
import { AgentExecutionPlayground } from "../preview/AgentExecutionPlayground";
import { ConnectAppModal } from "./ConnectAppModal";
import { useStudioEngine } from "../../hooks/useStudioEngine";

interface ProjectEditScreenProps {
  project: ProjectItem;
  onBackToProjects: () => void;
  onSelectOtherProject: (projectId: string) => void;
  allProjects: ProjectItem[];
}

export const ProjectEditScreen: React.FC<ProjectEditScreenProps> = ({
  project,
  onBackToProjects,
  onSelectOtherProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<
    "preview" | "spec" | "intelligence"
  >("preview");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [selectedPage, setSelectedPage] = useState("Homepage");
  const [inputPrompt, setInputPrompt] = useState("");
  const [changesList, setChangesList] = useState(project.changesLog);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Connect AI Conversation Intelligence Engine hook
  const studioEngine = useStudioEngine();

  const handleSendPrompt = (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text) return;
    setInputPrompt("");

    // Append new edit to change log
    const newEntry = {
      id: `c-${Date.now()}`,
      title: text,
      desc: `Applied edit: "${text}". Re-architecting workspace payload...`,
      timestamp: "Just now",
    };
    setChangesList([newEntry, ...changesList]);

    // Send to intelligence engine
    studioEngine.processUserInput(text);

    setToastMessage(`Updated project "${project.name}" with change: "${text}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d0b14] text-white font-sans overflow-hidden select-none relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#171424]/95 border border-purple-500/40 text-white text-xs font-semibold shadow-2xl shadow-purple-500/30 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── Top Header Bar (Matching Image 1) ────────────────────────────────────── */}
      <header className="h-14 px-4 bg-[#12101b] border-b border-white/10 flex items-center justify-between shrink-0 select-none">
        {/* Left: Back button + Project Selector + Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToProjects}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Projects</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Project Switcher Dropdown */}
          <div className="relative group">
            <select
              value={project.id}
              onChange={(e) => onSelectOtherProject(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-4 appearance-none hover:text-purple-300 transition-colors"
            >
              {allProjects.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-[#171524] text-white"
                >
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
          </div>

          <span className="text-[11px] text-white/40 hidden md:inline">
            Previewing last saved version
          </span>
        </div>

        {/* Center: Mode Selector + Page Selector + Device Toggle */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === "preview"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Execution Sandbox
            </button>
            <button
              onClick={() => setActiveTab("spec")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === "spec"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Specification
            </button>
            <button
              onClick={() => setActiveTab("intelligence")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === "intelligence"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Intelligence Engine
            </button>
          </div>

          {/* Device Toggles */}
          <div className="hidden lg:flex items-center gap-1 text-white/40 bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-1 rounded ${deviceMode === "desktop" ? "bg-white/20 text-white" : "hover:text-white"}`}
            >
              <Monitor size={14} />
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`p-1 rounded ${deviceMode === "tablet" ? "bg-white/20 text-white" : "hover:text-white"}`}
            >
              <Tablet size={14} />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-1 rounded ${deviceMode === "mobile" ? "bg-white/20 text-white" : "hover:text-white"}`}
            >
              <Smartphone size={14} />
            </button>
          </div>
        </div>

        {/* Right: Actions (Connect App, Share, Publish) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Plug size={13} className="text-purple-300" />
            <span>+ Connect App</span>
          </button>
          <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-extrabold text-xs text-slate-950 shadow-md">
            S
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors">
            <Share2 size={13} />
            <span>Share</span>
          </button>
          <button
            onClick={() =>
              setToastMessage(`Published "${project.name}" to live URL!`)
            }
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
          >
            <Rocket size={13} />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* ─── Main Content Body ────────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Panel: Chat / Prompts & Changes Log (Matching Image 1) */}
        <div className="lg:col-span-4 border-r border-white/10 bg-[#12101a] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Changes Log Cards */}
            <div className="space-y-3">
              {changesList.map((change) => (
                <div
                  key={change.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      {change.isGitCommit ? (
                        <GitBranch size={14} className="text-purple-400" />
                      ) : (
                        <Sparkles size={14} className="text-indigo-400" />
                      )}
                      <span>{change.title}</span>
                    </div>
                  </div>

                  {change.desc && (
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      {change.desc}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-[11px] font-semibold transition-colors">
                      Details
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-[11px] font-semibold transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick suggestion pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                "Verify no reloads",
                "Add regression test",
                "Log skipped refetches",
                "Confirm query",
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(pill)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 text-white/60 hover:text-purple-200 text-[11px] font-medium transition-all"
                >
                  + {pill}
                </button>
              ))}
            </div>

            {/* Security Warning Box */}
            <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <ShieldAlert size={15} />
                <span>Security: 12 issues</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[11px] text-white/60 hover:text-white">
                  View issues
                </button>
                <button className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-colors">
                  Try to fix all
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Chat Prompt Bar (Matching Image 1) */}
          <div className="p-3 border-t border-white/10 bg-[#0f0d16]/90 space-y-2">
            <div className="flex items-center justify-between px-2 text-[10px] text-white/40 font-mono">
              <span>Ask Vibe Agent...</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus-within:border-purple-500/50 transition-colors flex items-center gap-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Vibe Agent to edit..."
                className="w-full bg-transparent border-none outline-none text-white text-xs placeholder:text-white/30"
              />
              <div className="flex items-center gap-1 text-white/40">
                <button className="hover:text-white p-1" title="Voice prompt">
                  <Mic size={14} />
                </button>
                <button
                  onClick={() => handleSendPrompt()}
                  disabled={!inputPrompt.trim()}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    inputPrompt.trim()
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/40 hover:scale-105"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Area: Live Interactive Preview / Specification Workspace */}
        <div className="lg:col-span-8 h-full bg-[#09080e] overflow-hidden flex flex-col justify-center items-center">
          {activeTab === "preview" ? (
            <div className="w-full h-full">
              <AgentExecutionPlayground
                spec={studioEngine.agentSpec || project.spec}
                agentName={project.name}
                domain={project.domain}
                integrations={project.integrations}
              />
            </div>
          ) : activeTab === "spec" ? (
            <div className="w-full h-full">
              <LiveAgentSpecPanel
                agentSpec={studioEngine.agentSpec || project.spec}
                explanationText={
                  studioEngine.explanationText ||
                  `Your AI Agent "${project.name}" is architected and ready for deployment.`
                }
                editHistory={studioEngine.editHistory}
                onSaveAgent={() =>
                  setToastMessage(
                    `Saved agent specification for "${project.name}"!`,
                  )
                }
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <IntelligenceCenterPanel
                intent={studioEngine.intent}
                requirements={studioEngine.requirements}
                currentStage={studioEngine.currentStage}
                isProcessing={studioEngine.isProcessing}
                readiness={studioEngine.readiness}
                onDeploy={() =>
                  setToastMessage(`Deployed "${project.name}" to production!`)
                }
              />
            </div>
          )}
        </div>
      </div>

      <ConnectAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
};
