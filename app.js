// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2kmIOknqnbY7nzLMvyyoO7i4fMymeM80",
  authDomain: "seeme-30ed9.firebaseapp.com",
  projectId: "seeme-30ed9",
  storageBucket: "seeme-30ed9.firebasestorage.app",
  messagingSenderId: "896639210596",
  appId: "1:896639210596:web:a127630ede855b6f243b71",
  measurementId: "G-22NC8FHQSE"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Déclarer les fonctions dans le scope global
window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Inscription réussie !");
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

window.signIn = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Connexion réussie !");
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

window.signOut = function () {
  auth.signOut().then(() => {
    alert("Déconnexion réussie !");
  });
};
