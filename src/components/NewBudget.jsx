import {useState} from 'react'
//import Message from './Message'

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const[message, setMessage] = useState('')
    
    const manageBudget = (event) =>{
    event.preventDefault();
    
    
    if(!budget || budget < 0){
        setMessage("Ingresa una cantidad válida")

        return
    }
    setMessage('')  
    setIsValidBudget(true)  
  }

  const Message = ({children, tipo}) => {
    return (
      <div className={`alerta ${tipo}`}>{children}</div>
    )
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={manageBudget}> 
            <div className="campo">
                <label>Definir presupuesto</label>
                <input className="nuevo-presupuesto" placeholder="Ingresa presupuesto" type = "number" value={budget} 
                onChange={event => setBudget(Number(event.target.value))}/>
            </div>
            <input type="submit" value="Ingresar" />
            {message && <Message tipo="error">{message}</Message>}
        </form>
    </div>
  )
}

export default NewBudget