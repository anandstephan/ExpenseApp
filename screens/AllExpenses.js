import { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'

function AllExpenses(){
   const expenseCtx =  useContext(ExpenseContext)

return <ExpensesOutput 
expenses={expenseCtx.expenses} 
expensesPeriod="Total"
fallbackText="No Expenses Found!"/>
}

export default AllExpenses