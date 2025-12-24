'use client'

import { PersonWithAge, SortField, SortOrder } from '@/types/person'
import { formatBirthdate } from '@/lib/age-utils'

interface PersonTableProps {
  persons: PersonWithAge[]
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
  onEdit: (person: PersonWithAge) => void
  onDelete: (id: string) => void
}

export default function PersonTable({
  persons,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: PersonTableProps) {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <span className="sort-icon">↕</span>
    return <span className="sort-icon active">{sortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  const formatNextBirthday = (person: PersonWithAge) => {
    const days = person.daysUntilBirthday
    if (days === 0) return '¡Hoy!'
    if (days === 1) return 'Mañana'
    return `${days} días`
  }

  return (
    <div className="table-wrapper">
      <table className="person-table">
        <thead>
          <tr>
            <th onClick={() => onSort('name')} className="sortable">
              Nombre {renderSortIcon('name')}
            </th>
            <th onClick={() => onSort('birthdate')} className="sortable">
              Nacimiento {renderSortIcon('birthdate')}
            </th>
            <th onClick={() => onSort('age')} className="sortable">
              Edad {renderSortIcon('age')}
            </th>
            <th onClick={() => onSort('nextBirthday')} className="sortable">
              Próximo cumple {renderSortIcon('nextBirthday')}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persons.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data">
                No hay personas registradas
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
                  <div className="age-display">{person.ageDisplay}</div>
                  <div className="age-detail">{person.ageDetailDisplay}</div>
                </td>
                <td>
                  <div className="next-birthday">
                    <span className="age-at-next">{person.ageAtNextBirthday} años</span>
                    <span className="days-until">{formatNextBirthday(person)}</span>
                  </div>
                </td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => onEdit(person)}
                      className="btn-icon"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar a ${person.name}?`)) {
                          onDelete(person.id)
                        }
                      }}
                      className="btn-icon btn-danger"
                      title="Eliminar"
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
