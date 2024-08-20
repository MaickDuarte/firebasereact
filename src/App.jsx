import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAv7TFSlmiN3bt0vD8Bvn2Tt-h8fqp3Bvk",
  authDomain: "reactfirebase-bcc93.firebaseapp.com",
  projectId: "reactfirebase-bcc93"
});

export const App = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [documento, setDocumento] = useState("")
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, "user")

//adicionando dados
  async function criarUser(){
    const user = await addDoc(userCollectionRef, {
      name, 
      email,
      documento
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="mb-3">
          <input className="form-control" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}></input>
          <input className="form-control" type="email" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)}></input>
          <input className="form-control" type="text" placeholder="Documento" value={documento} onChange={e => setDocumento(e.target.value)}></input>
          <button className="btn btn-primary" onClick={criarUser}>Criar Usuário</button>
        </div>
        <div className="mb-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Documento</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => {
            return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user?.documento ?? "Sem documento"}</td>
                  <td><button className="btn btn-danger" onClick={() => deleteUser(user.id)}>deletar usuario</button></td>
                </tr>
            )
          })}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
