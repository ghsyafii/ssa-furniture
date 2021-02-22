// //Add Admin cloud function
//
//
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//     apiKey: "AIzaSyDJr2d0IH3O8B7Ft0akImn1SdzqHSE3U3Y",
//     authDomain: "ssa-furniture.firebaseapp.com",
//     projectId: "ssa-furniture",
//     storageBucket: "ssa-furniture.appspot.com",
//     messagingSenderId: "1050348463474",
//     appId: "1:1050348463474:web:5acff70441166b238129eb",
//     measurementId: "G-DRJ3RC2EKG"
// };
//
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const db = firebase.firestore();
//
// //Get elements
//
// const txtEmail = document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignUp = document.getElementById('btnSignUp');
// const navLogout = document.getElementById('navLogout');
// const navLogin = document.getElementById('navLogin');
// const signedInNotice = document.getElementById('signedInNotice');
// const alreadyRegisteredNotice = document.getElementById('alreadyRegisteredNotice');
// const plsRegisterNotice = document.getElementById('plsRegisterNotice');
// const loginForm = document.querySelector('.login-form');
// const registerSuccess = document.getElementById('registerSuccess');
// const registerFailed = document.querySelector('#registerFailed');
// const adminbtn = document.querySelector('.admin-btn');
// const functions = firebase.functions();
// //add login event
//
// btnLogin.addEventListener('click', e => {
//     //get email and password
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();
//     //sign in
//     const promise = auth.signInWithEmailAndPassword(email,pass);
//     promise
//         .then(e => {
//             console.log(e.message, 'logged in!');
//             signedInNotice.classList.remove('d-none');
//             loginForm.reset();
//         })
//         .catch(e => {
//             console.log(e.message, 'error!');
//             plsRegisterNotice.classList.remove('d-none');
//         })
// })
//
// //add signup event
//
// btnSignUp.addEventListener('click', e => {
//     //get email and password
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     //login authentication
//     //
//     const auth = firebase.auth();
//     //register
//     const promise = auth.createUserWithEmailAndPassword(email,pass);
//     promise
//         .then(user => {
//             console.log(user, 'you are signed up!');
//             registerSuccess.classList.remove('d-none');
//             plsRegisterNotice.classList.add('d-none');
//             registerFailed.classList.add('d-none');
//             loginForm.reset();
//         })
//         .catch(e => {
//             console.log(e.message);
//             registerFailed.classList.remove('d-none');
//         })
// })
//
// //add logout (NOT WORKING YET)
//
// navLogout.addEventListener('click', e => {
//     firebase.auth().signOut()
//         .then(() => {
//             console.log("logout success");
//             loginForm.reset();
//         })
//         .catch(() => {
//             console.log("logout error");
//             loginForm.reset();
//         })
// });
//
//
// // Add a realtime listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser){
//         firebaseUser.getIdTokenResult().then(idTokenResult => {
//             if(idTokenResult.claims.user_id === "UDqWpJ9luOZeoNaBX0SrqyYctQz1" || idTokenResult.claims.user_id === "qDDtgGgAHZUfSuFNj2cHfeu66Nc2"){
//                 console.log('admin in the house');
//                 adminbtn.classList.remove('d-none');
//             };
//         })
//         console.log('user is signed in');
//         navLogin.classList.add('d-none');
//         navLogout.classList.remove('d-none');
//     } else {
//         console.log('no user signed in');
//         navLogin.classList.remove('d-none');
//         navLogout.classList.add('d-none');
//         signedInNotice.classList.add('d-none');
//         registerSuccess.classList.add('d-none');
//         adminbtn.classList.add('d-none');
//     }
// })
//
