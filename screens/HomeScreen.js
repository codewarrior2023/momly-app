import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Task from '../components/Task';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  } from '@expo-google-fonts/lexend';

export default function HomeScreen({navigation}) {
let [fontsLoaded] = useFonts({
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
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <ScrollView
              contentContainerStyle={{paddingBottom: 200}}
            >
            <Text style={styles.title}>
              Select a Task
            </Text>

            <View style={styles.tasksContainer}>
              <Task taskTitle="Cleaning" imageUrl={require('../assets/vacuum-cleaner.png')} navigation={navigation}/> 
              <Task taskTitle="Meal Prepping" imageUrl={require('../assets/restaurant.png')} navigation={navigation}/> 
              <Task taskTitle="Baby Sitting" imageUrl={require('../assets/baby.png')} navigation={navigation}/> 
              <Task taskTitle="Delivery" imageUrl={require('../assets/bag.png')} navigation={navigation}/> 
            </View>  
            </ScrollView>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  subContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#24252C',
    fontSize: 24,
    fontFamily: 'Lexend_600SemiBold',
    marginTop: 70,
    marginLeft: 1,
    marginBottom: 20,
  },
  tasksContainer: {
    alignItems: 'center',
  }
});
