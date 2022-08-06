import {createContext,useReducer} from 'react'

export const ExpenseContext = createContext()



function expenseReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state]
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense,...action.payload.data}    
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpenseContextProvider({children}){
    const [expenseState,dispatch] = useReducer(expenseReducer,[])

    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData})
    }

    function setExpense(expenseData){
        dispatch({type:'SET',payload:expenseData})
    }


    function deleteExpense(id){
 
        dispatch({type:"DELETE",payload:id})
    }
    function updateExpense(id,expenseData){
        dispatch({type:"UPDATE",payload:{id,data:expenseData}})
    }
    const value={
        expenses:expenseState,
        setExpense:setExpense,
        addExpense:addExpense,
        updateExpense:updateExpense,
        deleteExpense:deleteExpense
    }

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider