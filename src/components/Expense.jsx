import React from 'react'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import savingIcon from '../img/icono_ahorro.svg'
import foodIcon from '../img/icono_comida.svg'
import homeIcon from '../img/icono_casa.svg'
import otherExpensesIcon from '../img/icono_gastos.svg'
import leisureIcon from '../img/icono_ocio.svg'
import healthIcon from '../img/icono_salud.svg'
import suscriptionsIcon from '../img/icono_suscripciones.svg'

const iconList = {
    Ahorro: savingIcon,
    Comida: foodIcon,
    Casa: homeIcon,
    Otros: otherExpensesIcon,
    Ocio: leisureIcon, 
    Salud: healthIcon,
    Suscripciones: suscriptionsIcon
} 

function Expense({expense, setEditExpense, deleteExpense}) {
const {category, name, amount, id, date} = expense

const formattingDate = (date) => {
        const newDate = new Date()
        const options ={year: 'numeric', month: 'long', day : '2-digit',}
        return newDate.toLocaleDateString('es-ES', options)
}    

const leadingActions = () =>(
    <LeadingActions>
        <SwipeAction onClick={()=> setEditExpense(expense)}>Editar</SwipeAction>
    </LeadingActions>
)

const trailingActions = () =>(
    <TrailingActions>
        <SwipeAction onClick={()=> deleteExpense(id)}>Eliminar</SwipeAction>
    </TrailingActions>
)

return (
    <SwipeableList>
        <SwipeableListItem  leadingActions = {leadingActions()} trailingActions = {trailingActions()}>
            <div className="gasto sombra">
                <div className="contenido-gasto">
                    <img src = {iconList[category]} alt = "Icono Gasto" />
                    <div className="descripcion-gasto">
                        <p className="categoria">{category}</p>
                        <p className="nombre-gasto">{name}</p>
                        <p className="fecha-gasto">Fecha: {''}<span>{formattingDate(date)}</span></p>
                    </div>            
                </div>
                <p className="cantidad-gasto">{`$`}{amount}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense