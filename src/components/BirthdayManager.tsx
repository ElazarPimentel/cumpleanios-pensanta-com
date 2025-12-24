'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Person, PersonWithAge, SortField, SortOrder } from '@/types/person'
import { enrichPersonWithAge, sortPersons } from '@/lib/age-utils'
import PersonForm from './PersonForm'
import PersonTable from './PersonTable'

export default function BirthdayManager() {
  const [persons, setPersons] = useState<PersonWithAge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [sortField, setSortField] = useState<SortField>('nextBirthday')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchPersons = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('persons')
      .select('*')
      .order('name')

    if (error) {
      setError('Error al cargar personas')
      console.error(error)
    } else {
      const enriched = (data as Person[]).map(enrichPersonWithAge)
      setPersons(enriched)
    }

    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchPersons()
  }, [fetchPersons])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleSave = async (data: { name: string; day: number; month: number; year: number }) => {
    setIsSaving(true)
    setError(null)

    if (editingPerson) {
      const { error } = await supabase
        .from('persons')
        .update(data)
        .eq('id', editingPerson.id)

      if (error) {
        setError('Error al actualizar')
        console.error(error)
      }
    } else {
      const { error } = await supabase
        .from('persons')
        .insert([{ ...data, is_active: true }])

      if (error) {
        setError('Error al crear')
        console.error(error)
      }
    }

    setIsSaving(false)
    setShowForm(false)
    setEditingPerson(null)
    fetchPersons()
  }

  const handleEdit = (person: PersonWithAge) => {
    setEditingPerson(person)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('persons')
      .delete()
      .eq('id', id)

    if (error) {
      setError('Error al eliminar')
      console.error(error)
    } else {
      fetchPersons()
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPerson(null)
  }

  const sortedPersons = sortPersons(persons, sortField, sortOrder)

  return (
    <div className="birthday-manager">
      <div className="manager-header">
        <h1>Cumpleaños</h1>
        <div className="header-actions">
          <button
            onClick={() => {
              setEditingPerson(null)
              setShowForm(true)
            }}
            className="btn-primary"
          >
            + Nueva Persona
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-modal-content">
            <PersonForm
              person={editingPerson}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isSaving}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <PersonTable
          persons={sortedPersons}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <div className="stats">
        {persons.length} persona{persons.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
