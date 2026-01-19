const USER_KEY = 'auth_user'

/** Salva (opcional, caso já faça isso no login). */
export function setAuthUser(userObj) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userObj ?? null))
  } catch {
    /* empty */
  }
}

/** Remove usuário salvo. */
export function clearAuthUser() {
  localStorage.removeItem(USER_KEY)
}

/** Lê do localStorage e devolve o usuário "montado"/normalizado. */
export function getAuthUser() {
  let saved
  try {
    const raw = localStorage.getItem(USER_KEY)
    saved = raw ? JSON.parse(raw) : null
  } catch {
    saved = null
  }

  // Aceita { usuario: {...} } ou o próprio objeto do usuário
  const u = saved?.usuario ?? saved ?? null

  // Se não houver, retorna um shape vazio com helpers no-safe-op
  if (!u) {
    return makeUserShape(null)
  }
  return makeUserShape(u)
}

/** Normaliza o objeto do usuário para um shape consistente + helpers. */
function makeUserShape(u) {
  if (!u) {
    return {

    }
  }

  return {
  }
}

/** Gera iniciais (máx 2 letras). */
export function getUserInitials(nomeOuLogin) {
  const clean = String(nomeOuLogin || '').trim()
  if (!clean) return 'U'
  const parts = clean.split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase().slice(0, 2)
}
