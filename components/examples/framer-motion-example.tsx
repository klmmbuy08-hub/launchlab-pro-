'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function FramerMotionExample() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="space-y-6">
      {/* Fade In Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-neutral-900 border-neutral-800">
          <h3 className="text-white font-semibold">Fade In Card</h3>
          <p className="text-neutral-400 mt-2">
            This card fades in smoothly when loaded
          </p>
        </Card>
      </motion.div>

      {/* Hover Scale Animation */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="p-6 bg-neutral-900 border-neutral-800 cursor-pointer">
          <h3 className="text-white font-semibold">Hover Me</h3>
          <p className="text-neutral-400 mt-2">
            This card scales up on hover
          </p>
        </Card>
      </motion.div>

      {/* Stagger Children Animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-3 gap-4"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="p-6 bg-neutral-900 border-neutral-800">
              <h4 className="text-white font-medium">Card {i}</h4>
              <p className="text-neutral-400 text-sm mt-1">
                Staggered animation
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Toggle */}
      <Card
        className="p-6 bg-neutral-900 border-neutral-800 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="text-white font-semibold mb-4">Interactive Element</h3>
        <motion.div
          className="h-2 bg-blue-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '50%' }}
          transition={{ duration: 0.3 }}
        />
        <p className="text-neutral-400 text-sm mt-2">
          Hover to see animation
        </p>
      </Card>
    </div>
  )
}
