import React from 'react'
import Expense from './Expense'

const ExpensesList = ({expenses, setEditExpense, deleteExpense, filtered, filteredExpenses}) => {
  return (
    <div className="listado-gastos contenedor">
       
        { filtered ? (
          <>
            <h2>{filteredExpenses.length ? 'Gastos' : 'No hay gastos' }</h2>
            {filteredExpenses.map(expense => (
              <Expense 
                key = {expense.id}
                expense = {expense}
                setEditExpense = {setEditExpense}
                deleteExpense = {deleteExpense}
              />))}
          </>
        ) : (
          <>
          <h2>{expenses.length ? 'Gastos' : 'No hay gastos' }</h2>
          {expenses.map(expense =>(
            <Expense 
                key = {expense.id}
                expense = {expense}
                setEditExpense = {setEditExpense}
                deleteExpense = {deleteExpense}
            />
          ))}
        </>
        )
      }        
    </div>
  )
}

export default ExpensesList