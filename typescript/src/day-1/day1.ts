// Instructions:
// https://adventofcode.com/2019/day/1

import { readInput } from '../../utils/readInput'

const rawInput = readInput()
const moduleInput = rawInput.split("\n").map(Number)

const requiredFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2
}

const totalRequiredFuel = (mass: number) => {
  const fuel = requiredFuel(mass)
  return fuel > 0 ? fuel + totalRequiredFuel(fuel) : 0
}

const total = (input: number[], calculateRequiredFuel: (mass: number) => number) => {
  return input.reduce((acc, moduleMass) => acc + calculateRequiredFuel(moduleMass), 0)
}

total(moduleInput, totalRequiredFuel)