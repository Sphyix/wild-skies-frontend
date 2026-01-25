"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { smoothScrollTo } from "@/utils/scrollTo";

interface AirshipFeature {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
}

const airshipFeatures: AirshipFeature[] = [
  {
    id: "feature1",
    title: "Feature 1 title",
    shortTitle: "Feat 1",
    description: "Description 1",
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
  },
  {
    id: "feature2",
    title: "Feature 2 title",
    shortTitle: "Feat 2",
    description: "Description 2",
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
  },
  {
    id: "feature3",
    title: "Feature 3 title",
    shortTitle: "Feat 3",
    description: "Description 3",
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
  },
  {
    id: "feature4",
    title: "Feature 4 title",
    shortTitle: "Feat 4",
    description: "Description 4",
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
  },
];

export default function AirshipsSection(): React.JSX.Element {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="airships"
      className="min-h-[90vh] py-12 px-4 relative overflow-hidden flex flex-col justify-center"
      ref={sectionRef}
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-ws-darker via-ws-dark to-ws-darker" />

      {/* Decorative clouds/sky effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ws-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ws-glow/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-ws-accent">Airships</span>
          </h2>
          <p className="text-ws-muted max-w-2xl mx-auto text-lg">
            Your own Airship. Details.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {airshipFeatures.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`relative group px-6 py-4 md:px-8 md:py-5 rounded-xl font-medium text-sm md:text-base transition-all duration-300 ${index === activeFeature
                  ? "bg-ws-accent text-ws-darker shadow-glow"
                  : "bg-ws-card border border-ws-accent/30 text-ws-text hover:border-ws-accent hover:shadow-glow-sm"
                }`}
            >
              {/* Desktop text */}
              <span className="hidden md:inline">{feature.title}</span>
              {/* Mobile text */}
              <span className="md:hidden">{feature.shortTitle}</span>

              {/* Active indicator */}
              {index === activeFeature && (
                <motion.div
                  layoutId="activeFeature"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-ws-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Main Showcase Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden bg-ws-card border border-ws-accent/30 shadow-glow">
            {/* Placeholder for airship showcase */}
            <div className="absolute inset-0 bg-gradient-to-br from-ws-card via-ws-dark to-ws-darker flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  <svg className="w-24 h-24 mx-auto text-ws-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <p className="text-ws-muted">Airship Showcase Image</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ws-darker via-ws-darker/90 to-transparent p-6 md:p-8"
              >
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-ws-accent mb-3">
                    {airshipFeatures[activeFeature].title}
                  </h3>
                  <p className="text-ws-text/90 mb-4">
                    {airshipFeatures[activeFeature].description}
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {airshipFeatures[activeFeature].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-ws-muted">
                        <svg className="w-4 h-4 text-ws-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Timeline Teaser Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={() => smoothScrollTo("timeline")}
            className="block w-full max-w-3xl mx-auto cursor-pointer"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-ws-accent/20 blur-lg rounded-xl group-hover:bg-ws-accent/30 transition-all" />
              <div className="relative bg-gradient-to-r from-ws-card via-ws-dark to-ws-card rounded-lg border border-ws-accent/40 p-4 text-center group-hover:border-ws-accent group-hover:shadow-glow transition-all">
                <p className="text-base md:text-lg font-medium text-ws-text">
                  Curious about our{" "}
                  <span className="text-ws-accent font-bold">Development Roadmap</span>?
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 text-ws-muted group-hover:text-ws-accent transition-colors">
                  <span className="text-sm">See the timeline</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
