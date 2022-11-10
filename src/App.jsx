import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import NewExpenseIcon from './img/nuevo-gasto.svg'
import ExpensesList from './components/ExpensesList'
import Filters from './components/Filters'

function App() {

  const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) ?? 0) 
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [])
  const [editExpense, setEditExpense] = useState({})
  const [filtered, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if( Object.keys(editExpense).length > 0){
      setModal(true)
     
      setTimeout(() =>{
      setAnimateModal(true)
      }, 400)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget)
  },[budget])

  useEffect(() => {
    const expenseLS = Number(localStorage.getItem('budget') ?? 0)

    if(budget > 0){
      setIsValidBudget(true)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

 useEffect(() => {
    if(filtered){
      const filteredExpenses = expenses.filter(expense => expense.category === filtered)
      setFilteredExpenses(filteredExpenses)
    }
  }, [filtered])


  const newExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() =>{
      setAnimateModal(true)
    }, 400)
  }

  const generateId = () =>{
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)

    return date + random
  }

  const saveExpense = expense => {
    if(expense.id){
      const updateExpenses = expenses.map( expenseState => expenseState.id  === expense.id ? expense : expenseState)
      setExpenses(updateExpenses)
      setEditExpense({})
    }
    else{
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setModal(false)
    setAnimateModal(false)  
  }

const deleteExpense = id => {
  const updateExpenses = expenses.filter(expense => expense.id !== id)
  console.log(updateExpenses)

  setExpenses(updateExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      
      <Header 
        expenses = {expenses}
        budget = {budget}
        setBudget = {setBudget}
        isValidBudget = {isValidBudget}
        setIsValidBudget = {setIsValidBudget}
        setExpenses = {setExpenses}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters 
              filtered = {filtered}
              setFilter = {setFilter}
            />
            <ExpensesList 
              expenses = {expenses}
              setEditExpense = {setEditExpense}
              deleteExpense = {deleteExpense}
              filtered = {filtered}
              filteredExpenses = {filteredExpenses}
            />
          </main>
          <div className = "nuevo-gasto">
            <img src = {NewExpenseIcon} alt = "New Icon" onClick={newExpense}/>
          </div>
        </>
      )}     

      {modal && <Modal setModal = {setModal} animateModal = {animateModal} setAnimateModal = {setAnimateModal} editExpense = {editExpense} setEditExpense = {setEditExpense}
      saveExpense ={saveExpense}/>}

    </div>
  )
}

export default App
