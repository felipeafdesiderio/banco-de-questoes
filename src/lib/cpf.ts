export function stripCpf(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCpf(value: string): string {
  const digits = stripCpf(value).slice(0, 11)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function isValidCpf(value: string): boolean {
  const digits = stripCpf(value)

  if (digits.length !== 11) {
    return false
  }

  if (/^(\d)\1{10}$/.test(digits)) {
    return false
  }

  const numbers = digits.split('').map(Number)

  let sum = 0
  for (let index = 0; index < 9; index += 1) {
    sum += numbers[index] * (10 - index)
  }

  let firstCheck = (sum * 10) % 11
  if (firstCheck === 10) {
    firstCheck = 0
  }

  if (firstCheck !== numbers[9]) {
    return false
  }

  sum = 0
  for (let index = 0; index < 10; index += 1) {
    sum += numbers[index] * (11 - index)
  }

  let secondCheck = (sum * 10) % 11
  if (secondCheck === 10) {
    secondCheck = 0
  }

  return secondCheck === numbers[10]
}
