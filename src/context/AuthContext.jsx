import { createContext, useContext, useState } from "react"
import usersData from "../data/users"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    const found = usersData.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      return { success: true, role: found.role }
    }
    return { success: false, message: "Invalid email or password" }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
