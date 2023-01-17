import styled from 'styled-components'
import moment from 'moment'
import { useAuth } from '../Auth'

const Messages = ({ user, message, timestamp }) => {
    const { currentUser } = useAuth()
    const loginMail = currentUser.email
    const MessageType = user === loginMail ? MyMessage : FrdMessage

    return (
        <Container>
            {user !== loginMail && <MessageTail>
                <img src='/tail-my-message.svg' alt=''></img>
            </MessageTail>}

            <MessageType>
                {message}
                <Timestamp>{moment(timestamp).format('LT')}</Timestamp>
            </MessageType>

            {user === loginMail && <MessageTail>
                <img src='/tail-frd-message.svg' alt=''></img>
            </MessageTail>}
        </Container>
    )
}

export default Messages

const Container = styled.div`
    display: flex;
`

const MessageBubble = styled.div`
    padding: 15px;
    padding-bottom: 26px;
    text-align: right;
    background-color: white;
    margin-bottom: 10px;
    position: relative;
`

const MyMessage = styled(MessageBubble)`
    margin-left: auto;
    background-color: #dcf8c6;
    border-radius: 8px 8px 8px 8px;
`

const FrdMessage = styled(MessageBubble)`
    background-color: white;
    text-align: left;
    border-radius: 8px 8px 8px 8px;
`

const MessageTail = styled.span`
    margin-top: 3px;
    margin-right: -1.5px
`

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`