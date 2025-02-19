import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import { Text, Card, ActivityIndicator, Button } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todos';
import SafeAreaWrapper from '../components/common/SafeAreaWrapper';
import { debounce } from 'lodash';
import { colors } from '../utils/colors';

const ActivitiesScreen: React.FC = () => {
    const { data: todos, isLoading, error } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const [searchText, setSearchText] = useState('');
    const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'pending'>('all');

    // Debounced search function (300ms delay)
    const debouncedSearch = useCallback(
        debounce((text: string) => setSearchText(text), 300),
        []
    );

    // Handle Search Input
    const handleSearch = (text: string) => {
        debouncedSearch(text);
    };

    // Filtered & Grouped Data
    const groupedTodos = React.useMemo(() => {
        if (!todos) return [];

        // Apply search filter
        let filtered = todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchText.toLowerCase())
        );

        // Apply completion filter
        if (filterCompleted === 'completed') {
            filtered = filtered.filter((todo) => todo.completed);
        } else if (filterCompleted === 'pending') {
            filtered = filtered.filter((todo) => !todo.completed);
        }

        // Group by userId
        return filtered.reduce((acc: Record<number, any[]>, todo) => {
            if (!acc[todo.userId]) acc[todo.userId] = [];
            acc[todo.userId].push(todo);
            return acc;
        }, {});
    }, [todos, searchText, filterCompleted]);

    // Count of filtered results
    const totalResults = todos?.length || 0;
    const filteredResults = Object.values(groupedTodos).reduce((sum, arr) => sum + arr.length, 0);

    return (
        <SafeAreaWrapper title="Activities">
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search tasks..."
                    style={styles.searchInput}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.filterContainer}>
                <Button
                    mode={filterCompleted === 'all' ? 'contained' : 'outlined'}
                    onPress={() => setFilterCompleted('all')}
                >
                    All
                </Button>
                <Button
                    mode={filterCompleted === 'completed' ? 'contained' : 'outlined'}
                    onPress={() => setFilterCompleted('completed')}
                >
                    Completed ✅
                </Button>
                <Button
                    mode={filterCompleted === 'pending' ? 'contained' : 'outlined'}
                    onPress={() => setFilterCompleted('pending')}
                >
                    Pending ⏳
                </Button>
            </View>

            {/* Show filtered results count */}
            <View style={styles.resultsCountContainer}>
                <Text style={styles.resultsCountText}>
                    Showing {filteredResults} of {totalResults} results
                </Text>
            </View>

            {isLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.brand} />
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text>Error loading activities: {error.message}</Text>
                </View>
            ) : (
                <FlatList
                    data={Object.entries(groupedTodos)} // Convert grouped data to array
                    keyExtractor={(item) => `user-${item[0]}`}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => {
                        const [userId, todos] = item;

                        return (
                            <View style={styles.userSection}>
                                <Text style={styles.userHeader}>User ID: {userId}</Text>
                                {todos.map((todo: any) => (
                                    <Card key={todo.id} style={[styles.card, todo.completed && styles.completedCard]}>
                                        <Card.Content>
                                            <Text style={styles.todoText}>{todo.title}</Text>
                                            <Text style={styles.status}>
                                                {todo.completed ? '✅ Completed' : '⏳ Pending'}
                                            </Text>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </View>
                        );
                    }}
                />
            )}
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        backgroundColor: 'white',
        color: '#333',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    resultsCountContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    resultsCountText: {
        fontSize: 14,
        color: '#555',
    },
    list: {
        padding: 10,
    },
    userSection: {
        marginBottom: 20,
    },
    userHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.brand,
    },
    card: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    completedCard: {
        backgroundColor: '#d4edda',
    },
    todoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        marginTop: 5,
        fontSize: 14,
        color: 'gray',
    },
});

export default ActivitiesScreen;
