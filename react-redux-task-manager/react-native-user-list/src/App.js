import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { loadUsersFromStorage, fetchUsers } from './redux/usersSlice';
import UserList from './components/UserList/UserList';
import { colors } from './theme';

function MainApp() {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    dispatch(loadUsersFromStorage())
      .unwrap()
      .then((persistedUsers) => {
        if (!persistedUsers || persistedUsers.length === 0) {
          return dispatch(fetchUsers()).unwrap();
        }
      })
      .catch((err) => {
        console.error('Failed to load users from storage/API:', err);
      })
      .finally(() => {
        setIsHydrated(true);
      });
  }, [dispatch]);

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <View style={styles.contentCentered}>
          <ActivityIndicator size="large" color={colors.primary || '#5540f5'} />
          <Text style={styles.loadingText}>Loading directory...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <UserList />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBgStart || '#fbfcff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.appBgStart || '#fbfcff',
  },
  contentCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: colors.subtext || '#758197',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
  },
});
