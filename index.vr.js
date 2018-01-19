import React, { Component } from 'react';
import { View, Text, Pano, AppRegistry, asset } from 'react-vr';
import WeatherCard from './vr/components/WeatherCard';
import WindCloudObject from './vr/components/WindCloudObject';

const api_key = '4f7bbc539b832f98649a27802fb07f1c';

class WeatherSimulator extends Component {
  constructor() {
    super();

    this.state = {
      weatherObject: {
        name: '',
        main: {
          temp: 0
        },
        weather: [
          {description: ''}
        ],
        wind: {
          deg: 1,
          speed: 1
        }
      }
    }
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=${api_key}`, {
      method: 'GET'
    })
    .then(response => response.json())
    // .then(json => console.log('json', json));
    .then(json => this.setState({weatherObject: json}));
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Pano source={asset('lombard-vr.jpg')} />
        <WeatherCard weatherObject={this.state.weatherObject} />
        <WindCloudObject
          wind="{this.state.weatherObject.wind}"
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('WeatherSimulator', () => WeatherSimulator);
