import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split("-").map(Number)

const findPasswordRange = (input : number[]) => {
  let range = 0
  for (let i = input[0]; i <= input[1]; i++) {
    const currentPassArray = Array.from(i.toString()).map(Number)
    const passSize = currentPassArray.length

    let possiblePass = true
    let hasDoubles = false

    for (let j = 0; j < passSize; j++) {
      if (currentPassArray[j] < currentPassArray[j - 1]) {
        possiblePass = false
        break
      }

      if (currentPassArray[j - 1] === currentPassArray[j]) {
        hasDoubles = true
      }
    }
    if (hasDoubles && possiblePass) {
      range++
    } 
  }
  return range
}

const rangeOfPasswords = findPasswordRange(dataInput)
console.log(rangeOfPasswords)