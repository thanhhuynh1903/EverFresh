import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Header, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        />
        <View style={styles.content}>
          <Button
            title="Press me"
            onPress={() => console.log('Button pressed!')}
          />
          <Icon
            name="rowing"
            size={50}
            color="blue"
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
