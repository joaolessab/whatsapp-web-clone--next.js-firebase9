import styled from 'styled-components'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
    const loginWithGoogle = () => { 
        signInWithPopup(auth, provider) // Google Provider being called here
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