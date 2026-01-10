"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { smoothScrollTo } from "@/utils/scrollTo";

// Get visible indices for the carousel with wrap-around
function getVisibleIndices(activeIndex: number, totalItems: number): number[] {
  const indices: number[] = [];
  for (let offset = -2; offset <= 2; offset++) {
    const index = (activeIndex + offset + totalItems) % totalItems;
    indices.push(index);
  }
  return indices;
}

// Get size and style classes based on distance from center
function getCircleConfig(position: number): { size: string; opacity: string; scale: number } {
  // position: 0 = -2, 1 = -1, 2 = center, 3 = +1, 4 = +2
  const distanceFromCenter = Math.abs(position - 2);

  if (distanceFromCenter === 0) {
    return { size: "w-20 h-20", opacity: "opacity-100", scale: 1 };
  } else if (distanceFromCenter === 1) {
    return { size: "w-16 h-16", opacity: "opacity-80", scale: 0.8 };
  } else {
    return { size: "w-12 h-12", opacity: "opacity-50", scale: 0.6 };
  }
}

function getCircleStyles(isSelected: boolean): string {
  if (isSelected) {
    return "border-ws-accent bg-ws-accent/20 glow-dot-active";
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
    <section id="gameplay" className="py-10 px-4 relative" ref={sectionRef}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-ws-accent">Gameplay</span>
        </h2>
        <p className="text-ws-muted max-w-2xl mx-auto text-sm">
          Explore the core features that make Wild Skies an unforgettable adventure.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          {/* Mobile: Horizontal Carousel Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              {/* Left Arrow */}
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + gameplayItems.length) % gameplayItems.length)}
                className="w-8 h-8 rounded-full bg-ws-card border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
                aria-label="Previous item"
              >
                <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Carousel circles */}
              <div className="flex items-center gap-1">
                {getVisibleIndices(activeIndex, gameplayItems.length).map((itemIndex, position) => {
                  const config = getCircleConfig(position);
                  const item = gameplayItems[itemIndex];
                  const isSelected = position === 2;

                  return (
                    <motion.button
                      key={`mobile-${itemIndex}-${position}`}
                      onClick={() => setActiveIndex(itemIndex)}
                      className={`relative rounded-full border-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${config.opacity} ${getCircleStyles(isSelected)}`}
                      animate={{ scale: config.scale }}
                      transition={{ duration: 0.3 }}
                      style={{ width: 56, height: 56 }}
                    >
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className={`text-base font-bold ${isSelected ? "text-ws-accent" : "text-ws-muted"}`}>
                          {itemIndex + 1}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % gameplayItems.length)}
                className="w-8 h-8 rounded-full bg-ws-card border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
                aria-label="Next item"
              >
                <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Desktop: Vertical Carousel Progress Bar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center gap-2 flex-shrink-0"
          >
            {/* Up Arrow */}
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + gameplayItems.length) % gameplayItems.length)}
              className="w-8 h-8 rounded-full bg-ws-card border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
              aria-label="Previous item"
            >
              <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {/* Carousel circles */}
            <div className="flex flex-col items-center gap-1">
              {getVisibleIndices(activeIndex, gameplayItems.length).map((itemIndex, position) => {
                const config = getCircleConfig(position);
                const item = gameplayItems[itemIndex];
                const isSelected = position === 2;

                return (
                  <motion.button
                    key={`desktop-${itemIndex}-${position}`}
                    onClick={() => setActiveIndex(itemIndex)}
                    className={`relative rounded-full border-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${config.opacity} ${getCircleStyles(isSelected)}`}
                    animate={{ scale: config.scale }}
                    transition={{ duration: 0.3 }}
                    style={{ width: 100, height: 100 }}
                  >
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className={`text-xl font-bold ${isSelected ? "text-ws-accent" : "text-ws-muted"}`}>
                        {itemIndex + 1}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Down Arrow */}
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % gameplayItems.length)}
              className="w-8 h-8 rounded-full bg-ws-card border border-ws-accent/30 flex items-center justify-center hover:border-ws-accent hover:shadow-glow-sm transition-all"
              aria-label="Next item"
            >
              <svg className="w-4 h-4 text-ws-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>

          {/* Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-ws-card/50 rounded-lg p-4 md:p-5 border border-ws-accent/20"
              >
                <h3 className="text-xl md:text-2xl font-bold text-ws-accent mb-2">
                  {gameplayItems[activeIndex].title}
                </h3>
                <p className="text-ws-text/90 mb-4 leading-relaxed text-sm">
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

        {/* Airships Teaser Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4"
        >
          <button
            onClick={() => smoothScrollTo("airships")}
            className="block w-full max-w-3xl mx-auto cursor-pointer"
          >
            <div className="relative group">
              {/* Background glow */}
              <div className="absolute inset-0 bg-ws-accent/20 blur-lg rounded-xl group-hover:bg-ws-accent/30 transition-all" />

              {/* Button */}
              <div className="relative bg-gradient-to-r from-ws-card via-ws-dark to-ws-card rounded-lg border border-ws-accent/40 p-4 text-center group-hover:border-ws-accent group-hover:shadow-glow transition-all">
                <p className="text-base md:text-lg font-medium text-ws-text">
                  Learn to master unique{" "}
                  <span className="text-ws-accent font-bold">Aerial Traversal</span>?
                </p>
                <div className="mt-1 flex items-center justify-center gap-2 text-ws-muted group-hover:text-ws-accent transition-colors">
                  <span className="text-xs">Discover more</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
