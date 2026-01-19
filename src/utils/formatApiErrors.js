export function formatApiErrors(payload) {
  try {
    if (!payload) return ''

    // Se a API aninha em { data: {...} }, desce um nível
    const src = payload.data && typeof payload.data === 'object' ? payload.data : payload

    // Prioriza errors.field = [ ... ]
    if (src.errors && typeof src.errors === 'object') {
      const parts = []
      for (const key of Object.keys(src.errors)) {
        const val = src.errors[key]
        if (Array.isArray(val)) {
          for (const msg of val) {
            if (typeof msg === 'string' && msg.trim()) parts.push(msg.trim())
          }
        } else if (typeof val === 'string' && val.trim()) {
          parts.push(val.trim())
        }
      }
      if (parts.length) return parts.join('<br>')
    }

    // Fallbacks comuns
    if (typeof src.message === 'string' && src.message.trim()) return src.message.trim()
    if (Array.isArray(src)) {
      const msgs = src.filter((m) => typeof m === 'string' && m.trim())
      if (msgs.length) return msgs.join('<br>')
    }
    return JSON.stringify(src)
  } catch {
    return ''
  }
}

export function getApiErrorMessage(error) {
  return error?.response?.data?.message || error?.response?.data?.error || 'Erro inesperado.'
}
