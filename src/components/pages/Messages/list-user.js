// import './App.css';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import firebase from 'firebase/app';
import moment from 'moment';
import { func } from 'prop-types';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import notification from '../../../helper/Notification';
import ChatBoxs from './mess';

const { confirm } = Modal;
const messaging = firebase.messaging();

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
const keyPair = 'BNDAj7lNVHR7oC862YJy8sSinMwARB0ih5oKrVQLARN-YS0q5DXAVNGxtazO2IViZPLc_d4bDkyc5pAVuAUpXzc';
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
function handleToggleDeletedModal() {}
const userIdConst = 'b144b633-490a-47e5-b746-e2e29ec1a8b83f593c0d-7a9e-4abc-909d-f372b2be2515';
const userNameConst = 'Admin';

function ChatBox(value) {
  messaging.getToken({ vapidKey: keyPair }).then((currentToken) => {
    console.log('currentToken', currentToken);
  });
  const [user] = useAuthState(auth);
  const userId = value.id;
  return (
    <div style={{ border: '1px solid', width: '330px', backgroundColor: '#001529', borderRadius: '5px' }}>
      <header>
        <h1 style={{ marginLeft: '90px', marginBottom: '20px', marginTop: '10px', color: 'white' }}>Chat list</h1>
      </header>

      <section>
        <ChatRoom id={userId} />
      </section>
    </div>
  );
}

function ChatRoom(data) {
  const userId = data.id;

  // const docRef = firestore.collection('chats').doc('1ecf44b3-d1d6-4b1c-9ab8-d3d8327e5b2c');
  // const res = docRef.get();
  ///////////////
  const dummy = useRef();
  const messagesRef = firestore.collection('chats');
  // .doc(`${userId}`).collection('messages');
  const query = messagesRef.orderBy('updatedAt', 'desc').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log('messages', messages);
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

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
    <>
      {/* <main style={{ height: '400px', width: '400px' }} className={'main'}> */}
      <div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </div>
      {/* </main> */}
    </>
  );
}
function openChatBox(id) {
  console.log('eee');
  <ChatBoxs id={id} />;
}

function deletedChatBox(id) {
  console.log('id', id);
  confirm({
    title: 'Are you sure delete this chat box?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
      firestore
        .collection('chats')
        .doc(id)
        .delete()
        .then(() => {
          notification('success', 'ChatBox successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function ChatMessage(props) {
  const { name, id, updatedAt } = props.message;
  const [showDelete, setShowDelete] = useState(false);
  const [isChat, setIsChat] = useState(false);
  async function check(show) {
    console.log(11, show);
    if (show) {
      await setIsChat(false);
    } else {
      await setIsChat(true);
    }
  }
  return (
    <div>
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <Button
        style={{ textAlign: 'left', width: '260px', height: '62px', margin: '5px', borderRadius: '5px', border: 'solid 1px', backgroundColor: '#e5e5ea' }}
        onClick={() => check(isChat)}
      >
        <span style={{ whiteSpace: 'pre-line' }}>{name}</span>
        <br></br>
        <span>Send message at: {updatedAt}</span>
      </Button>
      <Button style={{ height: '62px', margin: '5px', borderRadius: '5px', position: 'absolute' }} type='primary' danger onClick={() => deletedChatBox(id)}>
        <DeleteOutlined />
      </Button>
      <Modal visible={isChat} onCancel={() => setIsChat(false)} footer={''} width={470}>
        <ChatBoxs id={id} name={name} />
      </Modal>
    </div>
  );
}

export default ChatBox;
