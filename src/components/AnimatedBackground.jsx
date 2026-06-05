import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const floatingParticles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 20 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold/5"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
