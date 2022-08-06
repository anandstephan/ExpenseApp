import {Text,View,StyleSheet} from 'react-native'
import { useLayoutEffect,useContext,useState } from 'react'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'

import { ExpenseContext } from '../store/expense-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { storeExpense,updateExpense,deleteExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'

function ManageExpense({route,navigation}){
    const expenseCtx = useContext(ExpenseContext)
    const [isFetching,setIsFetching] = useState(false)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)
 
   
 
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing?"Edit Expense":"Add Expense"
        })
    
    },[navigation,isEditing])

    async function deleteExpenseHandler(){
        await deleteExpense(editedExpenseId)
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    
    }
    function cancelHandler(){
        navigation.goBack()
    }
    async function confirmHandler(expenseData){
        setIsFetching(true)
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId,expenseData)
            await updateExpense(editedExpenseId,expenseData)
            setIsFetching(false)
        }else{
            const id = await storeExpense(expenseData)
            setIsFetching(false)
            expenseCtx.addExpense({...expenseData,id})
        }
        navigation.goBack()
    }
   
    if(isFetching){
        return <LoadingOverlay/>
    }



    return <View style={styles.container}>
        <ExpenseForm 
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing?"Update":"Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}/>
        {
            isEditing && (
                <View style={styles.deleteContainer}>
                <IconButton 
                icon="trash" 
                size={36} 
                color={GlobalStyles.colors.error500} 
                onPress={deleteExpenseHandler}/>
                </View>
            )
        }
    </View>
}

export default ManageExpense

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:"center"
    }
})