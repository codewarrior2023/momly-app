import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, LexendDeca_400Regular } from '@expo-google-fonts/lexend-deca';
import AppLoading from 'expo-app-loading';

export default function Job({taskTitle, imageUrl, navigation}) {
let [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
    });
    if (!fontsLoaded) {
    return <AppLoading />;
    } 
    else {
    return (
        <TouchableOpacity 
            style={styles.taskContainer}
            activeOpacity={0.40}
            onPress={() => {navigation.navigate('FormOne', {
              name: taskTitle,
              taskTitle: taskTitle,
              imageUrl: imageUrl
            })

            }}
        > 
            <View style={styles.iconContainer}>
            <Image 
                style={styles.iconImage}
                source={imageUrl}
                />
            </View>
            <Text style={styles.taskText}>
            {taskTitle}
            </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#fff',
    width: 375,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginHorizontal: 1,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
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
  taskText: {
    fontSize: 18,
    fontFamily: 'LexendDeca_400Regular',
    marginLeft: 13,
  }
});