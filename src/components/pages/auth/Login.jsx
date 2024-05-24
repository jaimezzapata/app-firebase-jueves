import React, { useEffect, useState } from "react";
import "./Login.css";
import { connDatabase } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  let redireccion = useNavigate();

  async function getUsuarios() {
    let collectionUsuarios = collection(connDatabase, "usuarios");
    let resultado = await getDocs(collectionUsuarios);
    setUsuarios(resultado.docs.map((doc) => ({ ...doc.data() })));
    console.log(resultado.docs.map((doc) => ({ ...doc.data() })));
  }
  useEffect(() => {
    getUsuarios();
  }, []);
  const buscarUsuario = () => {
    let estado = usuarios.some(
      (usuario) => usuario.user === user && usuario.password === password
    );
    return estado;
  };
  const iniciarSesion = () => {
    if (buscarUsuario()) {
      Swal.fire({
        title: "Bienvenido...",
        text: "Será redireccionado al Home",
        icon: "success",
      });
      redireccion("/home");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario y/o contraseña incorrecto",
        icon: "error",
      });
    }
  };
  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button onClick={iniciarSesion} type="button">
            login
          </button>
          <p class="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
