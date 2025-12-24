'use client'

import { PersonWithAge, SortField, SortOrder } from '@/types/person'
import { Locale, translations, getMonthNamesShort } from '@/lib/translations'

interface PersonTableProps {
  persons: PersonWithAge[]
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
  onEdit: (person: PersonWithAge) => void
  onDelete: (id: string) => void
  locale?: Locale
}

export default function PersonTable({
  persons,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  locale = 'es',
}: PersonTableProps) {
  const t = translations[locale]
  const monthNamesShort = getMonthNamesShort(locale)

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <span className="sort-icon">↕</span>
    return <span className="sort-icon active">{sortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  const formatBirthdate = (year: number, month: number, day: number): string => {
    const monthStr = monthNamesShort[month - 1]
    return `${year}-${monthStr}-${day.toString().padStart(2, '0')}`
  }

  const formatNextBirthday = (person: PersonWithAge) => {
    const days = person.daysUntilBirthday
    if (days === 0) return t.today
    if (days === 1) return t.tomorrow
    return `${days} ${t.days}`
  }

  const formatAgeDisplay = (person: PersonWithAge): string => {
    const age = person.birthdate
    const now = new Date()
    let years = now.getFullYear() - age.getFullYear()
    let months = now.getMonth() - age.getMonth()
    let days = now.getDate() - age.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const totalMonths = years * 12 + months

    if (years < 2) {
      const halfMonths = days >= 15 ? ' ½' : ''
      return `${totalMonths}${halfMonths} ${t.months}`
    }
    return `${years} ${t.years}`
  }

  const formatAgeDetail = (person: PersonWithAge): string => {
    const age = person.birthdate
    const now = new Date()
    let years = now.getFullYear() - age.getFullYear()
    let months = now.getMonth() - age.getMonth()
    let days = now.getDate() - age.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const totalMonths = years * 12 + months

    if (years < 2) {
      const halfMonths = days >= 15 ? ' ½' : ''
      return `${totalMonths}${halfMonths} ${t.months}`
    }

    const parts: string[] = []
    if (years > 0) parts.push(`${years} ${years !== 1 ? t.years_plural : t.year_singular}`)
    if (months > 0) parts.push(`${months} ${months !== 1 ? t.months_plural : t.month_singular}`)
    if (days > 0) parts.push(`${days} ${days !== 1 ? t.days_plural : t.day_singular}`)

    return parts.join(', ')
  }

  return (
    <div className="table-wrapper">
      <table className="person-table">
        <thead>
          <tr>
            <th onClick={() => onSort('name')} className="sortable">
              {t.nameCol} {renderSortIcon('name')}
            </th>
            <th onClick={() => onSort('birthdate')} className="sortable">
              {t.birthdate} {renderSortIcon('birthdate')}
            </th>
            <th onClick={() => onSort('age')} className="sortable">
              {t.age} {renderSortIcon('age')}
            </th>
            <th onClick={() => onSort('nextBirthday')} className="sortable">
              {t.nextBirthday} {renderSortIcon('nextBirthday')}
            </th>
            <th>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {persons.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data">
                {t.noPersons}
              </td>
            </tr>
          ) : (
            persons.map((person) => (
              <tr key={person.id} className={!person.is_active ? 'inactive' : ''}>
                <td>
                  <div className="person-name">{person.name}</div>
                </td>
                <td>
                  <div className="birthdate">
                    {formatBirthdate(person.year, person.month, person.day)}
                  </div>
                </td>
                <td>
                  <div className="age-display">{formatAgeDisplay(person)}</div>
                  <div className="age-detail">{formatAgeDetail(person)}</div>
                </td>
                <td>
                  <div className="next-birthday">
                    <span className="age-at-next">{person.ageAtNextBirthday} {t.years}</span>
                    <span className="days-until">{formatNextBirthday(person)}</span>
                  </div>
                </td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => onEdit(person)}
                      className="btn-icon"
                      title={t.edit}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`${t.deleteConfirm} ${person.name}?`)) {
                          onDelete(person.id)
                        }
                      }}
                      className="btn-icon btn-danger"
                      title={t.delete}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
