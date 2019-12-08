import { readInput } from "../../utils/readInput"

interface Wire {
  Direction: string
  Distance: number
}

interface Paths {
  X: number
  Y: number
}

const wiresInput = (input: string) => {
  return input.split("\n").map(x =>
    x.split(",").map(item => ({
      Direction: item.slice(0, 1),
      Distance: parseInt(item.slice(1), 10)
    }))
  )
}

const firstWire = wiresInput(readInput())[0]
const secondWire = wiresInput(readInput())[1]

const getPaths = (wire: Wire[]) => {
  const visitedPaths: Paths[] = []
  const currentPath: Paths = { X: 0, Y: 0 }

  wire.forEach(step => {
    switch (step.Direction) {
      case "R":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.X += 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "L":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.X -= 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "U":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.Y += 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "D":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.Y -= 1
          visitedPaths.push({ ...currentPath })
        }
        break
    }
  })
  return visitedPaths
}

const intersections = (points1: Paths[], points2: Paths[]) => {
  const intersections: Paths[] = []
  points1.forEach((point1, i) => {
    console.log(`${i} / ${points1.length}`)
    points2.forEach(point2 => {
      if (point1.X == point2.X && point1.Y == point2.Y) {
        intersections.push(point1)
      }
    })
  })
  return intersections
}

const getClosestDistance = (intersections: Paths[]) => {
  const distance: number[] = []
  intersections.forEach(point => {
    const pointDistance = Math.abs(point.X) + Math.abs(point.Y)
    distance.push(pointDistance)
  })

  const minDistance = Math.min.apply(null, distance)
  return minDistance
}

const intersecPoints = intersections(getPaths(firstWire), getPaths(secondWire))
console.log('MINIMUN DISTANCE: ', getClosestDistance(intersecPoints))