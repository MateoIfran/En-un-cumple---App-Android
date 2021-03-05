import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { validateEmail } from './../utils/validations'
import firebase from '../utils/firebase'

export default function RegisterForm(props) {
    const { changeForm } = props
    const [formData,setFormData] = useState(defaultValue())
    const [formError, setformError] = useState({})

    const register =() => {
        let errors = {}
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email = true
            if(!formData.password) errors.password = true
            if(!formData.repeatPassword) errors.repeatPassword = true
        } else if(!validateEmail(formData.email)) {
            errors.email = true
        } else if(formData.password !== formData.repeatPassword) {
            errors.password = true
            errors.repeatPassword = true
        } else if(formData.password.length < 6) {
            errors.password = true
            errors.repeatPassword = true
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("Cuenta creada")
                }).catch(() => {
                    setformError({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    })
                })
        }

        setformError(errors)
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.errorInput]}
                placeholder="Correo electrónico"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}>
            </TextInput>

            <TextInput
                style={[styles.input, formError.password && styles.errorInput]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}>
            </TextInput>

            <TextInput
                style={[styles.input, formError.repeatPassword && styles.errorInput]}
                placeholder="Repetir contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}>
            </TextInput>

            <Button onPress={register} title="Registrarse"></Button>
            
            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar sesión</Text>                
                </TouchableOpacity>                
            </View>
        </>
    )
}

function defaultValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }
}

const styles = StyleSheet.create({
    btnText: {
        color: "#fff",
        fontSize: 18,
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    errorInput: {
        borderColor: "#940c0c"
    }
})
