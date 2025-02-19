import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';

interface SafeAreaWrapperProps {
    children: React.ReactNode;
    title: string;
    onRefresh?: () => void;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children, title, onRefresh }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Status Bar with Dark Background */}
            <StatusBar backgroundColor={colors.brand} barStyle="light-content" />

            {/* Gradient Navbar */}
            <LinearGradient
                colors={colors.cardGradient}
                start={{ x: 0.05, y: 0.05 }}
                end={{ x: 0.95, y: 0.95 }}
                style={styles.gradient}
            >
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Content title={title} titleStyle={styles.titleText} />
                    {onRefresh && <Appbar.Action icon="refresh" color="white" onPress={onRefresh} />}
                </Appbar.Header>
            </LinearGradient>

            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        width: '100%',
        paddingTop: 0, // Prevents extra padding
    },
    appbar: {
        backgroundColor: 'transparent', // Transparent to show gradient
        elevation: 0, // No shadow for a clean look
    },
    titleText: {
        color: 'white', // Change text color to white
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default SafeAreaWrapper;


