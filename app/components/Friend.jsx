import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Auth'
import { useRouter } from 'next/router'

const Friend = ({ photoURL, displayName, friendId, cleanSearch }) => {
    const { currentUser } = useAuth()
    const router = useRouter()

    const createChat = async (friendId) => {
        const chatsRef = collection(db, "chats")
        const q = query(chatsRef, where("users", "array-contains", currentUser.uid)) // filtering only messages / chats related to the Current User (uid)
        const querySnapshot = await getDocs(q)
        
        // This verifies the friendId clicked is on some related chats from the currentUser
        const chatFound = querySnapshot.docs.find((chat) => {
            return chat.data().users.find(user => user === friendId)
        })
        if (chatFound) {
            console.log('Chat already exists!')
            router.push(`/chat/${chatFound.id}`)
        }
        else {
            addDoc(chatsRef, { users: [currentUser.uid, friendId] }).then((chatRef) => { 
                console.log('Chat created!')
                router.push(`/chat/${chatRef.id}`)
            })
        }

        // Return back to the Chats view
        cleanSearch()
    }

    return (
        <Container onClick={() => createChat(friendId)}>
            <FrdAvatar src={photoURL} />
            <ChatContainer>
                <div style={{gridArea: 'name', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600'}}>{ displayName }</div>
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
    width: 400px;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid #ededed;
    gap: 10px;
    grid-template-areas:
    "name name time"
    "latest_message latest_message."
`