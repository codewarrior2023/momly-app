import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import AppLoading from 'expo-app-loading';
import { LexendDeca_400Regular } from '@expo-google-fonts/lexend-deca';
import {
  useFonts,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from '@expo-google-fonts/lexend';


export default function FormScreenTwo({route, navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { taskTitle, date, location } = route.params;

  const createTask = async () => {
    await addDoc(collection(db, 'tasks'), {
      date: date,
      location: location,
      name: name,
      description: description,
      task: taskTitle,
      createdAt: serverTimestamp(),
    })
    setName('');
    setDescription('')
  }

    let [fontsLoaded] = useFonts({
        LexendDeca_400Regular,
        Lexend_300Light,
        Lexend_400Regular,
        Lexend_500Medium,
        Lexend_600SemiBold,
        Lexend_700Bold,
        });
        if (!fontsLoaded) {
        return <AppLoading />;
        } 
        else {
        return (
            <View style={styles.container} >
                <View style={styles.nameContainer}>
                    <Text style={styles.taskTitle}>
                        Name
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Task Name"
                            onChangeText={(text) => {setName(text)}}
                            value={name}
                        />
                    </View>
                </View>

                <View style={styles.taskDescription}>
                    <Text style={styles.taskTitle}>
                        Description
                    </Text>
                    <View style={styles.descriptionContainer}>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Task Description"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => {setDescription(text)}}
                            value={description}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.40}
                    onPress={() => {
                      createTask()
                      navigation.navigate('My Tasks')
                    }}
                >
                    <Text style={styles.buttonText}>
                        Post Task
                    </Text>
                </TouchableOpacity>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    formContainer: {
        alignItems: 'center',
    }, 
    taskTitle: {
        color: '#24252C',
        fontSize: 19,
        fontFamily: 'Lexend_500Medium',
        marginBottom: 15,  
      },
      inputContainer: {
        backgroundColor: '#fff',
        width: 375,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 1,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 2,
      },
      textInput: {
        fontSize: 17,
        fontFamily: 'Lexend_400Regular', 
        width: 375,
        height: 65,
        paddingHorizontal: 15,
      },
      descriptionContainer: {
        backgroundColor: '#fff',
        width: 375,
        height: 175,
        flexDirection: 'row',
        marginHorizontal: 1,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 2,
      },
      descriptionInput: {
        fontSize: 17,
        fontFamily: 'Lexend_400Regular', 
        width: 375,
        height: 160,
        paddingHorizontal: 15,
        paddingTop: 15,
      },
      button: {
        backgroundColor: '#5F33E1',
        width: 375,
        height: 65,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
      },    
      buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Lexend_500Medium',
      },  
});