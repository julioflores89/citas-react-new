import { useState,useEffect } from "react"
import Formulario from "./componentes/Formulario"
import Header from "./componentes/Header"
import Listadopacientes from "./componentes/Listadopacientes"





function App() {

  const [pacientes,setPacientes]=useState([]);
  const [paciente,setPaciente]=useState({});

//cuando se recarga la pagina se pierden los datos de local storage 
//con otro use effect podemos traer de nuevo los datos con un arreglo vacio

useEffect(() => {
  const obtenerLs = () => {
    const pacientesLS = JSON.parse(localStorage.getItem('pacientes'));
    if (pacientesLS) {
      setPacientes(pacientesLS);
    }
  };
  obtenerLs();
}, []);

useEffect(()=>{
localStorage.setItem('pacientes',JSON.stringify(pacientes));

},[pacientes])



  const eliminarPaciente = (id)=> {

    const pacientesActualizados= pacientes.filter(paciente =>paciente.id !== id);
    setPacientes(pacientesActualizados);
  
  }

  return (
    
    <div className="container mt-20 mx-auto">
    <Header/>
    <div className="mt-12 md:flex">
   <Formulario
   pacientes={pacientes}
    setPacientes={setPacientes}
    paciente={paciente}
    setPaciente={setPaciente}
   />
   <Listadopacientes 
    pacientes={pacientes}
    setPaciente={setPaciente}
    eliminarPaciente={eliminarPaciente}
   
   
   />
   </div>
   </div>
    
  )
}

export default App
