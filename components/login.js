import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const Login = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        email: "",
        password: ""
    });

    const [errorMsg, setErrorMsg] = useState(null);

    const sendToBackend = () => {
        if (fdata.email === "" || fdata.password === "") {
            setErrorMsg("All fields are required");
        } else {
            fetch('http://192.168.10.3:5001/login', {
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
                        console.log("Login successful");
                        navigation.navigate('ui');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setErrorMsg("An error occurred while logging in");
                });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="grey"
                onPressIn={() => setErrorMsg(null)}
                onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry
                onPressIn={() => setErrorMsg(null)}
                onChangeText={(text) => setFdata({ ...fdata, password: text })}
            />

            {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}

            <TouchableOpacity onPress={sendToBackend} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Forgot password?</Text>
                <Text style={styles.footerText}>Continue with</Text>
            </View>

            <View style={styles.socialIcons}>
                <TouchableOpacity>
                    <AntDesign name="facebook-square" size={40} color="blue" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="google" size={40} color="green" />
                </TouchableOpacity>
            </View>

            <View style={styles.signupPrompt}>
                <Text style={styles.promptText}>Don't have an account?</Text>
                <Text style={styles.signupLink} onPress={() => navigation.navigate('signupscreen')}>Sign Up</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "darkslategrey",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'white',
        height: 40,
        width: '90%',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        color: 'white'
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        width: '30%',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    footer: {
        marginTop: 10,
        alignItems: 'center',
    },
    footerText: {
        color: 'grey',
        marginTop: 5,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    icon: {
        marginRight: 20,
    },
    signupPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 90,
    },
    promptText: {
        color: 'grey',
    },
    signupLink: {
        fontSize: 20,
        color: 'red',
        marginLeft: 3,
        marginTop: -4,
    },
    errorMsg: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'normal',
        borderRadius: 10,
        marginTop: 5,
    },
});

export default Login;
