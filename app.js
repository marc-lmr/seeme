// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2kmIOknqnbY7nzLMvyyoO7i4fMymeM80",
  authDomain: "seeme-30ed9.firebaseapp.com",
  projectId: "seeme-30ed9",
  storageBucket: "seeme-30ed9.appspot.com",
  messagingSenderId: "896639210596",
  appId: "1:896639210596:web:a127630ede855b6f243b71",
  measurementId: "G-22NC8FHQSE"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Fonction pour mettre à jour l'affichage selon l'état de connexion
function updateUI(user) {
  const authDiv = document.getElementById("auth");
  const appDiv = document.getElementById("app");
  const userEmail = document.getElementById("user-email");

  if (user) {
    // Connecté
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    // Déconnecté
    authDiv.sty
