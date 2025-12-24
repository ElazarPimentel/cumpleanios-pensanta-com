export type Locale = 'es' | 'en' | 'pt'

export const translations = {
  es: {
    // Header
    logout: 'Salir',

    // Birthday Manager
    birthdays: 'Cumpleaños',
    newPerson: '+ Nueva Persona',
    loading: 'Cargando...',
    persons: 'persona',
    personsPlural: 'personas',

    // Person Form
    newPersonTitle: 'Nueva Persona',
    editPersonTitle: 'Editar Persona',
    name: 'Nombre',
    namePlaceholder: 'Nombre completo',
    day: 'Día',
    month: 'Mes',
    year: 'Año',
    cancel: 'Cancelar',
    save: 'Guardar',
    saving: 'Guardando...',

    // Person Table
    nameCol: 'Nombre',
    birthdate: 'Nacimiento',
    age: 'Edad',
    nextBirthday: 'Próximo cumple',
    actions: 'Acciones',
    noPersons: 'No hay personas registradas',
    edit: 'Editar',
    delete: 'Eliminar',
    deleteConfirm: '¿Eliminar a',
    today: '¡Hoy!',
    tomorrow: 'Mañana',
    days: 'días',
    years: 'años',

    // Age display
    months: 'meses',
    year_singular: 'año',
    years_plural: 'años',
    month_singular: 'mes',
    months_plural: 'meses',
    day_singular: 'día',
    days_plural: 'días',

    // Months
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],

    // Errors
    errorLoading: 'Error al cargar personas',
    errorUpdating: 'Error al actualizar',
    errorCreating: 'Error al crear',
    errorDeleting: 'Error al eliminar',

    // Login
    loginTitle: 'PensaNIOS',
    loginSubtitle: 'Gestión de Cumpleaños',
    loginGoogle: 'Continuar con Google',
    loginConnecting: 'Conectando...',
  },

  en: {
    // Header
    logout: 'Logout',

    // Birthday Manager
    birthdays: 'Birthdays',
    newPerson: '+ New Person',
    loading: 'Loading...',
    persons: 'person',
    personsPlural: 'people',

    // Person Form
    newPersonTitle: 'New Person',
    editPersonTitle: 'Edit Person',
    name: 'Name',
    namePlaceholder: 'Full name',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',

    // Person Table
    nameCol: 'Name',
    birthdate: 'Birthdate',
    age: 'Age',
    nextBirthday: 'Next birthday',
    actions: 'Actions',
    noPersons: 'No people registered',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirm: 'Delete',
    today: 'Today!',
    tomorrow: 'Tomorrow',
    days: 'days',
    years: 'years',

    // Age display
    months: 'months',
    year_singular: 'year',
    years_plural: 'years',
    month_singular: 'month',
    months_plural: 'months',
    day_singular: 'day',
    days_plural: 'days',

    // Months
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    // Errors
    errorLoading: 'Error loading people',
    errorUpdating: 'Error updating',
    errorCreating: 'Error creating',
    errorDeleting: 'Error deleting',

    // Login
    loginTitle: 'PensaNIOS',
    loginSubtitle: 'Birthday Manager',
    loginGoogle: 'Continue with Google',
    loginConnecting: 'Connecting...',
  },

  pt: {
    // Header
    logout: 'Sair',

    // Birthday Manager
    birthdays: 'Aniversários',
    newPerson: '+ Nova Pessoa',
    loading: 'Carregando...',
    persons: 'pessoa',
    personsPlural: 'pessoas',

    // Person Form
    newPersonTitle: 'Nova Pessoa',
    editPersonTitle: 'Editar Pessoa',
    name: 'Nome',
    namePlaceholder: 'Nome completo',
    day: 'Dia',
    month: 'Mês',
    year: 'Ano',
    cancel: 'Cancelar',
    save: 'Salvar',
    saving: 'Salvando...',

    // Person Table
    nameCol: 'Nome',
    birthdate: 'Nascimento',
    age: 'Idade',
    nextBirthday: 'Próximo aniversário',
    actions: 'Ações',
    noPersons: 'Nenhuma pessoa registrada',
    edit: 'Editar',
    delete: 'Excluir',
    deleteConfirm: 'Excluir',
    today: 'Hoje!',
    tomorrow: 'Amanhã',
    days: 'dias',
    years: 'anos',

    // Age display
    months: 'meses',
    year_singular: 'ano',
    years_plural: 'anos',
    month_singular: 'mês',
    months_plural: 'meses',
    day_singular: 'dia',
    days_plural: 'dias',

    // Months
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],

    // Errors
    errorLoading: 'Erro ao carregar pessoas',
    errorUpdating: 'Erro ao atualizar',
    errorCreating: 'Erro ao criar',
    errorDeleting: 'Erro ao excluir',

    // Login
    loginTitle: 'PensaNIOS',
    loginSubtitle: 'Gerenciador de Aniversários',
    loginGoogle: 'Continuar com Google',
    loginConnecting: 'Conectando...',
  },
} as const

export type TranslationKeys = keyof typeof translations.es

export function t(locale: Locale, key: TranslationKeys): string {
  return translations[locale][key] as string
}

export function getMonthNames(locale: Locale): string[] {
  return [...translations[locale].monthNames]
}

export function getMonthNamesShort(locale: Locale): string[] {
  return [...translations[locale].monthNamesShort]
}
