import { useState, useEffect } from 'react'
import CloseIcon from '../img/cerrar.svg'
//import Message from './Message'

const Modal = ({setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense}) => {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if( Object.keys(editExpense).length > 0){
            setName(editExpense.name)
            setAmount(editExpense.amount)
            setCategory(editExpense.category)
            setId(editExpense.id)
        }
    },[])

    const closeModal = () =>{
        setModal(false)
        setEditExpense({})
        setAnimateModal(false)        
    }

    const isSubmit = (event) =>{
        event.preventDefault();
        
        if(name === '' || amount === '' || category === ''){
            setMessage('Todos los campos son obligatorios')
            return
        }

        saveExpense({name, amount, category, id})
    }

    const Message = ({children, tipo}) => {
        return (
          <div className={`alerta ${tipo}`}>{children}</div>
        )
      }
      
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CloseIcon} alt = "Close modal" onClick={closeModal} />
        </div>
        <form className = {`formulario ${animateModal ? "animar" : ''}`} onSubmit={isSubmit}>
            <legend>{editExpense.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>            
            <div className="campo">
                <label htmlFor="name">Nombre del gasto</label>
                <input id = "name" type = "text" placeholder="Añade el nombre del gasto" value={name} onChange = {event => setName(event.target.value)}/>
            </div>

            <div className="campo">
                <label htmlFor="amount">Cantidad</label>
                <input id = "amount" type = "number" placeholder="Añade cantidad del gasto" value={amount} onChange = {event => setAmount(Number(event.target.value))}/>
            </div>

            <div className="campo">
                <label htmlFor="amount">Categoría</label>
                <select id="category" value={category} onChange = {event => setCategory(event.target.value)}>
                    <option value="">Selecciona una categoría</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Comida">Comida</option>
                    <option value="Casa">Casa</option>
                    <option value="Otros">Otros gastos</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Salud">Salud</option>
                    <option value="Suscripciones">Suscripciones</option>
                </select>
            </div> 
            <input type="submit" value = {editExpense.name ? "Editar gasto" : "Agregar gasto"} />
            {message && <Message tipo = "error">{message}</Message>}
        </form>
    </div>
  )
}

export default Modal