import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  AnimateSharedLayout
} from 'framer-motion'
import Loader from './Loader'
import { Frame, Stack } from 'framer'
import Grid from '@material-ui/core/Grid'
import Person from './Person'

const spring = {
  type: 'spring',
  stiffness: 50,
  duration: 1
}

export function StackComponent() {
  const [list, setList] = useState([1, 2, 3, 4, 5])

  return (
    <AnimatePresence>
      {list.map((item, i) => (
        <motion.div
          onClick={() => {
            let copy = [...list]
            copy.splice(i, 1)
            setList(copy)
          }}
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ height: 100 }}
        >
          {item}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    boxShadow: '0px 0px 8px rgb(255,255,255)',
    transition: {
      duration: 0.3,
      yoyo: 5
    }
  }
}

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 }
  },
  exit: {
    x: '-100vh',
    transition: { ease: 'easeInOut' }
  }
}

const size = 70
const padding = 10
const col1 = [0, 1, 2]
const col2 = [0, 1]
const col3 = [0, 1, 2, 3, 4, 5]
const columns = [col1, col2, col3]

const FM25Grid = () => {
  const [cols, setCols] = useState([0, 1, 2])

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        gridTemplateColumns: 'auto auto auto',
        gridGap: padding
      }}
    >
      {columns.map((column, i) => {
        return column.map((item, j) => {
          return (
            <motion.div
              onClick={() => {}}
              style={{
                width: size,
                height: size,
                borderRadius: 20,
                backgroundColor: '#000'
              }}
              whileHover={{ scale: 0.8, opacity: 0.5 }}
              key={`${j} : ${i}`}
            >
              {j}, {i}
            </motion.div>
          )
        })
      })}
    </div>
  )
}

const Home = () => {
  // const [coordinates, setCoordinates] = useState({
  //   Paul: { x: 0, y: 0 },
  //   Adrian: { x: 0, y: 150 },
  //   Sheila: { x: 150, y: 0 }
  // })

  const [list, setList] = useState([
    { name: 'Sheila', column: 0 },
    { name: 'Johnny', column: 1 },
    { name: 'Jeremy', column: 2 },
    { name: 'Dustin', column: 0 },
    { name: 'Bobby', column: 1 }
  ])

  const coordinates = {
    Paul: { x: 450, y: 0 },
    Adrian: { x: 450, y: 150 },
    Sheila: { x: 600, y: 0 }
  }
  const paul = useSpring(0, { stiffness: 100 })
  const adrian = useSpring(150, { stiffness: 100 })
  const paulSize = useSpring(1, { stiffness: 100 })
  const adrianSize = useSpring(1, { stiffness: 100 })

  console.log('react refresh')

  return (
    <>
      <motion.div
        className="home container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>Welcome to HelloTello</h2>
        <Link to="/base">
          {/* <motion.button variants={buttonVariants} whileHover="hover">
            Create Your Pizza
          </motion.button> */}
        </Link>

        {/* <Loader /> */}
        <div>
          <motion.button
            // whileHover={{ x: 0, y: 0 }}
            // whileTap={{ x: 0, y: 150 }}
            onClick={() => {
              paul.set(0)
              adrian.set(150)
              paulSize.set(1.5)
              adrianSize.set(1)
              // let person = list.pop()
              // list.unshift(person)
              list[0].column = (list[0].column + 1) % 3
              setList([...list])
              console.log(list)
              //setList([list[0], list[1], list[2]])

              const timer = setTimeout(() => {
                list[1].column = (list[1].column + 1) % 3
                setList([...list])
              }, 500)
            }}
            style={{
              position: 'absolute',
              x: coordinates.Paul.x,
              y: paul,
              scale: paulSize,
              msUserSelect: 'none'
            }}
          >
            Paul
          </motion.button>
          <motion.button
            onClick={() => {
              paul.set(150)
              adrian.set(0)
              paulSize.set(1)
              adrianSize.set(1.5)
            }}
            style={{ position: 'absolute', x: coordinates.Adrian.x, y: adrian, scale: adrianSize }}
          >
            Adrian
          </motion.button>
          {list.map((person, i) => (
            <motion.button
              onClick={() => {
                setList([...list, { name: `Monkey${list.length}`, column: 2 }])
                paulSize.set(1)
                adrianSize.set(1)
              }}
              style={{ position: 'absolute', x: coordinates.Sheila.x, y: i * 100 }}
            >
              {person.name}
            </motion.button>
          ))}
        </div>
        <AnimateSharedLayout>
          <AnimatePresence>
            <Grid container justify="center">
              {list.map((person, i) => (
                <motion.div layout key={person.name} exit={{ height: 0 }}>
                  <Grid item key={person.name}>
                    {person.name}
                  </Grid>
                </motion.div>
              ))}
              <motion.div layout key={'green'}>
                HelloTello
              </motion.div>
              <motion.div layout key={'jellybean'}>
                HelloTello
              </motion.div>
            </Grid>
          </AnimatePresence>
        </AnimateSharedLayout>
        <br />
        <AnimateSharedLayout>
          <AnimatePresence>
            {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: 20 }}>
              <motion.div layout key={'column1'}>
                {list
                  .filter((person, i) => 0 === person.column)
                  .map((person, i) => (
                    <motion.div
                      layout
                      layoutId={person.name}
                      key={person.name}
                      exit={{ height: 0 }}
                      style={{ fontSize: '40px', backgroundColor: '#000' }}
                      transition={spring}
                    >
                      {person.name}
                    </motion.div>
                  ))}
              </motion.div>
              <motion.div layout key={'column2'}>
                {list
                  .filter((person, i) => 1 === person.column)
                  .map((person, i) => (
                    <motion.div
                      layout
                      layoutId={person.name}
                      key={person.name}
                      exit={{ height: 0 }}
                      style={{ backgroundColor: '#000' }}
                      transition={spring}
                    >
                      {person.name}
                    </motion.div>
                  ))}
              </motion.div>
              <motion.div layout key={'column3'}>
                {list
                  .filter((person, i) => 2 === person.column)
                  .map((person, i) => (
                    <motion.div
                      layout
                      layoutId={person.name}
                      key={person.name}
                      exit={{ height: 0 }}
                      style={{ backgroundColor: '#000' }}
                      transition={spring}
                    >
                      {person.name}
                    </motion.div>
                  ))}
              </motion.div> */}
            <Grid
              style={{
                display: 'grid',
                gridTemplateAreas: '0 1 2',
                gridTemplateColumns: '[0] 1fr [1] 1fr [2] 1fr', //'repeat(3, 1fr)',
                gridTemplateRows: 'auto',
                gridGap: '20px',
                alignItems: 'start',
                gridAutoFlow: 'column'
              }}
            >
              {list.map((person, i) => (
                <Person name={person.name} column={person.column} />
              ))}
            </Grid>
            <motion.div layout key={'green'}>
              HelloTello
            </motion.div>
            <motion.div layout key={'jellybean'}>
              HelloTello
            </motion.div>
            {/* </div> */}
          </AnimatePresence>
        </AnimateSharedLayout>
      </motion.div>

      {/* <FM25Grid /> */}
    </>
  )
}

export default Home
