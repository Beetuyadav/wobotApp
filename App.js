import React, {Component} from 'react';
import Root from './src/Root'
import { pushNotifications } from './src/services/';

pushNotifications.configure();

export default class App extends Component {
  componentDidMount = () => {
    // pushNotifications.localNotification({title: 'Mera joota hai japani', message: 'Saar pe laal topi taaani'});
  }

  render() {
    return (
     <Root/>
    );
  }
}
