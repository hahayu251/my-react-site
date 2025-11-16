import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  // 状态初始化：从 localStorage 读取或使用初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`读取"${key}"时出错:`, error)
      return initialValue
    }
  })

  // 自动保存：当状态变化时更新 localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`保存"${key}" 时出错:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage