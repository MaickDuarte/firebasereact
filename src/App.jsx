import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
//capturando dados da tabela user
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])
//mostrando dados da tabela user em tela
  return (
    <div>
      <ul>
        {users.map(user => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
