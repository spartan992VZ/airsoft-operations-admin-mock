export interface StoragePort {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

export const browserStorage: StoragePort = {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return null;

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
