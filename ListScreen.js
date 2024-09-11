import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Image, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ListDetails = ({ route }) => {
  const { listName } = route.params;
  const listKey = `shoppingItems_${listName}`; // Unique key for each list
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Load data from AsyncStorage when the component mounts
    retrieveShoppingItems();
  }, []);

  useEffect(() => {
    // Save data to AsyncStorage whenever shoppingItems change
    storeShoppingItems();
  }, [shoppingItems]);

  const retrieveShoppingItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(listKey);
      if (storedItems !== null) {
        setShoppingItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error retrieving shopping items:', error);
    }
  };

  const storeShoppingItems = async () => {
    try {
      await AsyncStorage.setItem(listKey, JSON.stringify(shoppingItems));
    } catch (error) {
      console.error('Error storing shopping items:', error);
    }
  };

  const handleSave = () => {
    const newText = textInputValue.trim();
    if (newText) {
      setShoppingItems(prevItems => [...prevItems, { text: newText, completed: false }]);
      setTextInputValue('');
    }
  };

  const handleInputChange = (value) => {
    setTextInputValue(value);
    const newSuggestions = ['Apple', 'Banana', 'Orange', "Eggs", "Bananas", "Apples", "Rice", "Pasta", "Chicken breasts", "Ground beef", "Cereal", "Butter", "Cheese", "Yogurt", "Spinach", "Tomatoes", "Potatoes", "Onions", "Carrots", "Bell peppers", "Broccoli", "Cauliflower", "Lettuce", "Avocados", "Strawberries", "Blueberries", "Oranges", "Lemons", 
    "Garlic", "Olive oil", "Canola oil", "Vinegar", "Sugar", "Flour", "Salt", "Pepper", "Canned tomatoes", "Canned beans", "Canned corn", "Peanut butter", "Jam/jelly", "Honey", "Oatmeal", "Nuts", "Dried fruits", "Chicken broth", "Beef broth", "Vegetable broth", "Frozen vegetables", "Frozen fruits", "Frozen pizza", "Frozen meals", "Ice cream", "Frozen waffles",
     "Frozen chicken nuggets", "Frozen fish fillets", "Frozen shrimp", "Frozen fries", "Coffee", "Tea", "Juice", "Soda", "Bottled water", "Energy drinks", "Wine", "Beer", "Liquor", "Bread crumbs", "Tortilla chips", "Salsa", "Guacamole", "Hummus", "Crackers", "Cookies", "Chocolate", "Snack bars", "Popcorn", "Cereal bars", "Pretzels", "Salad dressing", "Mayonnaise",
      "Mustard", "Ketchup", "Worcestershire sauce", "Soy sauce", "Hot sauce", "Barbecue sauce", "Marinara sauce", "Pesto sauce", "Maple syrup", "Pancake mix",
     "Baking powder", "Baking soda", "Chocolate chips", "Vanilla extract", "Condensed milk", "Evaporated milk", "Instant coffee", "Instant noodles", "Rice cakes",
      "Protein powder", "Almond milk", "Coconut milk", "Rice vinegar", "Apple cider vinegar", "Balsamic vinegar", "Red wine vinegar", "White wine vinegar", "Brown sugar", "Confectioner's sugar",
      "Apple", "Banana", "Orange", "Grapes", "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Pineapple", "Kiwi", "Pomegranate", "Watermelon", "Cantaloupe", "Honeydew", "Grapefruit", "Tangerine", "Clementine", "Apricot", "Fig", "Date", "Avocado", "Coconut", "Peach", "Plum", "Pear", "Cherry", "Lemon", "Lime", "Mango", "Papaya", "Passion fruit", "Dragon fruit", "Lychee", "Guava", "Star fruit",
       "Kiwano", "Persimmon", "Horned melon", "Breadfruit", "Rambutan", "Longan", "Mangosteen", "Durian", "Jackfruit", "Chayote", "Okra", "Bok choy", "Napa cabbage", "Brussels sprouts", "Artichoke", "Asparagus", "Broccoli", "Cauliflower", "Celery", "Cucumber", "Zucchini", "Yellow squash", "Bell pepper", "Jalapeno", "Serrano", "Anaheim", "Poblano", "Habanero", "Scotch bonnet", "Thai chili", "Cayenne pepper", 
       "Chili pepper", "Tomatillo", "Kale", "Spinach", "Swiss chard", "Collard greens", "Mustard greens", "Turnip greens", "Beet greens", "Watercress", "Arugula", "Iceberg lettuce", "Romaine lettuce", "Butter lettuce", "Bibb lettuce", "Radicchio", "Endive", "Escarole", "Frisee", "Radish", "Daikon", "Rutabaga", "Turnip", "Parsnip", "Jicama", "Kohlrabi", "Cabbage", "Red cabbage", "White cabbage", "Green cabbage", 
       "Savoy cabbage", "Bok choy", "Chinese cabbage", "Swiss chard", "Collard greens", "Mustard greens", "Turnip greens", "Beet greens", "Watercress", "Spinach", "Kale", "Arugula", "Iceberg lettuce", "Romaine lettuce", "Butter lettuce", "Bibb lettuce", "Radicchio", "Endive", "Escarole", "Frisee", "Radish", "Daikon", "Rutabaga", "Turnip", "Parsnip", "Jicama", "Kohlrabi", "Cabbage", "Red cabbage", "White cabbage",
        "Green cabbage", "Savoy cabbage", "Brussels sprouts", "Bok choy", "Chinese cabbage", "Napa cabbage", "Broccoli", "Cauliflower", "Bell pepper", "Red bell pepper", "Green bell pepper", "Yellow bell pepper", "Orange bell pepper", "Purple bell pepper", "Jalapeno", "Serrano", "Anaheim", "Poblano", "Habanero", "Scotch bonnet", "Thai chili", "Cayenne pepper", "Chili pepper", "Tomatillo", "Okra", "Eggplant", "Tomato", "Cherry tomato", "Grape tomato", "Roma tomato", "Plum tomato", "Beefsteak tomato", "Heirloom tomato", "Green tomato", "Red tomato", "Yellow tomato", "Orange tomato", "Purple tomato", "White tomato", "Black tomato", "Brown tomato", "Zucchini", "Yellow squash", "Butternut squash", "Acorn squash", "Spaghetti squash", "Delicata squash", "Kabocha squash", "Hubbard squash", "Buttercup squash", "Sugar pumpkin", "Pie pumpkin", "Jack-o'-lantern pumpkin", "Cinderella pumpkin", "White pumpkin", "Blue pumpkin", "Green pumpkin", "Striped pumpkin", "Fairy tale pumpkin", "Red kuri squash", "Green kuri squash", "Banana squash", "Turban squash", "Pattypan squash", "Sunburst squash", "Crookneck squash", "Scallop squash", "Globe squash", "Round squash", "Flat squash", "Long squash", "Cucumber", "English cucumber", "Persian cucumber", "Pickling cucumber", "Armenian cucumber", "Lemon cucumber", "Apple cucumber", "Orange cucumber", "Asian cucumber", "Korean cucumber", "European cucumber", "Snake cucumber", "West Indian gherkin", "Green onion", "Red onion", "White onion", "Yellow onion", "Shallot", "Pearl onion", "Cipollini onion", "Scallion", "Chive", "Leek", "Garlic", "Black garlic", "Elephant garlic", "Green garlic", "Ginger", "Turmeric", "Horseradish", "Wasabi", "Fennel", "Celery", "Rhubarb", "Bamboo shoots", "Bean sprouts", "Alfalfa sprouts", "Broccoli sprouts", "Lentil sprouts", "Mung bean sprouts", "Radish sprouts", "Soybean sprouts", "Sunflower sprouts", "Wheatgrass", "Microgreens", "Baby spinach", "Baby kale", "Baby arugula", "Baby chard", "Baby lettuce", "Baby mustard greens", "Baby beet greens", "Baby turnip greens", "Baby collard greens", "Baby mizuna", "Baby tatsoi", "Baby watercress", "Baby frisee", "Baby radicchio", "Baby endive", "Baby escarole", "Baby red mustard greens", "Baby green mustard greens", "Baby kale sprouts", "Baby collard green sprouts", "Baby radish sprouts", "Baby beet sprouts", "Baby chia sprouts", "Baby flax sprouts", "Baby sunflower sprouts"]
    .filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(newSuggestions);
  };

 const handleSuggestionPress = (item) => {
  const newText = item.trim();
  if (newText) {
    setShoppingItems(prevItems => [...prevItems, { text: newText, completed: false }]);
    setTextInputValue('');
    setSuggestions([]); // Clear suggestions after selecting one
  }
};


  const handleItemDelete = (index) => {
   
    const newItems = [...shoppingItems];
    newItems.splice(index, 1);
    setShoppingItems(newItems);
  };

  const handleSharePress = async () => {
    try {
      if (shoppingItems.length === 0) {
        console.log("Shopping list is empty. Nothing to share.");
        return;
      }
      const sharedMessage = shoppingItems.map(item => item.text).join('\n');
      console.log("Shopping Items:", shoppingItems);

      await Share.share({
        message: sharedMessage,
      });
    } catch (error) {
      console.error('Error sharing list:', error);
    }
  };
  

  const toggleComplete = (index) => {
    const newItems = [...shoppingItems];
    newItems[index].completed = !newItems[index].completed;
    setShoppingItems(newItems);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSharePress}>
          <Ionicons style={styles.shareIcon} name="share-social-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.savedTextllist}>{listName}</Text>
      <View style={[styles.iconcentre, shoppingItems.length > 0 ? { display: 'none' } : null]}>
        <Image style={{ height: 300, width: 300 }} source={require('./assets/empty.png')} />
        <Text style={{ fontSize: 16 }}>List is empty, Tap to make new one</Text>
      </View>
      <FlatList
        data={shoppingItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleComplete(index)}>
            <View style={[styles.shoppingItem, item.completed ? styles.completedItem : null]}>
              <Text style={[item.completed ? styles.completedText : null]}>{item.text}</Text>
              <TouchableOpacity onPress={() => handleItemDelete(index)}>
                <Ionicons name="close-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons style={styles.icon2} name="add-circle-sharp" size={60} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={textInputValue}
              onChangeText={handleInputChange}
              placeholder="Type something to add to the list..."
              autoCorrect={false}
              autoCapitalize="none"
            />
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleSave} style={styles.btnSave}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    height: 40
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnSave: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'orange',
    elevation: 10,
  },
  btnCancel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'orange',
    elevation: 10,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 500,
  },
  suggestionText: {
    fontSize: 16,
  },
  savedTextllist: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 40,
    fontStyle: "italic"
  },
  savedText: {
    padding: 10,
    fontSize: 18,
    paddingLeft: 100,
  },
  icon2: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  shareIcon: {
    marginRight: 20,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedItem: {
    backgroundColor: '#f0f0f0', // Example background color for completed items
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999', // Example color for completed items
  },
  iconcentre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 100
  }
});

export default ListDetails;
