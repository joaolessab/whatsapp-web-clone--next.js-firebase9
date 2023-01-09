import styled from 'styled-components'
import ChatContent from '../../components/ChatContent'

const ChatBox = () => { 
    return (
        <Container>
            <ChatContainer>
                <ChatContent />
            </ChatContainer>
        </Container>
    )
}

export default ChatBox

const Container = styled.div`
    display: flex;
    background-color: #f8fafc;
    width: 100%;
`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    max-height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`