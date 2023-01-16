import { Avatar } from '@mui/material'
import styled from 'styled-components'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getFriendData from '../utils/getFriendData'

const Chat = ({ id, users, timestamp='', latestMessage='Default message' }) => {
    const router = useRouter()
    const enterChat = () => { 
        router.push('/chat/1') // random for now only
    }
    const [friend, setFriend] = useState({})

    useEffect(() => { 
        if (users.length > 0) { 
            getFriendData(users).then(data => {
                setFriend(data)
            })
        }
    }, [])

    return (
        <Container onClick={enterChat}>
            <FrdAvatar src={friend.photoURL} />
            <ChatContainer>
                <div style={{gridArea: 'name'}}>{ friend.displayName }</div>
                <div style={{gridArea: 'latest_message'}}>{ latestMessage }</div>
                {/*<div style={{ gridArea: 'time', fontSize: '14px' }}>
                    {moment(timestamp.seconds * 1000).format('LT')}
                </div>*/}
            </ChatContainer>
        </Container>
    )
}

export default Chat

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