import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { StoreContext } from '../contexts/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menuList = [] } = useContext(StoreContext);  // ✅ Default to an empty array

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore our menu</Text>
      <Text style={styles.text}>
        Choose from a diverse menu featuring a delectable array of dishes.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuList.length > 0 ? (  // ✅ Check if menuList is empty before mapping
          menuList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setCategory(prev => (prev === item.menuName ? 'All' : item.menuName))
              }
              style={[
                styles.itemContainer,
                category === item.menuName && styles.active,
              ]}
            >
              <Image source={{ uri: item.menuImage }} style={styles.image} />
              <Text style={styles.itemText}>{item.menuName}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading menu...</Text>  // ✅ Show this when menuList is empty
        )}
      </ScrollView>

      <View style={styles.hr} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 30,
  },
  active: {
    borderColor: 'tomato',
    borderWidth: 2,
    padding: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemText: {
    marginTop: 10,
    fontSize: 16,
    color: '#747474',
  },
  hr: {
    height: 2,
    backgroundColor: '#e2e2e2',
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ExploreMenu;
