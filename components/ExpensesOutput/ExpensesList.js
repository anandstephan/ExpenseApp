import { FlatList } from "react-native"
import ExpenseItem from "./ExpenseItem"

function renderExpenseItem(itemData){

    return  <ExpenseItem amount={itemData.item.amount} description={itemData.item.description} date={itemData.item.date} id={itemData.item.id}/>
}
function ExpensesList({expenses}){
    return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}/>
}
export default ExpensesList