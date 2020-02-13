import React, { Component } from 'react';
import styles from './Styles';
import { View, Text, AsyncStorage, TouchableOpacity, FlatList, Image, NetInfo ,WebView,ActivityIndicator,SafeAreaView} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';

 export default class TickitingScreen extends Component {
  //  class TickitingScreen extends Component {
  state={
    userId: '',
    weblink:'',
  }

  constructor(props){
    super(props);
}
componentWillMount = async() =>{
  const appid= await  AsyncStorage.getItem('WTappId')
       this.setState({
        userId: appid   });
          const reportlink = 'https://app.wobot.in/admin/audit-new-graph-page.php?appid=';
          const reportid = reportlink + this.state.userId;
        this.setState({
          weblink: reportid   });
}

  backHome=()=> {
     this.props.navigation.navigate('Home');
   }
   
  _loadingView = () => <ActivityIndicator size="large" style={{ flex: 1 }} />;

  render() {
     
    return (
      <SafeAreaView style={{
        flex: 1,
      }}>
      <View style={styles.container}>
      <View style={styles.toolbar}>
      <View style={styles.sidebarview}>
      <TouchableOpacity onPress={this.backHome}>
      <Image style={styles.sidebaricon} source={require('../../../Images/back.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={styles.tooltextview}>
      <Text style={styles.tooltext}>Report</Text>
      </View>
    </View>
      <WebView
      source={{ uri: this.state.weblink }}
        style={{ backgroundColor: '#fff', flex: 1 }}
        renderLoading={() => this._loadingView()}
        startInLoadingState
      />
      </View>
      </SafeAreaView>
    );
  }
}
