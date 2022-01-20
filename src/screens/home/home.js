import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useIsFocused} from '@react-navigation/native';
import styles from './style';

const Home = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [CartItems, setCartItems] = useState([]);

  // this will fetch all items from database to list them at screen when screen is loaded.
  useEffect(() => {
    if (isFocused) {
      getDatas();
    }
  }, [isFocused, refreshing]);

  // this will get items from database
  const getDatas = async () => {
    try {
      await fetch('http://localhost:5000/api/card/')
        .then(res => res.json())
        .then(data => {
          setCartItems(data.data);
          setFilteredCartItems(data.data);
        })
        .catch(err => console.log(err.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCartItems = item => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.flatlistContainer}
          onPress={() => {
            deleteCartItem(item.item);
          }}>
          <View style={styles.flatlistItemContainer}>
            <Text style={styles.flatlistItemTitle}>{item.item.title}</Text>
            <Text style={styles.flatlistItemDescription}>
              {item.item.description}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <Icon
            style={{margin: '10%'}}
            name="delete"
            onPress={() => {
              deleteCartItem(item.item);
            }}
          />
          <Icon
            name="update"
            onPress={() => {
              updateCartItem(item.item);
            }}
          />
        </View>
      </View>
    );
  };

  // this method is filter items when a text is wanted to search
  const searcFilterItem = text => {
    if (text) {
      const items = filteredCartItems.filter(
        item =>
          item.title.toLocaleUpperCase().includes(text.toLocaleUpperCase()) ||
          item.description
            .toLocaleUpperCase()
            .includes(text.toLocaleUpperCase()),
      );
      setFilteredCartItems(items);
      setSearch(text);
    } else {
      setFilteredCartItems(CartItems);
      setSearch(text);
    }
  };

  const deleteCartItem = selectedItem => {
    Alert.alert(
      'Delete ' + selectedItem.title,
      'Are u sure you want to delete ' + selectedItem.title,
      [
        {
          text: 'Yes',
          onPress: () => deleteItemFromDatabase(selectedItem),
          style: 'cancel',
        },
        {
          text: 'No',
          style: 'destructive',
        },
      ],
    );
  };

  const deleteItemFromDatabase = async selectedItem => {
    setRefreshing(true);
    try {
      await fetch(
        `http://localhost:5000/api/card/delete-item/${selectedItem._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success === true) {
            setRefreshing(false);
            Alert.alert('Successfull!', 'Successfully delete task.', [
              {text: 'Ok', style: 'cancel'},
            ]);
          } else {
            setRefreshing(false);
            Alert.alert('Error!', 'Failed to delete task.', [
              {text: 'Ok', style: 'cancel'},
            ]);
          }
        });
    } catch (error) {}
  };

  const updateCartItem = selectedItem => {
    Alert.alert(
      'Uptade ' + selectedItem.title,
      ' are u sure you want to update ' + selectedItem.title,
      [
        {
          text: 'Yes',
          onPress: () =>
            navigation.navigate('update-item-screen', {
              selectedItem: selectedItem,
            }),
          style: 'destructive',
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{padding: '5%'}}>
        {/* dynamic searchbar */}
        <SearchBar
          placeholder="search"
          value={search}
          onChangeText={text => {
            searcFilterItem(text);
          }}
        />
      </View>

      {/* we used flatlist to render oour cartItems  */}
      <FlatList
        initialNumToRender={4}
        data={filteredCartItems}
        keyExtractor={item => item._id}
        renderItem={renderCartItems}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getDatas}></RefreshControl>
        }
      />
    </View>
  );
};

export const HomeHeaderOption = ({route, navigation}) => {
  return {
    headerTitle: 'Anaysayfa',
    headerStyle: {
      backgroundColor: 'grey',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('add-new-cart');
        }}>
        <Icon name="add" color="red" size={33} />
      </TouchableOpacity>
    ),
  };
};

export default Home;
