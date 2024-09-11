import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const SignUp = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState(null);

    const sendToBackend = () => {
        if (fdata.name === "" || fdata.email === "" || fdata.phone === "" || fdata.password === "") {
            setErrorMsg("All fields are required");
        } else {
            fetch('http://192.168.10.3:5001/signup', {  // Ensure this URL matches your backend URL and port
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.error);
                } else {
                    alert("Account created successfully! Please login to your account.");
                    navigation.navigate('Login');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMsg("An error occurred while signing up");
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={"grey"}
                onChangeText={text => setFdata({ ...fdata, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter valid email"
                placeholderTextColor={"grey"}
                onChangeText={text => setFdata({ ...fdata, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter phone"
                placeholderTextColor={"grey"}
                onChangeText={text => setFdata({ ...fdata, phone: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor={"grey"}
                onChangeText={text => setFdata({ ...fdata, password: text })}
                secureTextEntry
            />
            {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            <TouchableOpacity style={styles.button} onPress={sendToBackend}>
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "darkslategrey",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        marginRight: 5,
    },
    footerLink: {
        color: 'red',
        textDecorationLine: 'underline',
    },
    errorMsg: {
        color: 'red',
        marginBottom: 10,
    },
});

export default SignUp;
