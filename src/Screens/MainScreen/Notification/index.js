import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, FlatList, Image, NetInfo,SafeAreaView } from 'react-native';
import styles from './Styles';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../../Config/Colors';
import { fetchNotification, markNotification } from '../../../Redux/Actions/Notification';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loader from '../../../Components/Loader';
import Toast from 'react-native-simple-toast';
let regex = /(<([^>]+)>)/ig;

class Notification extends React.Component{
    
  state={
    usertype: '',
    notification: [],
    clicked: '',
  }

  componentWillMount = () => {
    if (NetInfo.isConnected) {
      this.props.fetchNotification();
     } else {
      Toast.show('Please check your connectivity') 
     }
  }

  componentWillReceiveProps = (nextprops)=>{
    console.log(nextprops)
    try {

      if(nextprops.Response.Notification.isFetching == false){

          if (this.state.clicked != 'Mark') {
            
            if (nextprops.Response.Notification.response.data.status == 1) {
              const array=nextprops.Response.Notification.response.data.notifiacations;
               if(array.length == 0){
                Toast.show('No notifications to show.')
               }else{
              var notifarray=[];
              for (var i=0; i< array.length; i++) {
                  notifarray.push(array[i])
                 }
                this.setState({
                  notification: notifarray
                })
                Toast.show(nextprops.Response.Notification.response.data.message)
               }
              } else {
                Toast.show(nextprops.Response.Notification.response.data.message)
              }
          } else {

            if(nextprops.Markresponse != null ){
              if (nextprops.Markresponse.data.status == 1) {
    
                Toast.show(nextprops.Markresponse.data.message)
                } else {
                Toast.show(nextprops.Markresponse.data.message)
                }
             }
          }

        }
      
    } catch (error) {
      Toast.show('Error '+error)
    }
   }

   markAll = () =>{
     if (this.state.notification.length == 0) {
       Toast.show('No notification to mark')
     } else {
      if (NetInfo.isConnected) {
        this.setState({clicked: 'Mark'})
        this.props.markNotification();
       } else {
        Toast.show('Please check your connectivity') 
       }
     }
    
   }

  backHome=()=> {
    this.props.navigation.navigate('Home')
   }

 render(){
      if(this.props.Response.Notification.isFetching){
        return(
            <Loader/>
        )
    }
    return(
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
        <Text style={styles.tooltext}>Notifications</Text>
        </View>
        <TouchableOpacity style={styles.markview} onPress={this.markAll}>
        <Text style={styles.marktext}>Mark All Read</Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={this.state.notification}
        keyExtractor={item=> item.id}
        renderItem={({item})=>
        <TouchableOpacity onPress={()=> null}>
       <View style={styles.itemview}>
       <Text style={styles.itemheader}>{item.message.replace(regex, '')}</Text>
       <Text style={styles.itemsubheader}>{}</Text>
       <View style={styles.bottomline}></View>
       </View>
       </TouchableOpacity>
         }
       />
        </View>
        </SafeAreaView>

    )
}
}

Notification.propTypes ={
  fetchNotification: propTypes.func.isRequired,
  markNotification: propTypes.func.isRequired,
  Response: propTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return{
  Response: state,
  Markresponse: state.Notification.markres
 }
}

const dispatchStateToProps = {fetchNotification, markNotification}

export default connect(mapStateToProps,dispatchStateToProps)(Notification)