// Instructions:
// https://adventofcode.com/2019/day/4

import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split("-").map(Number)

const findPasswordRange = (input: number[]) => {
  let range = 0
  for (let i = input[0]; i <= input[1]; i++) {
    const currentPassArray = Array.from(i.toString()).map(Number)
    const passSize = currentPassArray.length

    let possiblePassword = true
    let hasDoubles = false
    let doubleSetLargerThanTwo = true

    for (let j = 0; j < passSize; j++) {
      if (currentPassArray[j] < currentPassArray[j - 1]) {
        possiblePassword = false
        continue
      }

      if (currentPassArray[j - 1] === currentPassArray[j]) {
        hasDoubles = true
        const doubleDigit = currentPassArray[j]
        
        if (currentPassArray[j + 1] !== doubleDigit && currentPassArray[j - 2] !== doubleDigit) {
          doubleSetLargerThanTwo = false
        }
      }
    }
    if (hasDoubles && possiblePassword && !doubleSetLargerThanTwo) {
      range++
    }
  }
  return range
}

const rangeOfPasswords = findPasswordRange(dataInput)
console.log(rangeOfPasswords)
