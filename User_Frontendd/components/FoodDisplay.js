import {React,useContext} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StoreContext } from '../contexts/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  const renderItem = ({ item }) => {
    if (category === 'All' || category === item.category) {
      return (
        <FoodItem
          id={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top dishes near you</Text>
      <FlatList
        data={foodList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default FoodDisplay;