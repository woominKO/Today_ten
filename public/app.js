import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';

import {
  doc,
  setDoc,
  addDoc,
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBqcbYyDAQ2xj3NFw0Hd2nTip5I86y35eQ',
  authDomain: 'oneday-ten.firebaseapp.com',
  projectId: 'oneday-ten',
  storageBucket: 'oneday-ten.appspot.com',
  messagingSenderId: '306815651967',
  appId: '1:306815651967:web:fa113c1277acfeb183af4a',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore();

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('user:', user);
      if (user.email === 'woomin422@gmail.com') {
        alert('welcom ko');
      } else {
        signOut(auth)
          .then(() => {
            console.log('Sign-out successful.');
          })
          .catch((error) => {
            console.log('An error happened.', error);
          });
        alert("You don't have access.");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('error:', error);
    });
});

const signOutButton = document.getElementById('sign-out-button');
signOutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert('Sign-out successful.');
    })
    .catch((error) => {
      console.log('An error happened.', error);
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    if (user.email === 'woomin422@gmail.com') {
      // 로그인된 경우 로그아웃 버튼을 표시하고, 로그인 버튼을 숨김
      document.getElementById('sign-out-button').style.display = 'block';
      document.getElementById('login-button').style.display = 'none';
      document.getElementById('searchjoygo').style.display = 'block ';
      //본격적인 작동로직 쓰기

      // 새로운 <div> 요소를 생성합니다.
      function create() {
        const inputvalue = document.querySelector('input').value.toString();

        if (inputvalue.includes('https://youtu.be/')) {
          let newSrc = inputvalue.replace(
            'https://youtu.be/',
            'https://www.youtube.com/embed/'
          );

          const newDiv = document.createElement('iframe');
          newDiv.setAttribute('class', 'songvideo');
          newDiv.setAttribute('src', newSrc);
          newDiv.setAttribute('width', '420');
          newDiv.setAttribute('height', '315');

          const existingElement = document.getElementById('songs');
          existingElement.appendChild(newDiv);
          // //새로만들어진 divs컬렉션에 추가된내용 콘솔에 찍음

          addDoc(collection(firestore, 'divs'), { newSrc: newSrc })
            .then((newDocRef) => {
              console.log('Document written with ID: ', newDocRef.id);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });

          console.log(newSrc);
        } else if (
          inputvalue.includes('https://www.youtube.com/watch?v=') &&
          inputvalue.includes('&t=')
        ) {
          let newSrc = inputvalue.replace(
            'https://www.youtube.com/watch?v=',
            'https://www.youtube.com/embed/'
          );
          newSrc = newSrc.slice(0, newSrc.indexOf('&t='));

          const newDiv = document.createElement('iframe');
          newDiv.setAttribute('class', 'songvideo');
          newDiv.setAttribute('src', newSrc);
          newDiv.setAttribute('width', '420');
          newDiv.setAttribute('height', '315');

          const existingElement = document.getElementById('songs');
          existingElement.appendChild(newDiv);

          addDoc(collection(firestore, 'divs'), { newSrc: newSrc })
            .then((newDocRef) => {
              console.log('Document written with ID: ', newDocRef.id);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
          console.log(newSrc);
        } else if (
          inputvalue.includes('https://www.youtube.com/watch?v=') == true &&
          inputvalue.includes('&t=') == false &&
          inputvalue.includes('&pp=') == false
        ) {
          const newSrc = inputvalue.replace(
            'https://www.youtube.com/watch?v=',
            'https://www.youtube.com/embed/'
          );

          const newDiv = document.createElement('iframe');
          newDiv.setAttribute('class', 'songvideo');
          newDiv.setAttribute('src', newSrc);
          newDiv.setAttribute('width', '420');
          newDiv.setAttribute('height', '315');

          const existingElement = document.getElementById('songs');
          existingElement.appendChild(newDiv);

          addDoc(collection(firestore, 'divs'), { newSrc: newSrc })
            .then((newDocRef) => {
              console.log('Document written with ID: ', newDocRef.id);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
          console.log(newSrc);
          // ------------------------
        } else if (
          inputvalue.includes('https://www.youtube.com/watch?v=') &&
          inputvalue.includes('&pp=')
        ) {
          let newSrc = inputvalue.replace(
            'https://www.youtube.com/watch?v=',
            'https://www.youtube.com/embed/'
          );
          // newSrc = newSrc.slice(0, newSrc.indexOf('&p'));
          // console.log(newSrc);

          newSrc = newSrc.slice(0, newSrc.indexOf('&pp='));

          const newDiv = document.createElement('iframe');
          newDiv.setAttribute('class', 'songvideo');
          newDiv.setAttribute('src', newSrc);
          newDiv.setAttribute('width', '420');
          newDiv.setAttribute('height', '315');

          const existingElement = document.getElementById('songs');
          existingElement.appendChild(newDiv);

          addDoc(collection(firestore, 'divs'), { newSrc: newSrc })
            .then((newDocRef) => {
              console.log('Document written with ID: ', newDocRef.id);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
          console.log(newSrc);
        } else {
          alert('유효한 유튜브 공유 링크를 입력하세요.');
        }
      }
      const add = document.getElementById('add');
      add.addEventListener('click', async (event) => {
        event.preventDefault(); // 새로고침 방지
        create();
      });
    } else {
      document.getElementById('sign-out-button').style.display = 'none';
      document.getElementById('login-button').style.display = 'block ';
      document.getElementById('searchjoygo').style.display = 'none';
    }
  } else {
    // 로그인되지 않은 경우 로그인 버튼을 표시하고, 로그아웃 버튼을 숨김
    document.getElementById('sign-out-button').style.display = 'none';
    document.getElementById('login-button').style.display = 'block ';
    document.getElementById('searchjoygo').style.display = 'none';
  }
});
//새로고침할때 divs console에 찍음
window.onload = async function () {
  const querySnapshot = await getDocs(collection(firestore, 'divs'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());

    const newSrc = doc.data().newSrc;
    const newDiv = document.createElement('iframe');
    newDiv.setAttribute('class', 'songvideo');
    newDiv.setAttribute('src', newSrc);
    newDiv.setAttribute('width', '420');
    newDiv.setAttribute('height', '315');
    const existingElement = document.getElementById('songs');
    existingElement.appendChild(newDiv);
  });
};
