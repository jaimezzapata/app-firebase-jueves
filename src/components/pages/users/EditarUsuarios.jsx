import React, { useEffect, useState } from "react";
import "./EditarUsuarios.css";
import { connDatabase } from "../../config/firebaseConfig";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  let redireccion = useNavigate();
  let { id } = useParams();

  async function getUsuarioId(id) {
    let usuarioEditar = await getDoc(doc(connDatabase, "usuarios", id));
    console.log(usuarioEditar);
    setUser(usuarioEditar.data().user);
    setEmail(usuarioEditar.data().email);
    setName(usuarioEditar.data().name);
    setPassword(usuarioEditar.data().password);
  }
  useEffect(() => {
    getUsuarioId(id);
  }, []);

  async function editarUsuario() {
    let nuevoUsuario = {
      user,
      password,
      email,
      name,
    };
    let enviarUsuario = doc(connDatabase, "usuarios", id);
    await updateDoc(enviarUsuario, nuevoUsuario);
    redireccion("/listado-usuarios");
    console.log(nuevoUsuario);
  }

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="Username"
            value={user}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
          <input onChange={(e) => setImg(e.target.value)} type="file" />
          <button onClick={editarUsuario} type="button">
            Editar
          </button>
          <button type="button">
            <Link to="/listado-usuarios">Cancelar</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuarios;
