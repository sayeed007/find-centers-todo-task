import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SafeAreaWrapper from '../components/common/SafeAreaWrapper';

const MenuScreen: React.FC = () => {
    return (
        <SafeAreaWrapper title="Menu">
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to Menu Screen</Text>
            </View>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default MenuScreen;
