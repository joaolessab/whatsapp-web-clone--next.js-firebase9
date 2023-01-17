import { Avatar, IconButton } from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import Messages from '../components/Messages'
import { useEffect, useRef, useState } from 'react'
import getFriendData from '../utils/getFriendData'
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Auth'
import moment from 'moment'

const ChatContent = ({ chat, chat_id, messageProps }) => {
    const [input, setInput] = useState('')
    const [friend, setFriend] = useState({})
    const [messages, setMessages] = useState([])
    const chatParse = JSON.parse(chat)
    const { currentUser } = useAuth()
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => { 
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => { 
        scrollToBottom()
    }, [messages])

    useEffect(() => { 
        setMessages(JSON.parse(messageProps))
    }, [])

    useEffect(() => {
        // Creating a reference to the messages from this chat_id
        const messagesRef = collection(db, "chats", chat_id, "messages")
        // Ordering all the messages of this chat by timestamp
        const q = query(messagesRef, orderBy("timestamp", "asc"))
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => { 
            setMessages(querySnapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id,
                    timestamp: doc.data().timestamp?.toDate().getTime()
                }
            )))
        })

        return unsubscribe
    }, [chat_id])

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

    const sendMessage = async (e) => { 
        e.preventDefault()
        
        // Store in DB, the User active time (lastSeen field)
        const usersRef = doc(db, "users", currentUser.uid)
        setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true })
        
        // Send message and store it into the DB
        // It will go to the "chats" Collection and and a field "messages" -> turned this into the reference
        const messageRef = collection(db, "chats", chat_id, "messages")
        // Adding the information into the message reference created above
        await addDoc(messageRef, {
            timestamp: serverTimestamp(),
            message: input,
            user: currentUser.email,
            photoURL: currentUser.photoURL
        })

        // Add the latest message and corresponding time
        const chatRef = doc(db, "chats", chat_id)
        setDoc(chatRef, {
            latestMessage: input,
            timestamp: serverTimestamp(),
        }, { merge: true })

        // Cleaning input after storing all the information into the Firestore
        setInput('')
    }

    return (
        <Container>
            <Header>
                <Avatar src={friend.photoURL} />
                <HeaderInfo>
                    <h3>{friend.displayName}</h3>
                    <div>Last Active: { moment(friend.lastSeen?.toDate()).fromNow()}</div>
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
                <div style={{ marginBottom: 100 }} ref={ messagesEndRef } />
            </MessagesContainer>

            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <Input
                    onChange={e => setInput(e.target.value)}
                    placeholder='Type a message'
                    value={input}
                />
                <button
                    hidden
                    disabled={!input}
                    type="submit"
                    onClick={sendMessage}
                >
                    Send Message
                </button>
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