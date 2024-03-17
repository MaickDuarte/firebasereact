import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAv7TFSlmiN3bt0vD8Bvn2Tt-h8fqp3Bvk",
  authDomain: "reactfirebase-bcc93.firebaseapp.com",
  projectId: "reactfirebase-bcc93"
});

export const App = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, "user")

//adicionando dados
  async function criarUser(){
    const user = await addDoc(userCollectionRef, {
      name, 
      email,
    })
    console.log(user)
  }
//capturando dados da tabela user
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])
//deletando dados

async function deleteUser(id){
  const userDoc = doc(db, 'user', id)
  await deleteDoc(userDoc)
}

//mostrando dados da tabela user em tela
  return (
    <div>
      <input
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={e => setName(e.target.value)}>
      </input>
      <input 
        type="text" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}>
      </input>
      <button onClick={criarUser}>Criar Usuário</button>
      <ul>
        {users.map(user => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={() => deleteUser(user.id)}>deletar usuario</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
