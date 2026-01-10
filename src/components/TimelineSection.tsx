"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type PhaseStatus = "completed" | "current" | "upcoming";

function getCardBorderStyles(status: PhaseStatus): string {
  switch (status) {
    case "current":
      return "border-ws-accent shadow-glow";
    case "completed":
      return "border-ws-accent/40";
    default:
      return "border-ws-muted/20";
  }
}

function getTitleStyles(status: PhaseStatus): string {
  switch (status) {
    case "current":
      return "text-ws-accent";
    case "completed":
      return "text-ws-glow";
    default:
      return "text-ws-muted";
  }
}

function getDotStyles(status: PhaseStatus): string {
  switch (status) {
    case "current":
      return "border-ws-accent bg-ws-accent glow-dot-active";
    case "completed":
      return "border-ws-accent bg-ws-accent/30 glow-dot";
    default:
      return "border-ws-muted/50 bg-ws-card";
  }
}

function getMobileIndicatorStyles(status: PhaseStatus): string {
  switch (status) {
    case "current":
      return "bg-ws-accent glow-dot-active";
    case "completed":
      return "bg-ws-accent/60 glow-dot";
    default:
      return "bg-ws-muted/30";
  }
}

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

const timelinePhases: TimelinePhase[] = [
  {
    id: "phase1",
    title: "Phase 1",
    description: "Long phase 1 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "current",
  },
  {
    id: "phase2",
    title: "Phase 2",
    description: "Long phase 2 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "upcoming",
  },
  {
    id: "phase3",
    title: "Phase 3",
    description: "Long phase 3 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "upcoming",
  },
  {
    id: "phase4",
    title: "Phase 4",
    description: "Long phase 4 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "upcoming",
  },
  {
    id: "phase5",
    title: "Phase 5",
    description: "Long phase 5 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "upcoming",
  },
];

export default function TimelineSection(): React.JSX.Element {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      className="py-20 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ws-dark via-ws-darker to-ws-dark" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Development <span className="text-ws-accent">Timeline</span>
          </h2>
          <p className="text-ws-muted max-w-2xl mx-auto mb-22">
            Follow our journey as we build Wild Skies piece by piece.
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative hidden md:block">
          {/* Timeline Items Container - provides height for the layout */}
          <div className="relative flex justify-between gap-4 py-40">
            {/* Timeline Line - positioned in the middle */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-ws-muted/20 -translate-y-1/2" />

            {/* Glowing progress line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-ws-accent -translate-y-1/2 glow-line"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "20%" } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            />

            {timelinePhases.map((phase, index) => {
              const isTop = index % 2 === 0;
              const isActive = phase.status !== "upcoming";
              const connectorColor = isActive ? "bg-ws-accent/50" : "bg-ws-muted/30";

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex-1 relative flex flex-col items-center"
                >
                  {/* Dot on timeline - absolutely centered */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${getDotStyles(phase.status)}`}
                  >
                    {phase.status === "completed" && (
                      <svg
                        className="w-3 h-3 text-ws-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Connector line from dot to card */}
                  <div
                    className={`absolute left-1/2 w-0.5 -translate-x-1/2 ${connectorColor} ${
                      isTop ? "top-0 h-[calc(50%-12px)]" : "bottom-0 h-[calc(50%-12px)]"
                    }`}
                  />

                  {/* Content Card */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 bg-ws-card/50 rounded-xl p-4 border transition-all w-full max-w-xs ${getCardBorderStyles(phase.status)} ${
                      isTop ? "bottom-[calc(50%+20px)]" : "top-[calc(50%+20px)]"
                    }`}
                  >
                    {phase.status === "current" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ws-accent text-ws-darker text-xs font-bold rounded-full">
                        CURRENT
                      </div>
                    )}

                    <h3 className={`text-lg font-bold mb-2 ${getTitleStyles(phase.status)}`}>
                      {phase.title}
                    </h3>
                    <p className="text-sm text-ws-text/80 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden flex flex-col gap-6">
          {timelinePhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Mobile indicator */}
              <div
                className={`w-4 h-4 rounded-full mb-2 ${getMobileIndicatorStyles(phase.status)}`}
              />

              {/* Content Card */}
              <div
                className={`relative bg-ws-card/50 rounded-xl p-4 border transition-all w-full max-w-xs ${getCardBorderStyles(phase.status)}`}
              >
                {phase.status === "current" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ws-accent text-ws-darker text-xs font-bold rounded-full">
                    CURRENT
                  </div>
                )}

                <h3 className={`text-lg font-bold mb-2 ${getTitleStyles(phase.status)}`}>
                  {phase.title}
                </h3>
                <p className="text-sm text-ws-text/80 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-ws-muted/60 text-sm mt-22"
        >
          Development timeline is subject to change. Follow us on Discord for the latest updates.
        </motion.p>
      </div>
    </section>
  );
}
