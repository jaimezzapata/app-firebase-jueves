import React from "react";
import "./Login.css";
import { connDatabase } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Login = () => {
  
  async function getUsuarios(){
    let collectionUsuarios = collection(connDatabase, 'usuarios')
    let resultado = await getDocs(collectionUsuarios)
    console.log(resultado)
  }

  getUsuarios()

  return (
    <div class="login-page">
      <div class="form">
        <form class="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p class="message">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form>
        <form class="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button type="button">login</button>
          <p class="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
