import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { db } from '../firebase/config';
import { query, collection, onSnapshot, deleteDoc, doc, orderBy } from 'firebase/firestore';
import {
    useFonts,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  } from '@expo-google-fonts/lexend';

export default function TasksScreen({navigation}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArray = []
      querySnapshot.forEach((doc) => {
        tasksArray.push({...doc.data(), id: doc.id})
      });
      setTasks(tasksArray)
    })
    return () => unsubscribe()
  }, []);

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id))
  }

  const renderItem = ({item}) => {

    let taskIcon;
    let id = item.id;
    let taskTitle = item.task
    let name = item.name;
    let description = item.description;
    let location = item.location;
    let date = item.date;

    switch (item.task) {
      case 'Cleaning': 
        taskIcon = require('../assets/vacuum-cleaner.png');
        break;
      case 'Meal Prepping':
        taskIcon = require('../assets/restaurant.png');
        break;
      case 'Baby Sitting':
        taskIcon = require('../assets/baby.png');
        break;
      case 'Delivery':
        taskIcon = require('../assets/bag.png');
        break;
      default:
        break;

    }

    return (
    <>
      <View style={styles.taskContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.nameContainer}> 
            <Text style={styles.nameText}> 
              {item.name}
            </Text>
          </View>

          <View style={styles.dateContainer}> 
            <Image
              style={styles.image}
              source={require('../assets/calendar.png')}
            />
            <Text style={styles.dateText}> 
              {item.date}
            </Text>
          </View>

          <View style={styles.locationContainer}> 
            <Image
              style={styles.image}
              source={require('../assets/location.png')}
            />
            <Text style={styles.locationText}> 
              {item.location}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.updateDeleteContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdateOne', {
                  utaskTitle: taskTitle,
                  udate: date,
                  ulocation: location,
                  uname: name,
                  udescription: description,
                  uid: id,
                })
              }}
            >
              <Image 
                style={styles.editImage}
                source={require('../assets/pencil.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                deleteTask(id)
              }}
            >
              <Image 
                style={styles.trashImage}
                source={require('../assets/trash.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <Image 
                style={styles.iconImage}
                source={taskIcon}
                />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonTask}
          activeOpacity={0.40}
        >
          <Text style={styles.buttonText}>
            View Task
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonTask}
          activeOpacity={0.40}
        >
          <Text style={styles.buttonText}>
            View Applicants
          </Text>
        </TouchableOpacity>
      </View>
    </>
    );
  }

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
      <>
      <StatusBar style="dark" />
        <View style={styles.container}>


                {tasks.length === 0 && (
                  <View style={styles.noTasks}>
                    <Text style={styles.noTasksText}> 
                      You have not posted any tasks yet.
                    </Text>
                  </View>
                )}

                {tasks.length > 0 && (

                  <View style={styles.subContainer}>

                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      My Tasks
                    </Text>
                  </View>
                  <View style={styles.tasksContainer}>
                  <FlatList 
                    style={styles.tasks}
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                                        </View>
                  </View>
                )}
        </View>
        </>
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

  titleContainer: {
    width: 380,
    marginTop: 70,
    justifyContent: 'center',
    marginLeft: 1,
    marginBottom: 19,
  },

  title: {
    color: '#24252C',
    fontSize: 24,
    fontFamily: 'Lexend_600SemiBold',
    marginLeft: 1,
  },
  tasksContainer: {
    alignItems: 'center',
  },
  taskContainer: {
    backgroundColor: '#fff',
    width: 375,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 1,
    marginVertical: 1,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
  },
  nameContainer: {
    
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'LexendDeca_400Regular',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  dateText: {
    fontSize: 17,
    fontFamily: 'LexendDeca_400Regular',
    marginLeft: 7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  locationText: {
    fontSize: 17,
    fontFamily: 'LexendDeca_400Regular',
    marginLeft: 7,
  },
  image: {
    width: 18,
    height: 18,
  },  
  trashImage: {
    width: 20,
    height: 20,
  },
  editImage: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  button: {
    backgroundColor: '#5F33E1',
    width: 375,
    height: 65,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },   
  
  buttonTask: {
    backgroundColor: '#5F33E1',
    width: 180,
    height: 65,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 40,
  },   

  buttonContainer: {
    width: 375,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Lexend_500Medium',
  },  
  iconContainer: {
    backgroundColor: '#F4E0FF',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  updateDeleteContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
  noTasks: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'LexendDeca_400Regular',
  },  
});



/*

                  <ScrollView
                  contentContainerStyle={{paddingBottom: 200}}
                  showsVerticalScrollIndicator={false}
                  >

                  </ScrollView>

*/