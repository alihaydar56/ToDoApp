import React, {useEffect, useState} from 'react';
import {Alert, FlatList, TouchableOpacity, View} from 'react-native';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/CButtonComponent';

const NewCartScreen = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addCartToDatabase = async () => {
    try {
      fetch('http://localhost:5000/api/card/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, desc}),
      }).then(res => {
        Alert.alert(
          'Successful!',
          title + ' is added to your task succesfully.',
          [{text: 'Ok', style: 'cancel', onPress: () => navigation.goBack()}],
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* customTextInput for task title */}
      <TextInputComponent
        placeholder="title"
        value={title}
        onChangeText={value => {
          setTitle(value);
        }}
        secure={false}
      />
      {/* customTextInput for task title */}
      <TextInputComponent
        placeholder="description"
        value={desc}
        onChangeText={value => {
          setDesc(value);
        }}
        secure={false}
      />

      {/* customButton for take action */}
      <ButtonComponent
        onPress={() => {
          addCartToDatabase();
        }}
        title="Add Cart"
        bgcolor="green"
        textColor="#FAFAFA"
      />
    </View>
  );
};
// styling for new cart screen headers
export const NewCartHeaderOption = ({route, navigation}) => {
  return {
    headerTitle: 'Create new cart',
    headerStyle: {
      backgroundColor: 'grey',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => <View></View>,
  };
};

export default NewCartScreen;
