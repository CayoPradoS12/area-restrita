import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { buscarUsuario } from "./usuarios.js";

const conteudo = document.getElementById("conteudo");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  let dados = null;
  try {
    dados = await buscarUsuario(user.uid);
  } catch (erro) {
    console.error("Erro ao ler o Firestore:", erro);
  }

  const nome  = dados?.nome  || user.displayName || user.email.split("@")[0];
  const email = dados?.email || user.email;

  document.getElementById("boasVindas").textContent = `Bem-vindo(a), ${nome}`;
  document.getElementById("emailUsuario").textContent = `Email: ${email}`;
  conteudo.hidden = false;
});

document.getElementById("btnSair").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});