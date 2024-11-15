import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<MenuItem>({
    name: '',
    price: 0,
    description: '',
    category: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menu');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (response.ok) {
        setNewItem({
          name: '',
          price: 0,
          description: '',
          category: ''
        });
        fetchItems();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Management</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Item name"
          value={newItem.name}
          onChangeText={(text) => setNewItem({...newItem, name: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder="Price"
          value={String(newItem.price)}
          onChangeText={(text) => setNewItem({...newItem, price: Number(text)})}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.input}
          placeholder="Description"
          value={newItem.description}
          onChangeText={(text) => setNewItem({...newItem, description: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder="Category"
          value={newItem.category}
          onChangeText={(text) => setNewItem({...newItem, category: text})}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item._id || ''}
        renderItem={({item}) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>€{item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  itemDescription: {
    color: '#666',
    marginTop: 5,
  },
  itemCategory: {
    color: '#888',
    marginTop: 5,
  },
});