import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword, updateProfile, deleteUser
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { emailJaCadastrado, salvarUsuario } from "./usuarios.js";

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome  = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  let usuarioCriado = null;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    usuarioCriado = cred.user;

    if (await emailJaCadastrado(email, usuarioCriado.uid)) {
      await deleteUser(usuarioCriado);          
      alert("Este e-mail já está cadastrado.");  
      return;
    }

    await updateProfile(usuarioCriado, { displayName: nome });
    await salvarUsuario(usuarioCriado.uid, nome, email, "senha");

    window.location.href = "restrita.html";

  } catch (erro) {
    if (erro.code === "auth/email-already-in-use") {
      alert("Este e-mail já está cadastrado.");
    } else if (erro.code === "auth/weak-password") {
      alert("A senha deve ter pelo menos 6 caracteres.");
    } else if (erro.code === "auth/invalid-email") {
      alert("E-mail inválido.");
    } else {
      console.error(erro);
      alert("Erro ao cadastrar: " + erro.message);
    }
  }
});
