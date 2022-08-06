import axios from "axios"


let BACKENDURL = 'https://expensetracker-75813-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData){
    const response = await axios.post(BACKENDURL+'/expenses.json',expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpense(){
   const response =  await axios.get(BACKENDURL+'/expenses.json')

   const expenses = []
 

   for(const key in response.data){
  
       const expenseObj = {
           id:key,
           amount:response.data[key].amount,
           date: new Date(response.data[key].date),
           description:response.data[key].description
       }
       expenses.push(expenseObj)
   }
   return expenses
}   

export  function updateExpense(id,expenseData){
    return axios.put(BACKENDURL+`/expenses/${id}.json`,expenseData)
}

export function deleteExpense(id){
    return axios.delete(BACKENDURL+`/expenses/${id}.json`,)
}