import {
    useEffect,
    useContext,
    createContext,
    useState
} from "react"
import { auth } from "./firebase"
import Loading from "./components/Loading"
import Login from "./pages/login"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => { 
            if (!user) {
                console.log('No user is logged')
                setCurrentUser(null)
                setLoading(false)
                return;
            }
            
            const token = await user.getIdToken()
            console.log('User Token', token)
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    if (loading) { 
        return <Loading type='bubbles' color='rgb(0, 150, 136)'/>
    }
    if (!currentUser) {
        return <Login />
    }
    else {
        return (
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => useContext(AuthContext)