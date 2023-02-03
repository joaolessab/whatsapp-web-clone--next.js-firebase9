<div align="center">
  <h1 align='center'>WhatsApp Web Clone
    <br/>{ Next.js 12 + Firebase 9 + Styled Components}
  </h1>
  
  > 💬 A WhatsApp Web Clone made using Next.js 12 and Firebase 9
  
  <br/>
  <a href="#-repository-menu">Repository Menu</a><br/>
  
  <br/><br/>
  Made with ❤️ by João Vitor Lessa 👏🏻 
  <a href="https://www.linkedin.com/in/jvitorlb/">Get in Touch!</a>
  <p>Hit the ⭐️ button if you like this project!</p>
</div>

<br/>

# 🔖 Repository Menu

<ul>
    <li><a href="#%EF%B8%8F-live-demo">Live Demo</a></li>
    <li><a href="#%EF%B8%8F-running-the-project">Running the Project</a></li>
    <li><a href="#-extra-tips">Extra Tips</a></li>
    <ol>
        <li><a href="#1---adding-firebase-db-to-the-project---and-its-config-files">Adding Firebase DB to the Project - and its Config files</a></li>
        <li><a href="#2---create-and-add-the-auth-provider-to-your-app">Create and Add the Auth Provider to your app</a></li>
        <li><a href="#3---signin-and-signout-with-google-account">SignIn and SignOut with Google Account</a></li>
        <li><a href="#4---store-user-data-to-cloud-firestore">Store User Data to Cloud Firestore</a></li>
    </ol>
</ul>

# 👁️ Live Demo

- [Click here to watch the **Live Demo!**](https://whatsapp-clone-next-js-firebase9.vercel.app/)
- If you're facing any type of issue when watching this **Live Demo**, please email me at: **joaovitorlessa@gmail.com**;

## • What to expect
### Follow the steps as the video below:

1. Login with your Google Account;
2. Search for a contact in the Search Input bar;
3. Start a conversation with some random contact;
4. This new conversation will be now available in the first screen (when there's no information filled in the Search Bar input);

![Image](../main/docs/images/demo.gif?raw=true)

# ⚙️ Running the Project

## • Dev mode

1. Enter the `app` folder:

```bash
cd app
```

2. In the `root` folder, run this command to generate the `.env` file:

```bash
cp .env.example .env
```

3. Exchange all the sensitive variables of your project that are inside the new generated `.env` file, set your Firebase credentials (such as: `API Key`, etc);

- Too see **details on how to add and configure your Firestore Database**, check all the <a href="#-extra-tips">Extra Tips</a> topics;

4. Install dependencies:

```bash
$ npm i
```

5. Run the app:

```bash
$ npm run dev
```

6. Access the URL: http://localhost:3000

7. Log in with your **Google Account**

8. Check the main page of the app, after logged:

![Image](../main/docs/images/demo-1.png?raw=true)

9. Log Out and Log In again with some different accounts, so all these different users can be saved into your own Firestore Database;

10. After Loging In with different Users, **search for them on the Search Bar (they will not show up by default)**, because you have to start a conversation with them before;

![Image](../main/docs/images/demo-2.png?raw=true)

11. After the conversations started:

![Image](../main/docs/images/demo-3.png?raw=true)

# 🔨 Extra Tips

## 1 - Adding Firebase DB to the Project - and its Config files

1. Go to the [Firebase website](https://console.firebase.google.com/u/0/);

2. Create a new project:

![Image](../main/docs/images/firebase-1.png?raw=true)

3. Insert the name of your new project and click on **"Continue"**;

4. Disable Google Analytics for this project and click on **"Create Project"**:

![Image](../main/docs/images/firebase-2.png?raw=true)

5. Wait until Google sets up your project (it can take 1 minute or 2);

6. It will redirect you to the main page of your app after creating it;

7. Click on the **"Web"** icon button to start adding Firebase to your Web App:

![Image](../main/docs/images/firebase-3.png?raw=true)

8. Insert the name of your app and Click on **"Register App"**:

![Image](../main/docs/images/firebase-4.png?raw=true)

9. After the registring process is done, the information in the image below will pop-up for you:

- Copy the code snippet inside the green squared borders and save in a .txt file, we will create enviroment variables to store those info and call inside the app;

- Do not share those informations with no one else (this is why the image has the black tag on the values)

- This sensitive piece of data basically contains all the credentials to access your entire database, where you can read, write and delete future whats app messages for our app;

![Image](../main/docs/images/firebase-5.png?raw=true)

10. Go back to your text editor console and install the Firebase package inside the `app` folder:

```bash
$ npm i firebase
```

11. Inside the root folder, create the ENV file `./.env` where you're going to store your sensitive credentials:

> Make sure the .env file is declared inside the .gitignore file of your project before commiting it, so that way, it will never be exposed to any repositories;

> Change the "XXXXX-XXXXX-XXXXX-XXXXX" values to your Firebase sensitive credentials generated in the step 9

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=XXXXX-XXXXX-XXXXX-XXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=XXXXX-XXXXX-XXXXX-XXXXX
NEXT_PUBLIC_FIREBASE_PROJECT_ID=XXXXX-XXXXX-XXXXX-XXXXX
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=XXXXX-XXXXX-XXXXX-XXXXX
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXXXX-XXXXX-XXXXX-XXXXX
NEXT_PUBLIC_FIREBASE_APP_ID=XXXXX-XXXXX-XXXXX-XXXXX
```

12. Create the file `./firebase.js` (root folder of the app):

```bash
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
```

13. Add the extra features for your `./firebase.js` file, to manipulate your DB:

```bash
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { db, auth, provider }
```

## 2 - Create and Add the Auth Provider to your app

1. Create the file `./Auth.js`:

```bash
import { useEffect, useContext, createContext, useState } from "react"
import { auth } from "./firebase"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('no user')
                return;
            }

            const token = await user.getIdToken()
            console.log('user token', token);
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
```

2. Edit the file `./pages/_app.js`:

```bash
import { AuthProvider } from '../Auth'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
```

3. To test now, refresh the your browser and check the console of the Development Tools (F12);

- You'll see the message below saying **"no user"** and everything is working as it should be:

![Image](../main/docs/images/firebase-6.png?raw=true)

## 3 - SignIn and SignOut with Google Account

1. Edit the file `./Auth.js`:

```bash
import {
    useEffect,
    useContext,
    createContext,
    useState
} from "react"
import { auth } from "./firebase"
import Loading from "./components/Loading"
import Login from "./pages/login"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('No user is logged')
                setCurrentUser(null)
                setLoading(false)
                return;
            }

            const token = await user.getIdToken()
            console.log('User Token', token)
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading type='bubbles' color='rgb(0, 150, 136)'/>
    }
    if (!currentUser) {
        return <Login />
    }
    else {
        return (
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => useContext(AuthContext)
```

2. Edit the file `./components/CustomMoreVertical.jsx`:

```bash
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleClose}>New Group</MenuItem>
        <MenuItem onClick={handleClose}>Create a room</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Archived</MenuItem>
        <MenuItem onClick={handleClose}>Starred</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={() => signOut(auth)}>Logout</MenuItem>
      </Menu>
    </>
  )
}
```

3. Edit the file `./pages/_app.js` to make it render the app normally again:

```bash
import { AuthProvider } from '../Auth'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
```

4. Go to the Firebase Console of your project created;

5. Click on **"Authentication"** and then, click on **"Get Started"**:

![Image](../main/docs/images/firebase-7.png?raw=true)

6. Click on the **Google** icon;

7. Click on **"Enable"** toogle button and select an email on the **"Project support email"** field, then Click on **"Save"**:

![Image](../main/docs/images/firebase-8.png?raw=true)

8. Go to the **Authentication** >> **Settings** >> **Authorized Domains** >> and **add the domain that you might want to deploy your server** (Vercel, for example) - (localhost is defined by default)\*\*:

![Image](../main/docs/images/firebase-17.png?raw=true)

9. Go back to your app main page, click on **"Login with Google"**, then, this screen will show up to you:

![Image](../main/docs/images/firebase-8.png?raw=true)

10. Your app is ready to use Google auth!

- You can try to click on the **3 dots icon** on the top of the Sidebar >> **"SignOut"** and then your app will return to the Login page;

![Image](../main/docs/images/firebase-9.png?raw=true)

## 4 - Store User Data to Cloud Firestore

1. Go to the Firebase Console of your project created;

2. Click on **"Firestore Database"** and then, click on **"Create Database"**:

![Image](../main/docs/images/firebase-10.png?raw=true)

3. Click on the **Start in test mode** >> **Next**;

![Image](../main/docs/images/firebase-11.png?raw=true)

4. Click on **Enable** on the screen below and wait until your Database is created:

![Image](../main/docs/images/firebase-12.png?raw=true)

5. You are going to see this screen when it finishes loading it all:

![Image](../main/docs/images/firebase-13.png?raw=true)

6. Go to the tab **Rules** of your Cloud Firestore and insert this piece of code (like the image below), then click on **"Publish"**;

```bash
match /b/{bucket}/o {
  match /{allPaths=**} {
    allow read;
  }
}
```

![Image](../main/docs/images/firebase-16.png?raw=true)

7. Go back to your app and edit the file `./Auth.js`:

```bash
import {
    useEffect,
    useContext,
    createContext,
    useState
} from "react"
import {
    auth,
    db
} from "./firebase"
import Loading from "./components/Loading"
import Login from "./pages/login"
import {
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('No user is logged')
                setCurrentUser(null)
                setLoading(false)
                return;
            }

            //const token = await user.getIdToken()
            const userData = {
                displayName: user.displayName,
                email: user.email,
                lastSeen: serverTimestamp(),
                photoURL: user.photoURL
            }

            // This function is using native functions and modules from Firebase SDK
            // to save the new User into a new Collection
            // (if there's no User Collection created yet on the Database project)
            await setDoc(doc(db, 'users', user.uid), userData)

            // SetUser into our App State and throws it to the AuthContext Provider
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading type='bubbles' color='rgb(0, 150, 136)'/>
    }
    if (!currentUser) {
        return <Login />
    }
    else {
        return (
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => useContext(AuthContext)
```

8. Now, refresh the main app page and try to **Login in Google** again:

- The Google pop-up should open and you will need to insert your credentials again;

9. After you have Signed In, check and refresh your **Firebase Database**;

- A brand new Collection was created titled as **"users"** and the infromation about your account has been saved on your new Database with sucess:

![Image](../main/docs/images/firebase-14.png?raw=true)

10. SignOut again and Re-SignIn with 2 or 3 different Google accounts, so we can have some random users on our project Database to test them:

![Image](../main/docs/images/firebase-15.png?raw=true)
