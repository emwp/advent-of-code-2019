// Instructions:
// https://adventofcode.com/2019/day/2

import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split(",").map(Number)

const intCode = (input: number[]) => {
  let position = 0
  const stepSize = 4

  for (position; position < input.length; position + stepSize) {
    if (input[position] === 99) return input[0]
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
        return input[0]
    }
    position = position + stepSize
  }
}

const checkNounVerb = (list: number[], noun: number, verb: number, target: number) => {
  const initialList = [...list]
  initialList.splice(1, 1, noun)
  initialList.splice(2, 1, verb)
  const result = intCode(initialList) 
  return result === target ? result : false 
}

const findNounAndVerb = (input: number[], target: number) => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const isTarget = checkNounVerb(input, i, j, target)
      if (isTarget === target) {
        return {
          noun: i,
          verb: j,
          result: 100 * i + j
        }
      }
    }
  }
}

findNounAndVerb(dataInput, 19690720)