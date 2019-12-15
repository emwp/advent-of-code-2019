import { readInput } from "../../utils/readInput"

const rawInput = readInput()
const dataInput = rawInput.split(",").map(Number)

const intCode = (initial: number[], input: number) => {
  let result: number
  let i = 0

  while (i < initial.length) {
    let comp: number
    let comm = initial[i].toString()
    comm = "0".repeat(4 - comm.length) + comm
    let opcode =
      comm.length > 2 ? parseInt(comm.substr(comm.length - 2), 10) : parseInt(comm, 10)

    let ops = {
      1: [comm.charAt(1), initial[i + 1]],
      2: [comm.charAt(0), initial[i + 2]],
      3: initial[i + 3]
    }
    switch (opcode) {
      case 99:
        return `Diagnostic code: ${result}`
      case 1:
        initial[ops[3]] =
          (ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]) +
          (ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1])
        i += 4
        break
      case 2:
        initial[ops[3]] =
          (ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]) *
          (ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1])
        i += 4
        break
      case 3:
        if (i == 0) {
          initial[ops[1][1]] = input
        } else {
          console.log('Something went wrong. You\'ll probably die from the heat!')
          return
        }
        i += 2
        break
      case 4:
        result = ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]
        i += 2
        break
      case 5:
        comp = ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]
        if (comp != 0) {
          i = ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1]
        } else {
          i += 3
        }
        break
      case 6:
        comp = ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]
        if (comp == 0) {
          i = ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1]
        } else {
          i += 3
        }
        break
      case 7:
        initial[ops[3]] =
          (ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]) <
          (ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1])
            ? 1
            : 0
        i += 4
        break
      case 8:
        initial[ops[3]] =
          (ops[1][0] == 0 ? initial[ops[1][1]] : ops[1][1]) ==
          (ops[2][0] == 0 ? initial[ops[2][1]] : ops[2][1])
            ? 1
            : 0
        i += 4
        break
      default:
        return "Operation failed"
    }
  }
}

console.log(intCode(dataInput, 5))
