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
  const [showInactive, setShowInactive] = useState(false)
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

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('persons')
      .update({ is_active: isActive })
      .eq('id', id)

    if (error) {
      setError('Error al actualizar estado')
      console.error(error)
    } else {
      fetchPersons()
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPerson(null)
  }

  const filteredPersons = showInactive
    ? persons
    : persons.filter((p) => p.is_active)

  const sortedPersons = sortPersons(filteredPersons, sortField, sortOrder)

  return (
    <div className="birthday-manager">
      <div className="manager-header">
        <h1>Cumpleaños</h1>
        <div className="header-actions">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
            Mostrar inactivos
          </label>
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
          onToggleActive={handleToggleActive}
        />
      )}

      <div className="stats">
        {filteredPersons.length} persona{filteredPersons.length !== 1 ? 's' : ''}
        {!showInactive && persons.length !== filteredPersons.length && (
          <span className="inactive-count">
            {' '}({persons.length - filteredPersons.length} inactivo{persons.length - filteredPersons.length !== 1 ? 's' : ''})
          </span>
        )}
      </div>
    </div>
  )
}
