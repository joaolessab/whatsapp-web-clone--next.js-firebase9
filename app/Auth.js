import {
    useEffect,
    useContext,
    createContext,
    useState
} from "react"
import {
    auth,
    db
} from "./firebase"
import Loading from "./components/Loading"
import Login from "./pages/login"
import {
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore"

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
            
            //const token = await user.getIdToken()
            const userData = {
                displayName: user.displayName,
                email: user.email,
                lastSeen: serverTimestamp(),
                photoURL: user.photoURL
            }
            
            // This function is using native functions and modules from Firebase SDK
            // to save the new User into a new Collection
            // (if there's no User Collection created yet on the Database project)
            await setDoc(doc(db, 'users', user.uid), userData)

            // SetUser into our App State and throws it to the AuthContext Provider
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