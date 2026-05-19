"use client";

import { motion } from 'framer-motion';
import { useAnimate } from 'framer-motion';

export default function Loader() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const particleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: (i: number) => ({
      opacity: [0.2, 0.8, 0.2],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    })
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const waveVariants = {
    animate: (i: number) => ({
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 2,
        delay: i * 0.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    })
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const
      }
    }
  };

  const dotVariants = {
    animate: (i: number) => ({
      y: [0, -20, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.2,
        delay: i * 0.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            animate="visible"
            className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-sky-200 to-blue-300 shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={waveVariants}
              animate="animate"
              className="absolute bottom-0 h-8 bg-gradient-to-t from-sky-300/30 to-transparent rounded-full"
              style={{
                left: `${i * 20}%`,
                width: '15%',
                height: `${30 + i * 10}px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main loader container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center space-y-8 p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        {/* Animated logo/icon */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-sky-100"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear" as const
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const
              }
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-3 border-blue-200"
            animate={{
              rotate: -360,
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear" as const
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut" as const
              }
            }}
          />

          {/* Main icon */}
          <motion.div
            variants={logoVariants}
            animate={["visible", "pulse"]}
            className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 shadow-xl flex items-center justify-center"
          >
            {/* Animated dots inside logo */}
            <div className="absolute inset-4 flex items-center justify-center">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${50 + 30 * Math.cos((i * Math.PI) / 2)}%`,
                    top: `${50 + 30 * Math.sin((i * Math.PI) / 2)}%`,
                  }}
                />
              ))}
            </div>

            {/* Center dot */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
              className="w-4 h-4 bg-white rounded-full"
            />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="w-64 space-y-4">
          {/* Progress bar container */}
          <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
            <motion.div
              variants={lineVariants}
              animate="visible"
              className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 rounded-full relative"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear" as const
                }}
              />
            </motion.div>
          </div>

          {/* Animated dots below progress bar */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
                className="w-2 h-2 rounded-full bg-sky-400"
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          variants={textVariants}
          className="text-center space-y-2"
        >
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          >
            Loading
          </motion.h3>
          <motion.p
            className="text-sky-500/80 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          >
            Preparing your experience
          </motion.p>
        </motion.div>

        {/* Percentage counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ease: "easeOut" as const }}
          className="absolute -bottom-6"
        >
          <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-sky-100 shadow-lg">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
            >
              100%
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Additional decorative elements around the loader */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner decorations */}
        {[
          { x: "left-4", y: "top-4" },
          { x: "right-4", y: "top-4" },
          { x: "left-4", y: "bottom-4" },
          { x: "right-4", y: "bottom-4" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos.x} ${pos.y} w-16 h-16 border-2 border-sky-200/30 rounded-lg`}
            animate={{
              rotate: 360,
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear" as const
              },
              scale: {
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut" as const
              }
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}