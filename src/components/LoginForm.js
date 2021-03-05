import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { validateEmail } from './../utils/validations'
import firebase from './../utils/firebase'


export default function LoginForm(props) {
    const { changeForm } = props
    const [formData, setformData] = useState(defaultValue())
    const [formError, setformError] = useState({})

    const login = () => {
        let errors = {}
        if (!formData.email || !formData.password) {
            if(!formData.email) errors.email = true
            if(!formData.password) errors.password = true
        } else if(!validateEmail(formData.email)) {
            errors.email = true
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .catch(() => {
                    setformError({
                        email: true,
                        password: true,
                    }) 
                })
        }

        setformError(errors)
    }

    const onChange = (e, type) => {
        setformData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electrónico"
                placeholderTextColor="#969696"
                onChange={(e) => onChange(e, "email")}>
            </TextInput>

            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => onChange(e, "password")}>
            </TextInput>
        
            <Button onPress={login} title="Iniciar sesión"></Button>

            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Registrarse</Text>                
                </TouchableOpacity>                
            </View>
        </>
    )
}

function defaultValue() {
    return {
        email: "",
        password: "",
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
    register: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    error: {
        borderColor: "#940c"
    }
})
