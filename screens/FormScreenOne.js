import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
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

export default function FormScreenOne({route, navigation}) {
    const [location, setLocation] = useState('');
    const [locationModalVisible, setLocationModalVisible] = useState(false); 
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const startDate = selectedStartDate ? selectedStartDate.format('MM-DD-YYYY').toString() : '';

    const { taskTitle } = route.params;
    

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

                <View style={styles.dateContainer}>
                    <Text style={styles.taskTitle}>
                        Date
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="01/01/2000"
                            value={startDate}
                            onPressIn={() => {
                                setModalVisible(true)
                            }}
                        />
                    </View>
                </View>

                <View style={styles.locationContainter}>
                    <Text style={styles.taskTitle}>
                        Location
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="City, State, Country"
                            value={location}
                            onPressIn={() => {
                                setLocationModalVisible(true)
                            }}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.40}
                        onPress={() => {navigation.navigate('FormTwo', {
                            name: taskTitle,
                            taskTitle: taskTitle,
                            date: startDate,
                            location: location,
                          })
                          setSelectedStartDate('')
                          setLocation('')

                          }}
                    >
                        <Text style={styles.buttonText}>
                            Continue 
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalPosition}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.modalPosition}>
                            <View style={styles.modalView}>
                                <CalendarPicker 
                                    onDateChange={setSelectedStartDate}  
                                    selectedDayColor='#F4E0FF'
                                    todayBackgroundColor='#fff'
                                />
                                <TouchableOpacity
                                    style={styles.buttonCloseOne}
                                    onPress={() => setModalVisible(false)}
                                    activeOpacity={0.40}
                                >
                                    <Text style={styles.buttonText}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.modalPosition}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={locationModalVisible}
                    >
                        <View style={styles.modalPosition}>
                            <View style={styles.modalView}>
                                <GooglePlacesAutocomplete
                                    placeholder='City, State, Country'
                                    textInputProps={{
                                        
                                    }}
                                    onPress={(data, details = null) => {
                                        setLocation(data.description);
                                    }}
                                    
                                    query={{
                                        key: 'AIzaSyDabBJ87cOSqFC2NrR2TURl50cDdkPDVK0',
                                        language: 'en',
                                        components: 'country:us',
                                        types: '(cities)'
                                    }}
                                    styles={{
                                        container: {
                                            flex: 1,
                                            width: 375,
                                            position: 'absolute',
                                            marginTop: 40,
                                        },
                                        listView: {
                                            marginTop: 5,

                                        },
                                        textInputContainer: {
                                            width: 375,
                                            height: 65,
                                            flexDirection: 'row',
                                            borderRadius: 10,
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 1 },
                                            shadowOpacity: 0.10,
                                            shadowRadius: 3,
                                            elevation: 2,
                
                                        }, 
                                        textInput: {
                                            color: '#24252C',
                                            fontSize: 17,
                                            fontFamily: 'Lexend_400Regular', 
                                            width: 375,
                                            height: 65,
                                            paddingVertical: 5,
                                            paddingHorizontal: 15,
                                        }
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.buttonCloseTwo}
                                    onPress={() => setLocationModalVisible(false)}
                                    activeOpacity={0.40}
                                >
                                    <Text style={styles.buttonText}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

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
      button: {
        backgroundColor: '#5F33E1',
        width: 375,
        height: 65,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
      },   
      buttonCloseOne: {
        backgroundColor: '#5F33E1',
        width: 375,
        height: 65,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        marginBottom: 20,
      },   
      buttonCloseTwo: {
        backgroundColor: '#5F33E1',
        width: 375,
        height: 65,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 89,
        zIndex: -1,
        borderRadius: 10,
        marginBottom: 20,
      },    
      buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Lexend_500Medium',
      },   
      modalPosition: {
        flex: 1,
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        flex: 1,
        width: 500,
        marginTop: 25,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

});
