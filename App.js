import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import FormScreenOne from './screens/FormScreenOne';
import FormScreenTwo from './screens/FormScreenTwo';
import UpdateScreenOne from './screens/UpdateScreenOne';
import UpdateScreenTwo from './screens/UpdateScreenTwo';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from '@expo-google-fonts/lexend';
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs()

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabsDirectory() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color}) => {

        let iconName;

        switch (route.name) {
          case 'Home': 
            iconName='ios-home';
            color = focused ? '#d3d3d3' : '#24252C';
            break;
          case 'My Tasks': 
            iconName='ios-clipboard'
            color = focused ? '#d3d3d3' : '#24252C';
            break;
          case 'Chat':
            iconName='chatbubble-ellipses'
            color = focused ? '#d3d3d3' : '#24252C';
            break;
          case 'Profile':
            iconName='person'
            color = focused ? '#d3d3d3' : '#24252C';
            break;
          default:
            break;
        }
        return <Ionicons name={iconName} color={color} size={26} />
        },
        tabBarStyle: { 
          height: 90,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Lexend_500Medium',
        },
        headerShown: false,
        tabBarActiveTintColor: '#d3d3d3',
        tabBarInactiveTintColor: '#24252C',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="My Tasks" component={TasksScreen}/>
      <Tab.Screen name="Chat" component={ChatScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  );
}

export default function App() {
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
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen 
            name="Tabs" 
            component={TabsDirectory} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="FormOne" 
            component={FormScreenOne} 
            options={({route}) => ({title: route.params.name, headerBackTitleVisible: false, headerTintColor: '#24252C', headerShadowVisible: false, headerTitleStyle: {fontSize: 20, fontFamily: 'Lexend_600SemiBold'}})}  
          />
          <Stack.Screen 
            name="FormTwo" 
            component={FormScreenTwo} 
            options={({route}) => ({title: route.params.name, headerBackTitleVisible: false, headerTintColor: '#24252C', headerShadowVisible: false, headerTitleStyle: {fontSize: 20, fontFamily: 'Lexend_600SemiBold'}})}  
          />
          <Stack.Screen 
            name="UpdateOne" 
            component={UpdateScreenOne} 
            options={({route}) => ({title: "Update Task", headerBackTitleVisible: false, headerTintColor: '#24252C', headerShadowVisible: false, headerTitleStyle: {fontSize: 20, fontFamily: 'Lexend_600SemiBold'}})}  
          />
          <Stack.Screen 
            name="UpdateTwo" 
            component={UpdateScreenTwo} 
            options={({route}) => ({title: "Update Task", headerBackTitleVisible: false, headerTintColor: '#24252C', headerShadowVisible: false, headerTitleStyle: {fontSize: 20, fontFamily: 'Lexend_600SemiBold'}})}  
          />
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
