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
const orbitData = formatOrbitData(dataInput)
let path: string[] = []
let orbitCount = 0

const countOrbitsForElement = (data: OrbitInfo[], element: string, count = false) => {
  const indirectOrbit = data.find(item => item.Child === element)
  
  if (indirectOrbit && indirectOrbit.Parent !== "COM") {
    if (count) orbitCount++
    path.push(indirectOrbit.Parent)
    countOrbitsForElement(orbitData, indirectOrbit.Parent, count)
  }
  return path
}

const findOrbits = () => {
  let checkedOrbits: string[] = []
  orbitData.forEach(element => {
    orbitCount++
    const ParentAlreadyChecked = checkedOrbits && checkedOrbits.some(el => el === element.Parent)
    const childAlreadyChecked = checkedOrbits && checkedOrbits.some(el => el === element.Child)
    if (!ParentAlreadyChecked) {
      countOrbitsForElement(orbitData, element.Parent, true)
      checkedOrbits.push(element.Parent)
    }
    if (!childAlreadyChecked) {
      countOrbitsForElement(orbitData, element.Child, true)
      checkedOrbits.push(element.Child)
    }
  })
  return orbitCount
}

const orbitsToSanta = () => {
  const santa = "SAN"
  const you = "YOU"
  const youPath = countOrbitsForElement(orbitData, you)
  path = []
  const santaPath = countOrbitsForElement(orbitData, santa)

  const findSamePath = () => {
    for (let i = 0; i < santaPath.length; i++) {
      for (let j = 0; j < santaPath.length; j++) {
        if (santaPath[i] === youPath[j]) {
          const fromYouToAncestor = youPath.findIndex(node => node === santaPath[i])
          const fromSantaToAncestor = santaPath.findIndex(node => node === santaPath[i])
          return fromSantaToAncestor + fromYouToAncestor
        }
      }
    }
  }
  return findSamePath()
}

const totalOrbitsToSanta = orbitsToSanta() 
console.log(`You need ${totalOrbitsToSanta} orbits to reach Santa`)

const total = findOrbits() 
console.log(`The number of direct and indirect orbits is: ${total}`)

