import {View,StyleSheet,Text,Alert} from 'react-native'
import { useState } from 'react'
import Input from './Input'
import Button from '../UI/Button'
import { GlobalStyles } from '../../constants/styles'

function ExpenseForm({onCancel,onSubmit,submitButtonLabel,defaultValues}){
    const [inputs,setInputs] = useState({
        amount: {value:defaultValues ? defaultValues.amount.toString():"",isValid:true},
        date: {value:defaultValues ? defaultValues.date.toISOString().slice(0,10):"",isValid:true},
        description:{value:defaultValues ? defaultValues.description:"",isValid:true}
    })
    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputs((curInputs) =>{
            return {
                ...curInputs,
                [inputIdentifier]:{value:enteredValue,isValid:true}
            }
        })
    }
    function submitHandler(){
        const expenseData = {
            amount:+inputs.amount.value,
            date: new Date(inputs.date.value),
            description:inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== "Invalid Date"
        const descriptionIsValid = expenseData.description.trim().length > 0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
        //    Alert.alert("Invalid input","Please check your input values")
        setInputs((curInputs) =>{
            return {
                amount:{value:curInputs.amount.value,isValid:amountIsValid},
                date:{value:curInputs.date.value,isValid:dateIsValid},
                description:{value:curInputs.description.value,isValid:descriptionIsValid}
            }
        })
            return ;
        }

        onSubmit(expenseData)
        
    }

    const formIsValid = !inputs.amount.isValid|| !inputs.date.isValid || !inputs.description.isValid
    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
        <Input 
        label="Amount"
        textInputConfig={{
            keyboardType:"decimal-pad",
            onChangeText:inputChangeHandler.bind(this,"amount"),
            value:inputs.amount.value
        }}
        style={styles.rowInput}
        invalid={!inputs.amount.isValid}
        />
        <Input 
        label="Date"
        textInputConfig={{
            placeholder:"YYYY-MM-DD",
            maxLength:10,
            onChangeText:inputChangeHandler.bind(this,"date"),
            value:inputs.date.value
        }}
        style={styles.rowInput}
        invalid={!inputs.date.isValid}
        />
        </View>
        <Input 
        label="Description"
        textInputConfig={{
            multiline:true,
            onChangeText:inputChangeHandler.bind(this,"description"),
            value:inputs.description.value
        }}
        invalid={!inputs.description.isValid}
        
        />
        {formIsValid && <Text style={styles.errorText}>Please Fill All the Date Correctly!!</Text>}
         <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm

const styles = StyleSheet.create({
    inputsRow:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    rowInput:{
        flex:1
    },
    form:{
        marginTop:40
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:'white',
        textAlign:"center",
        marginVertical:24
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        width:120,
        marginHorizontal:8
    },
    errorText:{
        textAlign:"center",
        color:GlobalStyles.colors.error500,
        margin:8
    }
})