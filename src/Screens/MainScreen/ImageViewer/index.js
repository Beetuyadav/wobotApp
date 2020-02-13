import React from 'react';
import { WebView, ActivityIndicator,TouchableOpacity, Image, } from 'react-native';
import styles from './Styles';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../../Config/Colors';
import Toast from 'react-native-simple-toast';

var tasktype= '';
export default class Tasks extends React.Component{
    
  state={
    usertype: '',
    Jobs: [],
    searchTerm: '',
    image:'',
  }
  componentWillMount = () =>{
    const urifile = this.props.navigation.getParam('file');
    this.setState({
      image:urifile
    })
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Image',
    drawerLabel: 'Image',
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: (
      <TouchableOpacity onPress={()=>navigation.navigate('TaskDetail')}>
      <Image style={styles.backicon} source={require('../../../Images/back.png')}></Image>
      </TouchableOpacity>
    ),
  })
    
  _loadingView = () => <ActivityIndicator size="large" style={{ flex: 1 }} />;

 render(){
    return(
      <WebView
      source={{ uri: `${this.props.navigation.state.params.url}` }}
        style={{ backgroundColor: '#fff', flex: 1, }}
        resizeMode="center"
        renderLoading={() => this._loadingView()}
        // startInLoadingState
        onNavigationStateChange={event => {
          // remove this code
          this.props = event.action;
        }}
      />
       
    )
}
}

