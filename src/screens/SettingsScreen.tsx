import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Appbar,
  List,
  Switch,
  Divider,
  Text,
  Dialog,
  Portal,
  Button,
  RadioButton,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataUsage, setDataUsage] = useState('wifi');
  const [themeDialogVisible, setThemeDialogVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <ScrollView>
        <List.Section>
          <List.Subheader>General</List.Subheader>
          <List.Item
            title="Notifications"
            description="Receive push notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            description="Enable dark theme"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="App Theme"
            description="Customize application appearance"
            left={props => <List.Icon {...props} icon="palette" />}
            onPress={() => setThemeDialogVisible(true)}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Data Usage</List.Subheader>
          <List.Item
            title="Data Saving Mode"
            description={
              dataUsage === 'wifi'
                ? 'Download media on Wi-Fi only'
                : dataUsage === 'low'
                ? 'Reduced data usage'
                : 'Standard data usage'
            }
            left={props => <List.Icon {...props} icon="wifi" />}
            onPress={() => setThemeDialogVisible(true)}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Privacy"
            description="Manage your data and privacy"
            left={props => <List.Icon {...props} icon="shield-account" />}
          />
          <Divider />
          <List.Item
            title="Security"
            description="Password and authentication"
            left={props => <List.Icon {...props} icon="security" />}
          />
        </List.Section>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={themeDialogVisible}
          onDismiss={() => setThemeDialogVisible(false)}>
          <Dialog.Title>Choose Theme</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={value => setDataUsage(value)}
              value={dataUsage}>
              <RadioButton.Item label="Wi-Fi only" value="wifi" />
              <RadioButton.Item label="Low data usage" value="low" />
              <RadioButton.Item label="Standard" value="standard" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setThemeDialogVisible(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  versionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#888',
  },
});

export default SettingsScreen;