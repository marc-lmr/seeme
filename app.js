// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2kmIOknqnbY7nzLMvyyoO7i4fMymeM80",
  authDomain: "seeme-30ed9.firebaseapp.com",
  projectId: "seeme-30ed9",
  storageBucket: "seeme-30ed9.appspot.com",
  messagingSenderId: "896639210596",
  appId: "1:896639210596:web:a127630ede855b6f243b71",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

function updateUI(user) {
  const authDiv = document.getElementById("auth");
  const appDiv = document.getElementById("app");
  const profileDiv = document.getElementById("profile-setup");
  if (user) {
    authDiv.style.display = "none";

    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists && doc.data().pseudo) {
        document.getElementById("user-pseudo").textContent = doc.data().pseudo;
        profileDiv.style.display = "none";
        appDiv.style.display = "block";
        loadUserVisibility();
        loadVisibleUsers();
      } else {
        profileDiv.style.display = "block";
        appDiv.style.display = "none";
      }
    });
  } else {
    authDiv.style.display = "block";
    profileDiv.style.display = "none";
    appDiv.style.display = "none";
  }
}

auth.onAuthStateChanged(user => updateUI(user));

window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Inscription réussie !"))
    .catch(e => alert("Erreur : " + e.message));
};

window.signIn = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Connexion réussie !"))
    .catch(e => alert("Erreur : " + e.message));
};

window.signOut = function () {
  auth.signOut().then(() => alert("Déconnexion réussie !"));
};

window.saveProfile = async function () {
  const pseudo = document.getElementById("pseudo").value;
  const file = document.getElementById("photo").files[0];
  const user = auth.currentUser;

  let photoURL = "";

  if (file) {
    const storageRef = storage.ref(`avatars/${user.uid}`);
    await storageRef.put(file);
    photoURL = await storageRef.getDownloadURL();
  }

  await db.collection("users").doc(user.uid).set({
    email: user.email,
    pseudo,
    photoURL,
    visible: false,
  });

  alert("Profil sauvegardé !");
  updateUI(user);
};

window.toggleVisibility = async function () {
  const user = auth.currentUser;
  const userRef = db.collection("users").doc(user.uid);
  const doc = await userRef.get();
  const current = doc.data().visible;
  await userRef.update({ visible: !current });

  document.getElementById("visibility-status").textContent =
    "Statut : " + (!current ? "👁️ Visible" : "🙈 Invisible");

  loadVisibleUsers();
};

async function loadUserVisibility() {
  const user = auth.currentUser;
  const doc = await db.collection("users").doc(user.uid).get();
  if (doc.exists) {
    const visible = doc.data().visible;
    document.getElementById("visibility-status").textContent =
      "Statut : " + (visible ? "👁️ Visible" : "🙈 Invisible");
  }
}

async function loadVisibleUsers() {
  const container = document.getElementById("visible-users");
  container.innerHTML = "";
  const snapshot = await db.collection("users").where("visible", "==", true).get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "user-card";

    const img = document.createElement("img");
    img.src = data.photoURL || "https://via.placeholder.com/70";
    const name = document.createElement("p");
    name.textContent = data.pseudo || "Anonyme";

    div.appendChild(img);
    div.appendChild(name);
    container.appendChild(div);
  });
}
