'use strict';

let React = require('react-native');
let { AppRegistry, Component, Text, View, StyleSheet } = React;
let moment = require('moment');

class ReactNativeClock extends Component {

  constructor() {
    super();
    this.state = {};
  }

  tick() {
    let [hours, minutes, seconds, today, date]  = moment().format('hh mm ss dddd MM/DD/YY').split(' ');
    this.setState({ hours, minutes, seconds, today, date });
  }

  componentDidMount() {
    this.interval = this.setInterval(this.tick.bind(this), 1000);
  }

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    this.clearInterval(this.interval);
  }

  render() {
    return (
      <View style={[styles.View, styles.application]}>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ffffff'
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
    height: 40,
  },

  main: {
    flex: 1,
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
