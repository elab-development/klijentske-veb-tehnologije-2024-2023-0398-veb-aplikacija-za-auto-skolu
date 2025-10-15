const ns = 'as_';

export function save<T>(key: string, value: T) {
  localStorage.setItem(ns + key, JSON.stringify(value));
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(ns + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function remove(key: string) {
  localStorage.removeItem(ns + key);
}
