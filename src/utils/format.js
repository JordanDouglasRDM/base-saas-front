import dayjs from '@/plugins/dayjs'

export function formatBRL(valor) {
  if (valor == null) return ''
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  } catch {
    return valor
  }
}

/**
 * Formata uma data no formato m/d/Y H:i (ex: 11/2/2025 14:05)
 * @param {string|Date|null} date - Data em string ISO, timestamp ou objeto Date
 * @param format
 * @returns {string} - Data formatada no padrão m/d/Y H:i
 */
export function formatDate(date, format = 'DD/MM/YYYY HH:mm') {
  if (!date) return ''

  try {
    return dayjs(date).format(format)
  } catch {
    return ''
  }
}

export function ucFirst(text) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function sanitize(text) {
  if (!text) return ''
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}
