import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'


var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Swiper style={styles.wrapper} nextButton={<Text>&gt;</Text>} prevButton={<Text>&lt;</Text>} showsButtons>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
            <Text style={styles.text}>And simple</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}
