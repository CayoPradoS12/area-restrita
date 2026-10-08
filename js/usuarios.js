import { db } from "./firebase-config.js";
import {
  collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COLECAO = "usuarios";

export async function emailJaCadastrado(email, uidIgnorar = null) {
  const q = query(collection(db, COLECAO), where("email", "==", email.trim().toLowerCase()));
  const snap = await getDocs(q);
  return snap.docs.some(d => d.id !== uidIgnorar);
}

export async function salvarUsuario(uid, nome, email, provedor) {
  await setDoc(doc(db, COLECAO, uid), {
    nome,
    email: email.trim().toLowerCase(),
    provedor,
    criadoEm: serverTimestamp()
  });
}

export async function buscarUsuario(uid) {
  const snap = await getDoc(doc(db, COLECAO, uid));
  return snap.exists() ? snap.data() : null;
}
