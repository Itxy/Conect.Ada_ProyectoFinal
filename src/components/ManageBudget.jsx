import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ManageBudget = ({expenses, budget, setExpenses, setBudget, setIsValidBudget}) => {

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percentage, setPercentage] = useState(0)

    //Dar formato a la cantidad de presupuesto
    const formattingAmount = (amount) =>{
        return amount.toLocaleString('en-EN', { style: 'currency', currency: 'USD'})
    }

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)
        const totalAvailable = budget - totalSpent

        const newPercentage = (((budget - totalAvailable)/budget) * 100).toFixed(2)

        setPercentage(newPercentage)

        setAvailable(totalAvailable)
        setSpent(totalSpent)            
    },[expenses])

    const resetApp = () =>{
        const result = confirm('¿Estás seguro de reiniciar la App?')

        if(result) {
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
        else{
            console.log('No')
        }
    }
    
    
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar value={percentage} text = {`${percentage}%`} background backgroundPadding={6}
                styles={buildStyles ({backgroundColor: "#f2e6ff", textColor: "#fff", pathColor: "#5600b3", trailColor: "transparent", textColor: "#5600b3"})} >
                </CircularProgressbar>
            </div>
            
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span>{formattingAmount(budget)}
                </p>

                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formattingAmount(available)}
                </p>

                <p>
                    <span>Gastado: </span>{formattingAmount(spent)}
                </p>
                <button className="reset-app" type="button" onClick={resetApp}>
                    Resetear App
                </button>
            </div>
        </div>
    )
}

export default ManageBudget