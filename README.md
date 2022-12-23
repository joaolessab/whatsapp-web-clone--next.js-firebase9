<div align="center">
  <h1 align='center'>Whats App clone<br/>
  { Next.js + Firebase 9 }</h1>
  
  > 💬 A Whats App clone made using Next.js and Firebase version 9
  
  <br/>
  <a href="#-repository-menu">Repository Menu</a><br/>
  
  <br/><br/>
  Made with ❤️ by João Vitor Lessa 👏🏻 
  <a href="https://www.linkedin.com/in/jvitorlb/">Get in Touch!</a>
  <p>Hit the ⭐️ button if you like this project!</p>
</div>

<br/>

# 🔖 Repository Menu

<p>
  •  <a href="#%EF%B8%8F-running-the-project">Running the Project</a><br/>
  •  <a href="#-creating-this-project-from-scratch-baby-steps">Creating this project from scratch: Baby Steps</a><br/>
  •  <a href="#-references">References</a><br/>
</p>

# ⚙️ Running the Project

## • Dev mode

1. In the **root** folder, run this command to generate the `.env` file:

```
cp .env.example .env
```

2. Set the sensitive variables of your project inside the generated `.env` file;

3. Install dependencies:

```bash
$ npm i
```

4. Run the app:

```bash
$ npm run dev
```

5. Access the URL: http://localhost:3000

# 🔨 Creating this project from scratch: Baby Steps]

## • Step 1 - Create a Firebase project

1. Open your [Firebase console](https://console.firebase.google.com/u/0/?pli=1) and hit the button **Create a project**;

![Image](../main/docs/images/1.png?raw=true)

![Image](../main/docs/images/2.png?raw=true)

![Image](../main/docs/images/3.png?raw=true)

![Image](../main/docs/images/4.png?raw=true)

2. Wait until you see the project main screen after it was created and hit the **Web** button:

![Image](../main/docs/images/5.png?raw=true)

3. Name the new Firebase app and collect the **secret keys, API keys**, etc:
   > Do not share those information with nobody. Save the keys, but do not commit them into the repository!

![Image](../main/docs/images/6.png?raw=true)

![Image](../main/docs/images/7.png?raw=true)

## • Step 2 - Add Firebase Authentication

1. Hit **Authentication** shortcut to add it to the project;

![Image](../main/docs/images/8.png?raw=true)

2. Click on **Sign-in method** and pick the **Email/password**;

![Image](../main/docs/images/9.png?raw=true)

3. Do not active **Email-link** - it's a pain;

4. Hit **Save**

![Image](../main/docs/images/10.png?raw=true)

## • Step 3 - Add Firebase Admin SDK

1. Go to the **Engine** icon >> **Project Settings** >> **Service Accounts**;

2. Click on **Generate new private key** >> Pop-up will open >> hit **Generate Key**;

![Image](../main/docs/images/11.png?raw=true)

3. A json file will start being downloaded. Save it and do not share with nobody as well;

![Image](../main/docs/images/12.png?raw=true)

## • Step 4 - Create a brand new Next.js project

1. Run the command:

```bash
$ npx create-next-app@latest
```

2. Move out the files to the **root** folder (personal preferece);

![Image](../main/docs/images/13.png?raw=true)

## • Step 5 - Installing Next.js dependencies

> We are using Firebase version 8. If you wish to use 9 or higher, you will need to change the way to import the library into your project

1. Run this commando for Firebase core:

```bash
$ npm install firebase@8.10.0 firebase-admin nookies
```

- `firebase`: Manipulates firebase functions;
- `firebase-admin`: Admin SDK is a set of server libraries that lets you interact with Firebase from privileged environments to perform [actions](https://firebase.google.com/docs/admin/setup);
- `nookies`: Set of Cookie Helpers for Next.js;

2. Run this command for the Frontend visual core:
   > We're going to use Chakra UI as the main CSS core

```bash
$ npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

## • Step 6 - Creating the main files

1. `./.env`: This file will store the Firebase app secret keys;

   > You will never commit the variables values secret in your repository. If you do that, you will expose your whole backend information
   > This file will be added in the .gitignore

1. `./auth.js`: It's going to wrap everything in our app in a Context and use that to handle all authentication throught the whole entire app;

1. `./firebaseAdmin.js`: Takes care of decrypting and making sure users are allowed into the application;

1. `./firebaseClient.js`: It's going to set up our authentication;

## • Step 7 - Creating the "./.env" file

```bash
# FIREBASE
NEXT_PUBLIC_FIREBASE_API_KEY=VALUE_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=VALUE_HERE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=VALUE_HERE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=VALUE_HERE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=VALUE_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=1:VALUE_HERE
```

## • Step 8 - Creating "./firebaseClient.js"

1. Let's drop this code on it:

```bash
const firebase = require('firebase')

const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

export default function firebaseClient(){
    if(!firebase.apps.length){
        firebase.initializeApp(FIREBASE_CONFIG)
    }
}
```

# 📚 References

- 🎥 >> [NextJS Firebase Auth Crash Course](https://www.youtube.com/watch?v=qBGAdenirbs)
- 📖 >> [Test1](https://google.com)
