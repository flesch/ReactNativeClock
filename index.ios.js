'use strict';

let React = require('react-native');
let { AppRegistry, Component, Text, View, StyleSheet, NativeModules, PanResponder } = React;
let Dimensions = require('Dimensions')
let moment = require('moment');

let { Brightness } = NativeModules;

class ReactNativeClock extends Component {

  constructor() {
    super();
    this.state = {
      viewportHeight: Dimensions.get('window').height
    };
    this.panResponder = {};
  }

  tick() {
    let [hours, minutes, seconds, today, date]  = moment().format('hh mm ss dddd MM/DD/YY').split(' ');
    this.setState({ hours, minutes, seconds, today, date });
  }

  componentDidMount() {
    this.interval = this.setInterval(this.tick.bind(this), 1000);
    Brightness.getBrightness((err, brightness) => {
      this.setState({ brightness });
    });
  }

  componentWillMount() {
    this.tick();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: this.handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this.handlePanResponderEnd.bind(this)
    });
  }

  componentWillUnmount() {
    this.clearInterval(this.interval);
  }

  onStartShouldSetPanResponder(e, gestureState) {
    Brightness.getBrightness((err, brightness) => {
      this.setState({ brightness });
    });
  }

  handlePanResponderMove(e, gestureState) {
    let percent = (gestureState.dy / this.state.viewportHeight) * -1;
    let brightness = this.state.brightness + percent;
    Brightness.setBrightness(brightness);
  }

  handlePanResponderEnd(e, gestureState) {
    Brightness.getBrightness((err, brightness) => {
      this.setState({ brightness });
    });
  }

  render() {
    return (
      <View style={[styles.View, styles.application]} {...this.panResponder.panHandlers}>
        <View style={[styles.View, styles.header]}>
          <Text style={styles.Text}>{this.state.today}</Text>
        </View>
        <View style={[styles.View, styles.main]}>
          <Text style={[styles.Text, styles.mainText]}>
            <Text>{this.state.hours}</Text>
            <Text style={styles.separatorText}>:</Text>
            <Text>{this.state.minutes}</Text>
            <Text style={styles.separatorText}>:</Text>
            <Text>{this.state.seconds}</Text>
          </Text>
        </View>
        <View style={[styles.View, styles.footer]}>
          <Text style={styles.Text}>{this.state.date}</Text>
        </View>
      </View>
    );
  }

}

Object.assign(ReactNativeClock.prototype, require('react-timer-mixin'));

let styles = StyleSheet.create({

  View: {
    // borderWidth: 1,
    // borderColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  Text: {
    fontFamily: 'Roboto-Thin',
    fontSize: 18,
    color: '#ffffff'
  },

  application: {
    flex: 1,
    backgroundColor: '#2F1847'
  },

  header: {
    height: 40
  },

  main: {
    flex: 1
  },

  mainText: {
    fontSize: 80
  },

  separatorText: {
    color: '#b794db',
    fontSize: 60
  },

  footer: {
    height: 40
  }

});

AppRegistry.registerComponent('ReactNativeClock', () => ReactNativeClock);
