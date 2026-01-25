"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { smoothScrollTo } from "@/utils/scrollTo";

export default function HomeSection(): React.JSX.Element {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-ws-darker via-ws-dark to-ws-darker" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(74, 158, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(74, 158, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-6">
        {/* Wild Skies Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 w-full"
        >
          <Image
            src="/images/logo-text.png"
            alt="Wild Skies"
            width={800}
            height={150}
            className="mx-auto w-[70%] md:w-[60%] lg:w-[50%] h-auto"
            priority
          />
        </motion.div>

        {/* YouTube Video Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative rounded-xl overflow-hidden shadow-glow-lg border border-ws-accent/30">
            {/* Aspect ratio container for 16:9 video */}
            <div className="relative w-full" style={{ paddingBottom: "57.5%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/o77MzDQT1cg?rel=0"
                title="Wild Skies Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="absolute -inset-4 bg-ws-accent/10 blur-3xl rounded-full -z-10" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-ws-muted text-sm uppercase tracking-widest mb-2">
            Wild Skies Trailer pending...
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-ws-text">
            Adventure <span className="text-ws-accent">Awaits</span>
          </h2>
        </motion.div>
      </div>

      {/* Scroll indicator - fixed to bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={() => smoothScrollTo("gameplay")}
          className="cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-ws-muted group-hover:text-ws-accent transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
