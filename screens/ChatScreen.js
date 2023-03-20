import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  } from '@expo-google-fonts/lexend';

export default function ChatScreen() {
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
            <Text> Chat Screen </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
