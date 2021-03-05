import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    const changeForm = () => {
        setIsLogin(!isLogin)
    }

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('./../images/logo.png')} />
            {isLogin ? (
                <LoginForm changeForm={changeForm}></LoginForm>
            ) : (
                <RegisterForm changeForm={changeForm}></RegisterForm>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: "80%",
        height: 220,
        marginBottom: 50,
        marginTop: 50,
    }
})