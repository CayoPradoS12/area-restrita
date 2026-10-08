import { auth, googleProvider } from "./firebase-config.js";
import {
  signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { emailJaCadastrado, salvarUsuario, buscarUsuario } from "./usuarios.js";

let processandoGoogle = false;

onAuthStateChanged(auth, (user) => {
  if (user && !processandoGoogle) window.location.href = "restrita.html";
});

document.getElementById("btnGoogle").addEventListener("click", async () => {
  processandoGoogle = true;
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    const jaTemDoc = await buscarUsuario(user.uid);
    if (!jaTemDoc) {
      if (await emailJaCadastrado(user.email, user.uid)) {
        alert("Este e-mail já está cadastrado.");
        await signOut(auth);
        processandoGoogle = false;
        return;
      }
      await salvarUsuario(user.uid, user.displayName || "Usuário", user.email, "google");
    }
    window.location.href = "restrita.html";
  } catch (erro) {
    processandoGoogle = false;
    if (erro.code !== "auth/popup-closed-by-user") {
      console.error(erro);
      alert("Erro ao entrar com Google: " + erro.message);
    }
  }
});

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "restrita.html";
  } catch (erro) {
    alert("E-mail ou senha inválidos.");
  }
});
