import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



const App = () => {
  const [useData, setUserData]= useState({})
useEffect(()=>{
  GoogleSignin.configure({
    webClientId: '119079338728-riqr5qmbolrp9e50112lba5tr4l0r7v5.apps.googleusercontent.com',
  });
},[])

const SignInWithGoogle= async ()=> {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

return (
    <View style={styles.container}>
    <Pressable onPress={()=>SignInWithGoogle().then(res =>{
      console.log(res.user);
      setUserData(res.user);
    }).catch(error => console.log(error))
    } style={styles.btnBox}>
    <Text>Inicia sesión con Google</Text>
    </Pressable>
    <Text>
      UID: <Text>{useData.uid}</Text>{' '}
    </Text>
    <Text>
      Name: <Text>{useData.displayName}</Text>{' '}
    </Text>
    <Text>
      Email: <Text>{useData.email}</Text>{' '}
    </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      color: 'black',
    },
    btnBox: {
      paddingHorizontal: 30,
      backgroundColor: '#4169E1',
      paddingVertical: 20,
      borderRadius: 20,
    },
  
  });
