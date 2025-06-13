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
const db = firebase.firestore();

// Mettre à jour l'interface
function updateUI(user) {
  const authDiv = document.getElementById("auth");
  const appDiv = document.getElementById("app");
  const userEmail = document.getElementById("user-email");

  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    userEmail.textContent = user.email;
    loadUserVisibility();
    loadVisibleUsers();
  } else {
    authDiv.style.display = "block";
    appDiv.style.display = "none";
    userEmail.textContent = "";
  }
}

// Surveille les connexions
auth.onAuthStateChanged((user) => {
  updateUI(user);
});

// S'inscrire
window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Inscription réussie !"))
    .catch((error) => alert("Erreur : " + error.message));
};

// Se connecter
window.signIn = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Connexion réussie !"))
    .catch((error) => alert("Erreur : " + error.message));
};

// Se déconnecter
window.signOut = function () {
  auth.signOut().then(() => alert("Déconnexion réussie !"));
};

// Toggle visibilité
window.toggleVisibility = async function () {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = db.collection("users").doc(user.uid);
  const doc = await userRef.get();

  let newVisibility = true;
  if (doc.exists) {
    const data = doc.data();
    newVisibility = !data.visible;
  }

  await userRef.set({
    email: user.email,
    visible: newVisibility,
  });

  document.getElementById("visibility-status").textContent =
    "Statut : " + (newVisibility ? "👁️ Visible" : "🙈 Invisible");

  loadVisibleUsers();
};

// Charger son propre statut
async function loadUserVisibility() {
  const user = auth.currentUser;
  if (!user) return;

  const doc = await db.collection("users").doc(user.uid).get();
  if (doc.exists) {
    const visible = doc.data().visible;
    document.getElementById("visibility-status").textContent =
      "Statut : " + (visible ? "👁️ Visible" : "🙈 Invisible");
  } else {
    document.getElementById("visibility-status").textContent = "Statut : inconnu";
  }
}

// Charger les utilisateurs visibles
async function loadVisibleUsers() {
  const usersList = document.getElementById("visible-users");
  usersList.innerHTML = "";

  const snapshot = await db.collection("users").where("visible", "==", true).get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = data.email;
    usersList.appendChild(li);
  });
}
