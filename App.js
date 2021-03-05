import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, LogBox} from 'react-native'
import firebase from './src/utils/firebase'
import "firebase/auth"
import 'firebase/firestore'
import {decode, encode} from 'base-64'
import Auth from './src/components/Auth'
import ListBirthday from './src/components/ListBirthday'

if (!global.btoa) global.btoa = encode
if (!global.atob) global.atob = decode

LogBox.ignoreLogs(["Setting a timer"])

export default function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    /*PARA DETECTAR CUANDO EL ESTADIO DEL USUARIO CAMBIA, NOS DEVUELVE UNA
    FUNCION DE TIPO FLECHA CON UN RESPONSE NULO O CON LOS DATOS DEL USUARIO.*/
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response)
    })
  }, [])

  if (user === undefined) return null

  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user}></ListBirthday> : <Auth></Auth>}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  }
})