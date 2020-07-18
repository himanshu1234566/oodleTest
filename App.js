/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getListCall = this.getListCall.bind(this);
    this.GetListItem = this.GetListItem.bind(this);
    this.state = {
      JSONResult: '',
    };
  }
  componentDidMount() {
    this.getListCall();
  }
  getListCall() {
    var that = this;
    var url = 'https://jsonplaceholder.typicode.com/users';
    console.log('-----------url:' + url);
    fetch(url, {method: 'GET'})
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        that.setState({
          JSONResult: result,
        });

        console.log(result);
      })
      .catch(function (error) {
        console.log('-------- error ------- ' + error);
        alert('result:' + error);
      });
  }

  GetListItem(name) {
    Alert.alert(name);
  }

  ItemSeparatorLine = () => {
    return <View />;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.JSONResult}
          ItemSeparatorComponent={this.ItemSeparatorLine}
          renderItem={({item}) => (
            <View
              style={[
                styles.containerFlatlist,
                {
                  marginLeft: item.id % 2 === 0 ? 20 : 5,
                  marginRight: item.id % 2 != 0 ? 20 : 5,
                },
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.welcome, {fontWeight: 'bold'}]}>
                  {' '}
                  Name : {item.name}{' '}
                </Text>
                <Icon
                  name="delete"
                  size={20}
                  style={{marginRight: 10, marginTop: 5}}
                  color="red"
                />
              </View>

              <Text style={styles.welcome}> Email : {item.email} </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.welcome}>
                  Address : {item.address.street},{' '}
                </Text>

                <Text style={{fontSize: 11, marginTop: 5}}>
                  {' '}
                  {item.address.suite} ,
                </Text>
                <Text style={{fontSize: 11, marginTop: 5}}>
                  {' '}
                  {item.address.zipcode}{' '}
                </Text>
              </View>
              <Text style={styles.welcome}>Phone : {item.phone} </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 11,

    margin: 5,
  },

  containerFlatlist: {
    borderWidth: 1,
    backgroundColor: '#ECECEC',
    margin: 10,

    borderRadius: 9,
  },
});

export default App;
