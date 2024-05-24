import Header from "../../helpers/Header";
import "./ListadoUsuarios.css";
import React, { useEffect, useState } from "react";
import { connDatabase } from "../../config/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const ListadoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  async function getUsuarios() {
    let collectionUsuarios = collection(connDatabase, "usuarios");
    let resultado = await getDocs(collectionUsuarios);
    console.log(resultado.docs);
    setUsuarios(resultado.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(resultado.docs.map((doc) => ({ ...doc.data() })));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  function eliminarUsuario(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmar(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  async function confirmar(id) {
    let deleteUser = doc(connDatabase, "usuarios", id);
    await deleteDoc(deleteUser);
    getUsuarios();
  }

  return (
    <section className="panel">
      <Header />
      <main className="panel-contenido">
        {usuarios.map((element) => (
          <section>
            <section>
              <p>Nombre: {element.name}</p>
              <p>Usuario: {element.user}</p>
              <p>Correo: {element.email}</p>
              <p>Ciudad: {element.city}</p>
            </section>
            <div>
              <button>Editar</button>
              <button onClick={() => eliminarUsuario(element.id)}>
                Eliminar
              </button>
            </div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default ListadoUsuarios;
