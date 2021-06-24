import './App.css';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import { SendOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import firebase from 'firebase/app';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDufSr8JhJZ_y7s8OU8slFMjuI3tYJaHik',
    authDomain: 'fir-testing-72329.firebaseapp.com',
    projectId: 'fir-testing-72329',
    storageBucket: 'fir-testing-72329.appspot.com',
    messagingSenderId: '30676038536',
    appId: '1:30676038536:web:c76c176b2381f38bdb803d',
    measurementId: 'G-S88RTGCH4L',
  });
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
function handleToggleDeletedModal() {}
const userIdConst = 'b144b633-490a-47e5-b746-e2e29ec1a8b83f593c0d-7a9e-4abc-909d-f372b2be2515';
const userNameConst = 'Admin';

function ChatBox(value) {
  const [user] = useAuthState(auth);
  const userId = value.id;
  const userName = value.name;
  console.log('u', value);
  return (
    <div className='App'>
      <header>
        <h3> {userName}</h3>
        {/* <SignOut /> */}
      </header>

      <section>
        {/* {user ? <ChatRoom /> : <SignIn />} */}
        <ChatRoom id={userId} name={userName} />
      </section>
    </div>
  );
}

function ChatRoom(data) {
  const userId = data.id;
  const userName = data.name;
  // firestore.collection('chats')
  //   .get()
  //   .then(querySnapshot => {
  //     const documents = querySnapshot.docs.map(doc => doc.data())
  //     // do something with documents
  //     console.log('documents', documents);
  //   })
  const temp = firestore.collection('chats').doc(`${userId}`);
  temp.get().then((data) => {
    if (data.exists) {
    } else {
      temp.set({
        name: userName,
        id: userId,
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      });
    }
  });
  // firestore
  //   .collection('chats')
  //   .doc(`${userId}`)
  //   // .collection('messages')
  //   .set({
  //     value: 'Example',
  //   });

  // const docRef = firestore.collection('chats').doc('1ecf44b3-d1d6-4b1c-9ab8-d3d8327e5b2c');
  // const res = docRef.get();
  ///////////////
  const dummy = useRef();
  const messagesRef = firestore.collection('chats').doc(`${userId}`).collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    ////////////////////////////////
    const temp = firestore.collection('chats').doc(`${userId}`);
    temp.get().then((data) => {
      temp.set({
        name: userName,
        id: userId,
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      });
    });
    ////////////////////////////////
    await messagesRef.add({
      message: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId: userIdConst,
      userName: userNameConst,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ border: 'solid 1px', borderRadius: '5px' }}>
      <main style={{ height: '400px', width: '400px' }} className={'main'}>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} style={{ marginTop: '20px' }}>
        <input
          style={{ width: '350px', height: '40px', borderRadius: '5px', margin: '5px' }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='Say something nice'
        />

        <button type='submit' disabled={!formValue} style={{ height: '40px', width: '50px', borderRadius: '5px' }}>
          {/* 🕊️ */}
          <SendOutlined />
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const { message, userId, photoURL } = props.message;

  const messageClass = userId === userIdConst ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
        <p>{message}</p>
      </div>
    </>
  );
}

export default ChatBox;
