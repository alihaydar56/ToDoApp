import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    padding: '5%',
    margin: '5%',
    width: '70%',

    borderRadius: 30,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  flatlistItemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  flatlistItemTitle: {
    color: 'black',
    margin: '2%',
    fontSize: 15,
  },
  flatlistItemDescription: {
    color: 'black',
    margin: '2%',
    fontSize: 15,
  },
  iconsContainer: {
    width: '20%',
    alignSelf: 'flex-end',
    marginBottom: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default styles;
