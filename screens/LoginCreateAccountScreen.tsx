import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';

export default function LoginAndCreateAccount({navigation}: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigation.navigate("Panel");
        })
        .catch(error => {
            Alert.alert(error.message);
        })
        
    };

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Cuenta creada exitosamente");
        })
        .catch(error => {
            Alert.alert(error.message);
        })
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <View style={styles.containerLogin}>
                        <View style={styles.contenedorImagen}>
                            <Image source={require('../assets/loginimage.png')} style={styles.imagen} />
                        </View>
                        <Text style={styles.upText}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Text style={styles.upText}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="abc123@"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#BBDFDC'
    },
    containerLogin: {
        width: '90%',
        borderColor: '#6FA19C',
        borderWidth: 3,
        backgroundColor: '#E5E5E5',
        padding: 20,
        borderRadius: 8
    },
    contenedorImagen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagen: {
        width: 100,
        height: 100
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    upText: {
        margin: 5,
        fontSize: 15
    },
    button: {
        backgroundColor: '#189E90',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
