import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/CButtonComponent';

const UpdateCartScreen = ({route, navigation}) => {
  const {selectedItem} = route.params;// get item that want to to edit
  const [title, setTitle] = useState(selectedItem.title.toString()); 
  const [desc, setDesc] = useState(selectedItem.description.toString());

  // this will update the card with taken parameter from inputs and if updateded is successfull then it will navigate to home page
  const UpdateCart = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/card/update-item/${selectedItem._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({data: {title: title, description: desc}}),
        },
      )
        .then(res => res.json())
        .then(data => {
          Alert.alert('Successfull!', 'Successfully updated task.', [
            {text: 'Ok', style: 'cancel', onPress: () => navigation.goBack()},
          ]);
        })
        .catch(err => console.log(err.message));
    } catch (error) {}
    console.log(title, desc);
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
      />
      {/* customTextInput for task description */}
      <TextInputComponent
        placeholder="description"
        value={desc}
        onChangeText={value => {
          setDesc(value);
        }}
      />

      {/* customButton for take action */}
      <ButtonComponent
        onPress={() => {
          UpdateCart();
        }}
        title="Update Cart"
        bgcolor="green"
        textColor="#FAFAFA"
      />
    </View>
  );
};
// styling for edit cart screen headers
export const EditCartHeaderOption = ({route, navigation}) => {
  return {
    headerTitle: 'Edit cart',
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

export default UpdateCartScreen;
