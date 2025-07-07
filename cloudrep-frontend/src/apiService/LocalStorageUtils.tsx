// LocalStorageUtils.ts
const LocalStorageUtils = {
  /**
   * Get an item from localStorage
   * @param key The key to retrieve
   * @returns The parsed value or null if not found or error occurs
   */
  getItem: <T,>(key: string): T | null => {
    try {
      if (typeof window === "undefined") return null;
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  },

  /**
   * Set an item in localStorage
   * @param key The key to set
   * @param value The value to store (will be stringified)
   */
  setItem: <T,>(key: string, value: T): void => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  },

  /**
   * Remove an item from localStorage
   * @param key The key to remove
   */
  removeItem: (key: string): void => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: (): void => {
    try {
      if (typeof window === "undefined") return;
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  },
};

export default LocalStorageUtils;
