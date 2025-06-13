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

// Fonction de mise à jour UI
function updateUI(user) {
  const authDiv = document.getElementById("auth");
  const appDiv = document.getElementById("app");
  const userEmail = document.getElementById("user-email");

  console.log("updateUI called", user);

  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    authDiv.style.display = "block";
    appDiv.style.display = "none";
    userEmail.textContent = "";
  }
}

// Détecter les connexions / déconnexions
auth.onAuthStateChanged((user) => {
  updateUI(user);
});

// Fonctions globales
window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
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
    .then(() => {
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

window.toggleVisibility = function () {
  alert("Fonction à venir : gestion de la visibilité 👁️");
};
