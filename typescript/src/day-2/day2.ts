// https://adventofcode.com/2019/day/2

import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split(",").map(Number)

const intCode = (input: number[]) => {
  let position = 0
  const stepSize = 4

  for (position; position < input.length; position + stepSize) {
    if (input[position] === 99) return input
    const currentValue = input.slice(position, position + stepSize)
    switch (currentValue[0]) {
      case 1:
        input.splice(
          currentValue[3],
          1,
          input[currentValue[1]] + input[currentValue[2]]
        )
        break
      case 2:
        input.splice(
          currentValue[3],
          1,
          input[currentValue[1]] * input[currentValue[2]]
        )
        break
      default:
        return input
    }
    position = position + stepSize
  }
  return input
}

intCode(dataInput)