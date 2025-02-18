import {React,useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StoreContext } from '../contexts/StoreContext';
import { assets } from '../assets/frontend_assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => addToCart(id)}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: `${url}/images/${image}` }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <View style={styles.nameRating}>
          <Text style={styles.name}>{name}</Text>
          <Image
            source={assets.ratingStars}
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '48%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageContainer: {
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  nameRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  rating: {
    width: 70,
    height: 15,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 12,
    color: '#676767',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: 'tomato',
  },
});

export default FoodItem;