import { ScrollView, View, Button, StyleSheet, Text } from 'react-native';
import Form from './components/playform';
import Games from './components/game-list';
import {v4 as uuid} from 'uuid';
import { useState } from 'react';

export default function App() {
  const [id, setID] = useState(uuid());

  // this is here for demo purposes
  // in a release version a UUID would be generated once
  // and stored on-device
  function changeUUID() {
      setID(uuid());
  }

  function formCallback(result) {
    if (!result.location) {
      alert("Need a location");
      return;
    }

    var body = {
      player: id,
      activity: result.activity,
      lat: result.latitude,
      lon: result.longitude,
      expire: Math.round((new Date()).getTime() / 1000) + (60 * result.time),
      range_km: 20,
    }

    // Fire off request to server and wait for UI to render
    fetch("http://localhost:8080/ping", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
    }).then(value => {
      value.json().then(data => {
        console.log(data)
      })
    }).catch(reason => {
      console.log(reason)
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
          <Text style={styles.col}>ID: {id}</Text>
          <Button onPress={changeUUID} title='Change UUID'/>
      </View>
      <Form callback={formCallback} />
      <Games id={id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
  },
  col: {
    paddingEnd: 10,
  }
});
