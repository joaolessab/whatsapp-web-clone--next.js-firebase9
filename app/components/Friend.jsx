import { Avatar } from '@mui/material'
import styled from 'styled-components'

const Friend = ({ photoURL, displayName }) => {
    return (
        <Container>
            <FrdAvatar src={photoURL} />
            <ChatContainer>
                <div style={{gridArea: 'name'}}>{ displayName }</div>
            </ChatContainer>
        </Container>
    )
}

export default Friend

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: 67px;
    padding-left: 15px;
    word-break: break-word;
    :hover{
        background-color: #F5F5F5;
    }
`

const FrdAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`

const ChatContainer = styled.div`
    display: grid;
    padding: 10px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid #ededed;
    gap: 10px;
    grid-template-areas:
    "name name time"
    "latest_message latest_message."
`