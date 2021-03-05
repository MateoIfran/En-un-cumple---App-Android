import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import firebase from '../utils/firebase'
import 'firebase/firestore'

firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore(firebase)

export default function AddCumple(props) {
    const { user, setShowList, setReloadData } = props
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false)
    const [formDate, setformDate] = useState({})
    const [formError, setformError] = useState({})

    const hideDatePicker = () => {
        setisDatePickerVisible(false)
    }

    const handlerConfirm = (date) => {
        const dateBirth = date
        dateBirth.setHours(0)
        dateBirth.setMinutes(0)
        dateBirth.setSeconds(0)
        setformDate({...formDate, dateBirth: dateBirth})
        hideDatePicker()
    }

    const onChange = (e, type) => {
        setformDate({...formDate, [type]: e.nativeEvent.text})
    }

    const showDatePicker = () => {
        setisDatePickerVisible(true)
    }

    const onSubmit = () => {
        let errors = {}
        if(!formDate.name || !formDate.lastname || !formDate.dateBirth) {
            if(!formDate.name) errors.name = true
            if(!formDate.lastname) errors.lastname = true
            if(!formDate.dateBirth) errors.dateBirth = true
        } else {
            const date = formDate
            date.dateBirth.setYear(0)
            db.collection(user.uid)
                .add(date)
                .then(() => {
                    setReloadData(true)
                    setShowList(true)
                })
                .catch(() => {
                    setformError({name: true, lastname: true, dateBirth: true})
                })
        }

        setformError(errors)
    }

    return (
        <>
            <View style = {styles.container}>
                <TextInput
                    style = {[styles.input, formError.name && {borderColor: "#940c0c"}]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, "name")}>
                </TextInput>
                <TextInput
                    style = {[styles.input, formError.lastname && {borderColor: "#940c0c"}]}
                    placeholder="Apellido"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, "lastname")}>
                </TextInput>
                <View
                    style = {[styles.input, styles.datepicker, formError.dateBirth && {borderColor: "#940c0c"}]}>
                    <Text style={{ color: formDate.dateBirth ? "#fff" : "#969696", fontSize: 18 }} onPress={showDatePicker}>
                        {formDate.dateBirth 
                            ? moment(formDate.dateBirth).format("LL")
                            : "Fecha de nacimiento"
                        }
                    </Text>
                </View>
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.addButton}>Crear cumpleaños.</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}>
                
            </DateTimePickerModal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    datepicker: {
        justifyContent: 'center',
    },
    addButton: {
        fontSize: 18,
        color: "#fff"
    }
})
