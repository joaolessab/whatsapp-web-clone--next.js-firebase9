import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const getFriendData = async (users) => {
    const { currentUser } = getAuth()
    // Getting the ID's of the conversation that's is different from the current user
    // We only have one, so the array will only return 1 item ([0] position)
    // This would not work if the register (chat) would have more than 2 users into it
    const friendId = users?.filter(user => user !== currentUser?.uid)
    console.log('Friend ID: ', friendId)

    // Getting data from the FriendID
    const docRef = doc(db, "users", friendId[0])
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export default getFriendData