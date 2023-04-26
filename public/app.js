

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
 

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
  

     

     
      
      

      const loginButton = document.getElementById('login-button');
      loginButton.addEventListener('click', () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log('user:', user);
            if (user.email === 'woomin422@gmail.com') {
              alert("welcom ko");
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
            //
          } else {
           
          }
        } else {
          // 로그인되지 않은 경우 로그인 버튼을 표시하고, 로그아웃 버튼을 숨김
          document.getElementById('sign-out-button').style.display = 'none';
          document.getElementById('login-button').style.display = 'block';
        }
      });