import styled from 'styled-components'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import Router from 'next/router'

const Login = () => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider).then(function (result) {
            if (result.user) {
                console.log("Signed in as:", result.user.displayName)
                Router.reload(window.location.pathname)
            }
            else {                
                console.log("User not found!")
            }
        }).catch(function (error) {
            console.error("Error signing in:", error)
        })
    }

    return (
        <Container>
            <LoginContainer>
                <img
                    src='/whatsapp-logo.svg'
                    alt=''
                    width={60}
                    height={60}
                />
                <Button
                    style={{ color: 'gray' }}
                    startIcon={<GoogleIcon />}
                    onClick={loginWithGoogle}
                >
                    Login with Google
                </Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: rgb(0, 150, 136);
    width: 100vw;
`

const LoginContainer = styled.div`
    padding: 30px;
    display: flex;
    gap: 20px;
    background-color: white;
    border-radius: 15px;
`