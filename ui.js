import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

const Land = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    loadLists(); // Load lists on component mount
  }, []);

  const loadLists = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@lists');
      if (jsonValue !== null) {
        setLists(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading lists:', error);
    }
  };

  const saveLists = async (updatedLists) => {
    try {
      const jsonValue = JSON.stringify(updatedLists);
      await AsyncStorage.setItem('@lists', jsonValue);
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  };

  const handleCreateList = () => {
    if (listName.trim()) {
      const newList = { id: Date.now().toString(), name: listName };
      const updatedLists = [...lists, newList];
      setLists(updatedLists);
      saveLists(updatedLists); // Save updated lists
      setIsModalVisible(false);
      setListName("");
    }
  };

  const handleDeleteList = async (id) => {
    const updatedLists = lists.filter(list => list.id !== id);
    setLists(updatedLists);
    saveLists(updatedLists); // Save updated lists
  };

  const handlePressListItem = (listName) => {
    navigation.navigate('ListDetails', { listName });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePressListItem(item.name)}
          >
            <Text style={styles.listItemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Image style={styles.image} source={require("./assets/chesklist.png")} />
            <Text style={styles.emptyListText}>There are no lists created yet,Tap to create new one.</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Ionicons name="add-circle-sharp" size={60} color="white" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Create new list</Text>
          <Text style={{marginEnd:"auto",color:"black"}}>Title:</Text>
          <TextInput
            placeholder="Enter list name"
            style={styles.input}
            value={listName}
            onChangeText={setListName}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateList}>
              <Text style={styles.modalButton}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  listItemText: {
    fontSize: 18,
    color: "white",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 150,
    marginTop:"50%"
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 23,
    fontStyle: "normal",
    color: "darkorange",
    marginTop: 20,
    fontWeight:"400"
  },
  modal: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: "black",
    fontSize: 22,
    marginBottom: 30,
    marginEnd:'60%'
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "lightgrey",
    color: "skyblue",
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent:"space-around",
    alignItems:"center",
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 1,
    color: "skyblue",
    marginVertical:10,    
  },
});

export default Land;
