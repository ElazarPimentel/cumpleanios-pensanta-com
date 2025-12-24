'use client'

import { useState, useEffect } from 'react'
import { Person } from '@/types/person'
import { Locale, translations, getMonthNames } from '@/lib/translations'

interface PersonFormProps {
  person?: Person | null
  onSave: (data: { name: string; day: number; month: number; year: number }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  locale?: Locale
}

export default function PersonForm({ person, onSave, onCancel, isLoading, locale = 'es' }: PersonFormProps) {
  const t = translations[locale]
  const monthNames = getMonthNames(locale)
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (person) {
      setName(person.name)
      setDay(person.day)
      setMonth(person.month)
      setYear(person.year)
    } else {
      setName('')
      setDay(1)
      setMonth(1)
      setYear(new Date().getFullYear())
    }
  }, [person])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave({ name, day, month, year })
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 125 }, (_, i) => currentYear - i)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = monthNames.map((label, i) => ({ value: i + 1, label }))

  return (
    <form onSubmit={handleSubmit} className="person-form">
      <h2>{person ? t.editPersonTitle : t.newPersonTitle}</h2>

      <div className="form-group">
        <label htmlFor="name">{t.name}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={t.namePlaceholder}
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="day">{t.day}</label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            disabled={isLoading}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="month">{t.month}</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            disabled={isLoading}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">{t.year}</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            disabled={isLoading}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isLoading} className="btn-secondary">
          {t.cancel}
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? t.saving : t.save}
        </button>
      </div>
    </form>
  )
}
