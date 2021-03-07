import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
    transition: {
      staggerChildren: 0.5,
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 7,
      when: "beforeChildren",
      staggerChildren: 2
    }
  },
}

const childVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 0,
  }
}

const Order = ({ pizza }) => {
  return (
    <motion.div className="container order"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Thank you for your order :)</h2>
      <motion.p variants={childVariants}>
        You ordered a {pizza.base} pizza with:
      </motion.p>

      <motion.div variants={childVariants}>
        {pizza.toppings.map(topping => <div key={topping} >{topping}</div>)}
        <div>monkey bread</div>
        <div>cheeseburgers</div>
      </motion.div>

            <motion.div variants={childVariants}>
        {pizza.toppings.map(topping => <div key={topping} >{topping}</div>)}
        <div>monkey bread</div>
        <div>cheeseburgers</div>
      </motion.div>

            <motion.div variants={childVariants}>
        {pizza.toppings.map(topping => <div key={topping} >{topping}</div>)}
        <div>monkey bread</div>
        <div>cheeseburgers</div>
      </motion.div>

    </motion.div>
  )
}

export default Order;