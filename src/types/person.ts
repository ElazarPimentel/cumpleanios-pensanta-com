export interface Person {
  id: string
  name: string
  day: number
  month: number
  year: number
  is_active: boolean
  created_at: string
}

export interface PersonWithAge extends Person {
  birthdate: Date
  ageDisplay: string
  ageDetailDisplay: string
  nextBirthday: Date
  ageAtNextBirthday: number
  daysUntilBirthday: number
}

export type SortField = 'name' | 'birthdate' | 'nextBirthday' | 'age'
export type SortOrder = 'asc' | 'desc'
