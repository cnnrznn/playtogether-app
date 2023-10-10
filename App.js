import { ScrollView, StyleSheet } from 'react-native';
import Form from './components/playform';
import Games from './components/game-list';

export default function App() {

  function formCallback(result) {
    if (!result.location) {
      alert("Need a location");
      return;
    }

    console.log(result);

    // Fire off request to server and wait for UI to render
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form callback={formCallback} />
      <Games />
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
});
