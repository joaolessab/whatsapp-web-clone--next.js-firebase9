import styled from 'styled-components'
import ChatContent from '../../components/ChatContent'
import { db } from '../../firebase'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'

const ChatBox = ({chat, id, messages}) => {
    return (
        <Container>
            <ChatContainer>
                <ChatContent
                    chat={chat}
                    chat_id={id}
                    messageProps={messages}
                />
            </ChatContainer>
        </Container>
    )
}

export default ChatBox

export async function getServerSideProps(context) {
    // Creating a reference to the messages of the Chat_id related
    const messageRef = collection(db, "chats", context.query.id, "messages")
    const q = query(messageRef, orderBy("timestamp", "asc"))
    const querySnapshot = await getDocs(q)
    const messages = querySnapshot.docs.map(doc => (
        {
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime()
        }
    ))

    // This will search the Chats collection by ID, which comes from the click on the Picture to start the chat message route
    const docRef = doc(db, "chats", context.query.id)
    const docSnap = await getDoc(docRef)

    return {
        props: {
            chat: JSON.stringify(docSnap.data()),
            id: context.query.id,
            messages: JSON.stringify(messages)
        }
    }
}

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