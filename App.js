import { StyleSheet, Text, View, Button } from 'react-native';
import Form from './components/playform';
import Games from './components/game-list';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function App() {
  const [id, setID] = useState();

  function changeUUID() {
    console.log("old ID: ", id);
    setID(uuid());
  }

  function formCallback(obj) {
    console.log(obj);
  }

  return (
    <View style={styles.container}>
      <Text>Play together!</Text>
      <Text>ID: {id}</Text>
      <Button onPress={changeUUID} title='Change UUID'/>
      <Form callback={formCallback} />
      <Games />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
