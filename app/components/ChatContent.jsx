import { Avatar, IconButton } from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import messages from '../data/messages.json'
import Messages from '../components/Messages'
import { useEffect, useState } from 'react'
import getFriendData from '../utils/getFriendData'

const ChatContent = ({chat, chat_id}) => { 
    const [friend, setFriend] = useState({})
    const chatParse = JSON.parse(chat)

    useEffect(() => { 
        if (chatParse.users?.length > 0) {
            console.log('Has chat to parse')
            getFriendData(chatParse.users).then(data => {
                setFriend(data)
            })
        }
        else { 
            console.log('Without any chat to parse')
        }
    }, [chat_id])

    return (
        <Container>
            <Header>
                <Avatar src={friend.photoURL} />
                <HeaderInfo>
                    <h3>{friend.displayName}</h3>
                    <div>Last Active: 3 hours ago</div>
                </HeaderInfo>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Header>

            <MessagesContainer>
                {messages.map(message =>
                    <Messages
                        key={message.id}
                        user={message.user}
                        message={message.message}
                        timestamp={message.timestamp}
                    />
                )}
            </MessagesContainer>

            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <Input placeholder='Type a message' />
                <IconButton>
                    <MicIcon />
                </IconButton>
            </InputContainer>
        </Container>
    )
    
}

export default ChatContent

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3{
        margin-bottom: 3px;
    }

    >div{
        font-size: 14px;
        color: gray;
    }
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #f0f0f0;
    z-index: 100;
`

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 30px;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`

const MessagesContainer = styled.div`
    padding: 20px;
    background-color: #e5ded8;
    flex: 1;
    background-image: url('/chat-background.png');
    background-attachment: fixed;
    background-repeat: repeat;
`