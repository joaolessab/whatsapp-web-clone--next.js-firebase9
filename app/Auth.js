import { useEffect, useContext, createContext, useState } from "react"
import { auth } from "./firebase"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => { 
            if (!user) {
                console.log('no user')
                return;
            }
            
            const token = await user.getIdToken()
            console.log('user token', token);
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)