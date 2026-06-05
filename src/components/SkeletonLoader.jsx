import { motion } from 'framer-motion';

export function SkeletonLoader({ width = 'w-full', height = 'h-4', count = 3, circle = false }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${width} ${height} ${circle ? 'rounded-full' : 'rounded-2xl'} bg-gradient-to-r from-white/5 via-white/10 to-white/5`}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <motion.div
      className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-4"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <SkeletonLoader width="w-3/4" height="h-6" count={1} />
      <SkeletonLoader width="w-full" height="h-80" count={1} />
      <SkeletonLoader count={2} />
      <SkeletonLoader width="w-1/2" height="h-4" count={1} />
    </motion.div>
  );
}
