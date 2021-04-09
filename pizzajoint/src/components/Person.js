import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  AnimateSharedLayout
} from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 50,
  duration: 1
}

const Person = ({ name, column }) => {
  const [columnNumber, setColumn] = useState(column)

  return (
    <motion.div
      layout
      layoutId={name}
      key={name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={spring}
      style={{
        // gridArea: `${person.column}`,
        gridColumnStart: `${column + 1}`,
        // gridRowStart: 'top',
        backgroundColor: '#000'
      }}
    >
      {name + ' ' + columnNumber}
    </motion.div>
  )
}

export default Person
