import { useContext,useEffect,useState } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import ErrorOverLay from "../components/UI/ErrorOverloay"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import { ExpenseContext } from "../store/expense-context"
import { fetchExpense } from "../util/http"



function RecentExpenses(){
    const [isFetching,setIsFetching] = useState(true)
    const [error,setIsError] = useState('')
    const recentExpenseCtx = useContext(ExpenseContext)
    // const [fetchedExpenses,setFetchedExpenses] = useState([])

    useEffect(()=>{
        async function getExpense(){
        setIsFetching(true)
        try {
            const expense =  await  fetchExpense()  
            // setFetchedExpenses(expense)
            recentExpenseCtx.setExpense(expense)          
        } catch (error) {
            setIsError("Could not fetch expenses!")   
        }

        setIsFetching(false)

        }
        getExpense()

    },[])
    
    function errorHandler(){
        setIsError(null)
    }

    if(error && !isFetching){
        return <ErrorOverLay message={error} onConfirm={errorHandler}/>
    }
    if(isFetching){
        return <LoadingOverlay/>
    }

    return <ExpensesOutput expenses={recentExpenseCtx.expenses} expensesPeriod="Last 7 days" fallbackText="No Expenses registered for the last 7 days"/>
        // return <ExpensesOutput expenses={fetchedExpenses} expensesPeriod="Last 7 days" fallbackText="No Expenses registered for the last 7 days"/>
    
}

export default RecentExpenses