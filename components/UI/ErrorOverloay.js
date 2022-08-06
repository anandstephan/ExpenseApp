import { View,StyleSheet,Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverLay({message,onConfirm}){
    return <View style={styles.container}>
        <Text style={[styles.title,styles.text]}>An error Occured!</Text>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>
}

export default ErrorOverLay

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    },
    text:{
        color:"white",
        textAlign:"center",
        marginBottom:8
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
})