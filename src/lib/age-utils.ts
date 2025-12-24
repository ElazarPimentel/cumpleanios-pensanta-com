import { Person, PersonWithAge } from '@/types/person'

const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): {
  years: number
  months: number
  days: number
  totalMonths: number
} {
  let years = referenceDate.getFullYear() - birthDate.getFullYear()
  let months = referenceDate.getMonth() - birthDate.getMonth()
  let days = referenceDate.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalMonths = years * 12 + months

  return { years, months, days, totalMonths }
}

export function formatAgeDisplay(birthDate: Date): string {
  const age = calculateAge(birthDate)

  // Under 2 years: show months
  if (age.years < 2) {
    const halfMonths = age.days >= 15 ? ' ½' : ''
    return `${age.totalMonths}${halfMonths} meses`
  }

  // 2 years and older: show years
  return `${age.years} años`
}

export function formatAgeDetailDisplay(birthDate: Date): string {
  const age = calculateAge(birthDate)

  // Under 2 years: show months and days
  if (age.years < 2) {
    const halfMonths = age.days >= 15 ? ' ½' : ''
    return `${age.totalMonths}${halfMonths} meses`
  }

  // Build detailed string
  const parts: string[] = []
  if (age.years > 0) parts.push(`${age.years} año${age.years !== 1 ? 's' : ''}`)
  if (age.months > 0) parts.push(`${age.months} mes${age.months !== 1 ? 'es' : ''}`)
  if (age.days > 0) parts.push(`${age.days} día${age.days !== 1 ? 's' : ''}`)

  return parts.join(', ')
}

export function getNextBirthday(birthDate: Date): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  thisYearBirthday.setHours(0, 0, 0, 0)

  if (thisYearBirthday >= today) {
    return thisYearBirthday
  }

  return new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
}

export function getDaysUntilBirthday(birthDate: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const nextBday = getNextBirthday(birthDate)
  const diffTime = nextBday.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getAgeAtNextBirthday(birthDate: Date): number {
  const nextBday = getNextBirthday(birthDate)
  return nextBday.getFullYear() - birthDate.getFullYear()
}

export function formatBirthdate(year: number, month: number, day: number): string {
  const monthStr = MONTHS_ES[month - 1]
  return `${year}-${monthStr}-${day.toString().padStart(2, '0')}`
}

export function enrichPersonWithAge(person: Person): PersonWithAge {
  const birthdate = new Date(person.year, person.month - 1, person.day)
  const nextBirthday = getNextBirthday(birthdate)

  return {
    ...person,
    birthdate,
    ageDisplay: formatAgeDisplay(birthdate),
    ageDetailDisplay: formatAgeDetailDisplay(birthdate),
    nextBirthday,
    ageAtNextBirthday: getAgeAtNextBirthday(birthdate),
    daysUntilBirthday: getDaysUntilBirthday(birthdate),
  }
}

export function sortPersons(
  persons: PersonWithAge[],
  field: 'name' | 'birthdate' | 'nextBirthday' | 'age',
  order: 'asc' | 'desc'
): PersonWithAge[] {
  const sorted = [...persons].sort((a, b) => {
    let comparison = 0

    switch (field) {
      case 'name':
        comparison = a.name.localeCompare(b.name, 'es')
        break
      case 'birthdate':
        comparison = a.birthdate.getTime() - b.birthdate.getTime()
        break
      case 'nextBirthday':
        comparison = a.daysUntilBirthday - b.daysUntilBirthday
        break
      case 'age':
        comparison = a.birthdate.getTime() - b.birthdate.getTime()
        break
    }

    return order === 'asc' ? comparison : -comparison
  })

  return sorted
}
