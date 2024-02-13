import { useState, useEffect } from "react"
import Error from "./Error";

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

const [nombre, setNombre]= useState('');
const [propietario, setPropietario]= useState('');
const [email, setEmail]= useState('');
const [fecha, setFecha]= useState('');
const [sintomas, setSintomas]= useState('');
const[error, setError]= useState(false);


useEffect(()=>{

  if(Object.keys(paciente).length >0){
    setNombre(paciente.nombre)
    setPropietario(paciente.propietario)
    setEmail(paciente.email)
    setFecha(paciente.fecha)
    setSintomas(paciente.sintomas)

  }


},[paciente])

const generarid =()=>{
const random = Math.random().toString(36).substring(2);
const fecha = Date.now().toString(36);

return random+ fecha
}

// haciendo el evento del formulario para revisar si hay campos vacios
const handleSubmit =(e)=>{
  e.preventDefault();

if([nombre, propietario, email, fecha,sintomas].includes('')){
 
  setError(true);
  return;

}
 
  setError(false)


  //objeto de paciente para llenar el objeto y crear una copia

 const objetopaciente = {
  nombre,
   propietario, 
   email,
    fecha,
    sintomas,
   

 }

 if(paciente.id){
    objetopaciente.id=paciente.id;
    const pacientesActualizados=pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetopaciente :pacienteState)
    setPacientes(pacientesActualizados)
    //limpia el formulario y lo devuelve como un solo objeto borrando de memoria el anterior
    setPaciente({})

 }else{
   objetopaciente.id=generarid();
  //se esta guardando en el objeto nuevo la copia del objeto en un nuevo arreglo para mostrar los pacientes
 
    setPacientes([...pacientes,objetopaciente]);

 }




//reinicia el formulario
  setNombre('');
  setPropietario('');
  setEmail('');
  setFecha('');
  setSintomas('');


}

  return (
   

    <div className="md:w-1/2 lg:2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
   <p className="text-bold mt-5 text-center mb-10">Añade Pacientes y {' '}
   <span className="text-indigo-600 font-bold">Administrarlos</span>


   </p>

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" >


    {error && <Error ><p>'Todos los campos son obligatorios'</p></Error>}      
    <div className="mb-5">

      <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
     


     {/* vamos a leer el el contenido del valor del inputo desde la variable nombre, posteriormente con onchange haremos una funcion flecha para poner el valor del contenido del target.value  */}
    <input id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={(e)=>setNombre(e.target.value)} type="text" placeholder="Nombre de la mascota" />

    </div>

    <div className="mb-5">

      <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
    <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={(e)=>setPropietario(e.target.value)} type="text" placeholder="Nombre del propietario" />

    </div>


    <div className="mb-5">

      <label htmlFor="email" className="block text-gray-700 uppercase font-bold">E-mail</label>
      <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Agrega tu e-mail" />

    </div>

    <div className="mb-5">

      <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha</label>
        <input id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(e)=>setFecha(e.target.value)}type="date"  />

    </div>

    <div className="mb-5">

  <label htmlFor="sinto,as" className="block text-gray-700 uppercase font-bold">Sintomas</label>
  <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={sintomas} onChange={(e)=>setSintomas(e.target.value)} placeholder="Describe los sintomas"></textarea>

</div>

<input type="submit" value={paciente.id ? 'Editar Paciente' :'Agregar Paciente'}
className="bg-indigo-600 w-full p-3 text-white uppercase text-bold hover:bg-indigo-700 cursor-pointer transition-colors"/>








    </form>
      
   
    </div>
  )
}

export default Formulario
