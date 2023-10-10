import { StyleSheet, View } from 'react-native';
import Form from './components/playform';
import Games from './components/game-list';

export default function App() {

  function formCallback(result) {
    if (!result.location) {
      alert("Need a location");
      return;
    }

    console.log(result);
  }

  return (
    <View style={styles.container}>
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
