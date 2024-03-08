import Cookies from 'js-cookie'

interface CookieOptions {
  expires?: number | Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

interface StorageAPI {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T, options?: CookieOptions) => void
  remove: (key: string) => void
}

// JS-Cookie 封装
const storage: StorageAPI = {
  get(key) {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue != null) {
        return JSON.parse(storedValue)
      }
    } catch {
      const cookieValue = Cookies.get(key)
      if (cookieValue) {
        return JSON.parse(cookieValue)
      }
    }
    return null
  },

  /**
   * storage.set('myKey', 'Hello, world!');
   * storage.set('user', { id: 1, name: 'John Doe' });
   * storage.set('session', { token: 'abc123' }, { expires: 7 });
   */
  set(key, value, options = {}) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      Cookies.set(key, JSON.stringify(value), options)
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch {
      Cookies.remove(key)
    }
  },
}

export default storage
