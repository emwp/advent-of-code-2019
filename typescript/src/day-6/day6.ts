import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split("\n").map(String)

interface OrbitInfo {
  Parent: string
  Child: string
}

const formatOrbitData = (input: string[]): OrbitInfo[] => {
  return input.map(element => {
    const splitOrbitData = element.split(")")
    return {
      Parent: splitOrbitData[0],
      Child: splitOrbitData[1]
    }
  })
}

const findOrbits = (data: string[]) => {
  const orbitData = formatOrbitData(data)
  let orbitCount = 0
  let checkedOrbits: string[] = []

  const countOrbitsForElement = (data: OrbitInfo[], element: string) => {
    const indirectOrbit = data.find(item => item.Child === element)

    if (indirectOrbit && indirectOrbit.Parent !== "COM") {
      orbitCount++
      countOrbitsForElement(orbitData, indirectOrbit.Parent)
    }
  }

  orbitData.forEach(element => {
    orbitCount++
    const ParentAlreadyChecked = checkedOrbits && checkedOrbits.some(el => el === element.Parent)
    const childAlreadyChecked = checkedOrbits && checkedOrbits.some(el => el === element.Child)
    if (!ParentAlreadyChecked) {
      countOrbitsForElement(orbitData, element.Parent)
      checkedOrbits.push(element.Parent)
    }
    if (!childAlreadyChecked) {
      countOrbitsForElement(orbitData, element.Child)
      checkedOrbits.push(element.Child)
    }
  })
  return orbitCount
}

const orbitCount = findOrbits(dataInput)
console.log(orbitCount)
