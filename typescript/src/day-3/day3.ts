// Instructions:
// https://adventofcode.com/2019/day/3

import { readInput } from "../../utils/readInput"

interface Wire {
  Direction: string
  Distance: number
}

interface Path {
  X: number
  Y: number
  Steps: number
}

interface Intersection {
  Point: Path
  WireA: Path
  WireB: Path
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
  const visitedPaths: Path[] = []
  const currentPath: Path = { X: 0, Y: 0, Steps: 0 }

  wire.forEach(step => {
    switch (step.Direction) {
      case "R":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.X += 1
          currentPath.Steps += 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "L":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.X -= 1
          currentPath.Steps += 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "U":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.Y += 1
          currentPath.Steps += 1
          visitedPaths.push({ ...currentPath })
        }
        break
      case "D":
        for (let i = 0; i < step.Distance; i++) {
          currentPath.Y -= 1
          currentPath.Steps += 1
          visitedPaths.push({ ...currentPath })
        }
        break
    }
  })
  return visitedPaths
}

const intersections = (pointsA: Path[], pointsB: Path[]): Intersection[] => {
  const intersections: Intersection[] = []
  pointsA.forEach((pointA, i) => {
    console.log(`${i} / ${pointsA.length} - Loading!?`)
    pointsB.forEach(pointB => {
      if (pointA.X == pointB.X && pointA.Y == pointB.Y) {
        intersections.push({ Point: pointA, WireA: pointA, WireB: pointB })
      }
    })
  })
  return intersections
}

const getClosestDistance = (intersections: Intersection[]) => {
  const distance: number[] = []
  let currentMinSteps: number
  intersections.forEach(item => {
    const pointDistance = Math.abs(item.Point.X) + Math.abs(item.Point.Y)
    distance.push(pointDistance)

    const IntersectionStepCount = item.WireA.Steps + item.WireB.Steps
    if (!currentMinSteps || IntersectionStepCount < currentMinSteps) {
      currentMinSteps = IntersectionStepCount
    }
  })
  const minDistance = Math.min.apply(null, distance)

  return {
    MinDistance: minDistance,
    MinSteps: currentMinSteps
  }
}

const intersecPoints = intersections(getPaths(firstWire), getPaths(secondWire))
console.log(getClosestDistance(intersecPoints))
