"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { smoothScrollTo } from "@/utils/scrollTo";

function getCircleStyles(index: number, activeIndex: number): string {
  if (index === activeIndex) {
    return "border-ws-accent bg-ws-accent/20 glow-dot-active";
  }
  if (index < activeIndex) {
    return "border-ws-accent/60 bg-ws-accent/10 glow-dot";
  }
  return "border-ws-muted/30 bg-ws-card hover:border-ws-accent/50";
}

interface GameplayItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  icon?: string; // Optional icon image for the circle
}

const PLACEHOLDER_IMAGES = [
  "/images/placeholder-1.jpg",
  "/images/placeholder-2.jpg",
  "/images/placeholder-3.jpg",
];

const PLACEHOLDER_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const gameplayItems: GameplayItem[] = [
  {
    id: "gameplay1",
    title: "gameplay 1",
    description: `Long description of gameplay feature 1. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay1.png",
  },
  {
    id: "gameplay2",
    title: "gameplay 2",
    description: `Long description of gameplay feature 2. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay2.png",
  },
  {
    id: "gameplay3",
    title: "gameplay 3",
    description: `Long description of gameplay feature 3. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay3.png",
  },
  {
    id: "gameplay4",
    title: "gameplay 4",
    description: `Long description of gameplay feature 4. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay4.png",
  },
  {
    id: "gameplay5",
    title: "gameplay 5",
    description: `Long description of gameplay feature 5. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay5.png",
  },
  {
    id: "gameplay6",
    title: "gameplay 6",
    description: `Long description of gameplay feature 6. ${PLACEHOLDER_DESCRIPTION}`,
    images: PLACEHOLDER_IMAGES,
    icon: "/images/icons/gameplay6.png",
  },
];

interface ImageGalleryProps {
  images: string[];
  title: string;
}

function ImageGallery({ images, title }: ImageGalleryProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-ws-card border border-ws-accent/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Placeholder for actual images */}
            <div className="w-full h-full bg-gradient-to-br from-ws-card to-ws-dark flex items-center justify-center">
              <span className="text-ws-muted text-sm">
                {title} - Image {currentIndex + 1}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ws-darker/80 border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ws-darker/80 border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-ws-accent shadow-glow-sm w-4"
                  : "bg-ws-muted/50 hover:bg-ws-muted"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GameplaySection(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="gameplay" className="py-20 px-4 relative" ref={sectionRef}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-ws-accent">Gameplay</span>
        </h2>
        <p className="text-ws-muted max-w-2xl mx-auto">
          Explore the core features that make Wild Skies an unforgettable adventure.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
          {/* Vertical Progress Bar - fixed width to prevent overlap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:flex-col items-center gap-0 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:w-64 flex-shrink-0"
          >
            {gameplayItems.map((item, index) => (
              <div key={item.id} className="flex lg:flex-col items-center">
                {/* Circle with image or number */}
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full border-3 flex items-center justify-center transition-all duration-300 overflow-hidden ${getCircleStyles(index, activeIndex)}`}
                >
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span
                      className={`text-2xl font-bold ${
                        index <= activeIndex ? "text-ws-accent" : "text-ws-muted"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Label below circle on desktop */}
                <span
                  className={`hidden lg:block mt-2 text-sm font-medium transition-colors text-center max-w-24 ${
                    index === activeIndex ? "text-ws-accent" : "text-ws-muted"
                  }`}
                >
                  {item.title}
                </span>

                {/* Connecting Line */}
                {index < gameplayItems.length - 1 && (
                  <div className="relative w-6 lg:w-1 h-1 lg:h-8 lg:my-2">
                    {/* Background line */}
                    <div className="absolute inset-0 bg-ws-muted/20 rounded-full" />
                    {/* Glowing progress line - horizontal for mobile */}
                    <motion.div
                      className="lg:hidden absolute inset-0 rounded-full glow-line"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: index < activeIndex ? 1 : 0,
                      }}
                      style={{
                        transformOrigin: "left",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Vertical version for desktop */}
                    <motion.div
                      className="hidden lg:block absolute inset-0 rounded-full glow-line"
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY: index < activeIndex ? 1 : 0,
                      }}
                      style={{
                        transformOrigin: "top",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Content Panel - Sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 min-w-0 lg:sticky lg:top-24 lg:self-start"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-ws-card/50 rounded-xl p-6 md:p-8 border border-ws-accent/20"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-ws-accent mb-4">
                  {gameplayItems[activeIndex].title}
                </h3>
                <p className="text-ws-text/90 mb-6 leading-relaxed">
                  {gameplayItems[activeIndex].description}
                </p>
                <ImageGallery
                  images={gameplayItems[activeIndex].images}
                  title={gameplayItems[activeIndex].title}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Airships Teaser Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-20"
      >
        <button
          onClick={() => smoothScrollTo("airships")}
          className="block w-full max-w-4xl mx-auto cursor-pointer"
        >
          <div className="relative group">
            {/* Background glow */}
            <div className="absolute inset-0 bg-ws-accent/20 blur-xl rounded-2xl group-hover:bg-ws-accent/30 transition-all" />

            {/* Button */}
            <div className="relative bg-gradient-to-r from-ws-card via-ws-dark to-ws-card rounded-xl border border-ws-accent/40 p-6 md:p-8 text-center group-hover:border-ws-accent group-hover:shadow-glow transition-all">
              <p className="text-lg md:text-2xl font-medium text-ws-text">
                Learn to master unique{" "}
                <span className="text-ws-accent font-bold">Aerial Traversal</span>?
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-ws-muted group-hover:text-ws-accent transition-colors">
                <span className="text-sm">Discover more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
