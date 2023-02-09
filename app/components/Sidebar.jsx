import styled from 'styled-components'
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import CustomMoreVertical from './CustomMoreVertical'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Chat from './Chat'
//import chats from '../data/chats.json'
import Friend from './Friend'
import { useEffect, useRef, useState } from 'react'
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Auth'

const Sidebar = () => {
    const [friends, setFriends] = useState([])
    const [chats, setChats] = useState([])
    const [searchFriends, setSearchFriends] = useState(false)
    const [input, setInput] = useState('')
    const inputAreaRef = useRef(null)
    const { currentUser } = useAuth()
    
    useEffect(() => { 
        const chatsRef = collection(db, "chats")
        const q = query(chatsRef, where("users", "array-contains", currentUser.uid))

        const unsubscribe = onSnapshot(q, (querySnapshot) => { 
            setChats(querySnapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            )))
        })

        return unsubscribe
    }, [])
    
    useEffect(() => { 
        async function fetchFriends() { 
            const usersRef = collection(db, 'users') // collection name = 'users'
            const q = query(usersRef, where("email", "!=", currentUser?.email))
            const querySnapshot = await getDocs(q)
            console.log('querySnapshot', querySnapshot)

            setFriends(querySnapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            )))
        }
        fetchFriends() // Calling async function to fetch the friends
    }, [])

    const cleanSearch = () => {
        setInput('')
        setSearchFriends(false)
    }

    return (
        <Container>
            <Header>
                <UserAvatar src={currentUser.photoURL} />
                <IconsGroup>
                    <IconButton>
                        <img src="/story.svg" alt="" />
                    </IconButton>
                    <IconButton
                        onClick={() => setSearchFriends(true)}
                    >
                        <ChatIcon />
                    </IconButton>
                    <CustomMoreVertical />
                </IconsGroup>
            </Header>
            <Notification>
                <NotificationAvatar>
                    <NotificationsOffIcon style={{ color: '#9DE1FE' }} />
                </NotificationAvatar>
                <NotificationText>
                    <div>Get Notification of New Messages</div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <a href="#"><u>Turn on Desktop notifications</u></a>
                        <IconButton>
                            <ArrowForwardIosIcon style={{width: 15, height: 15}} />
                        </IconButton>
                    </div>
                </NotificationText>
            </Notification>
            <SearchChat>
                <SearchBar>
                    <SearchIcon />
                    <SearchInput
                        ref={inputAreaRef}
                        placeholder="Search or Start a new Chat"
                        onChange={e => setInput(e.target.value)}
                    />
                </SearchBar>
            </SearchChat>

            {/* 
                Initial View: Chats created!
                Focusing on the Search bar: All contacts (friends) available to search
            */}
            {searchFriends ?
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', height:'40px', alignItems: 'center', margin: '10px 0px 0px 20px'}}>
                            <IconButton
                                onClick={() => setSearchFriends(false)}
                                width={{ width: '25px', height: '25px'}}
                            >
                                <ArrowBackIcon style={{ width: 25, height: 25 }} />
                            </IconButton>
                            <p style={{ marginLeft: '25px' }}>New Chat</p>
                        </div>
                        <div style={{ borderBottom: '1px solid #ededed'}}>
                            <p style={{ color: '#009688', textTransform: 'uppercase', marginLeft: '20px' }}>Contacts Available</p>
                        </div>
                    </div>
                    
                    <FriendsContainer>
                        {friends.map(friend => (
                            <Friend
                                key={friend.id}
                                photoURL={friend.photoURL}
                                displayName={friend.displayName}
                                friendId={friend.id}
                                cleanSearch={cleanSearch}
                            />
                        ))}
                    </FriendsContainer>
                </> :
                <>
                    <ChatsContainer>
                        {chats.map(chat => (
                        <Chat
                            key={chat.id}
                            id={chat.id}
                            latestMessage={chat.latestMessage}
                            users={chat.users}
                            timestamp={ chat.timestamp}
                        />))}
                    </ChatsContainer>
                </>
            }
        </Container>
    )
}

export default Sidebar

const ChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: calc(100% - 14.5rem);
`

const FriendsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: calc(100% - 20.5rem);
`


const Container = styled.div`
    background-color: #FFFFFF;
    min-width: 320px;
    max-width: 450px;
`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    width: 100%;
`

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`

const IconsGroup = styled.div``

const SearchChat = styled.div`
    background-color: #f6f6f6;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px;
`

const SearchBar = styled.div`
    display: flex;
    padding: 5px;
    border-radius: 10px;
    border-bottom: 1px solid #ededed;
    background: white;
`

const SearchInput = styled.input`
    width: 100%;
    border: none;
`

const Notification = styled.div`
    display: flex;
    justify-content: space-around;
    aling-items: center;
    padding: 10px;
    background-color: #9DE1FE;
`

const NotificationAvatar = styled(Avatar)`
    background-color: white;
`

const NotificationText = styled.div`
    display: flex;
    flex-direction: column;
`