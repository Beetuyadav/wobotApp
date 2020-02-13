import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, Dimensions, NetInfo,SafeAreaView } from 'react-native';
import styles from './Styles';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../../Config/Colors';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { jobCount } from '../../../Redux/Actions/Job';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loader from '../../../Components/Loader';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";


class Home extends React.Component{
    
  state={
    usertype: '',
    isModalVisible: false,
    ModalVisible: false,
    totaljob: '',
    openjob: '',
    closedjob: ''
  }

  componentWillMount = () => {
    if (NetInfo.isConnected) {
      this.props.jobCount();
     } else {
      Toast.show('Please check your connectivity') 
     }
  
  }

  componentWillReceiveProps = (nextprops)=>{
    console.log(nextprops)
    try {

      if(nextprops.Response.Job.isFetching == false){
        if (nextprops.Response.Job.response.data.status == 1) {
           
          this.setState({
            totaljob: nextprops.Response.Job.response.data.counts.total,
            openjob: nextprops.Response.Job.response.data.counts.open,
            closedjob: nextprops.Response.Job.response.data.counts.closed,
          })
               
        } else {
           Toast.show(nextprops.Response.Job.response.data.message)
        }
        }
      
    } catch (error) {
      Toast.show('Error '+error)
    }
   }

  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModallogout = () =>{
  this.setState({ 
    ModalVisible: !this.state.ModalVisible,
    isModalVisible: false
   });
   }
     
      addTicket = () => {
        this.props.navigation.navigate('AddTicket')
      }
      getnotification = () => {
        this.props.navigation.navigate('Notification')
      }
      getOpendTask = () => {
        this.props.navigation.navigate('Task', { taskType: 0});
        // AsyncStorage.setItem('TaskType','Open')
      }
      getClosedTask = () => {
        this.props.navigation.navigate('Task', { taskType: 1});
        // AsyncStorage.setItem('TaskType','Closed')
      }
      getlogout = () => {
        this.setState({ 
          ModalVisible: !this.state.ModalVisible,
         });
        setTimeout(() => {
          AsyncStorage.clear();
          this.props.navigation.navigate('Login')  
        }, 100);
       
      }
 render(){
   const { openjob, closedjob } = this.state;
    if(this.props.Response.Job.isFetching){
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
          <TouchableOpacity onPress={()=> this.props.navigation.toggleDrawer()}>
          <Image style={styles.sidebaricon} source={require('../../../Images/sidebar.png')}></Image>
          </TouchableOpacity>
          </View>
          <Image style={styles.smalllogo} source={require('../../../Images/logo.png')}></Image>
          <TouchableOpacity style={styles.bellview} onPress={this.getnotification}>
          <Image style={styles.bellicon} source={require('../../../Images/bell.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dotview} onPress={this._toggleModal}>
          <Image style={styles.dots} source={require('../../../Images/dots.png')}></Image>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible} 
        onBackdropPress={() => this.setState({ isModalVisible: false })}
        backdropOpacity={0}
        style={styles.modal}>
        <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ChangePassword')}>
            <View style={styles.itemsubview}>
              <Image source={require('../../../Images/key.png')}></Image>
              <Text style={styles.modaltext}>Change Password</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this._toggleModallogout}>
          <View style={[styles.itemsubview,{marginTop: 20}]}>
            <Image source={require('../../../Images/logout.png')}></Image>
            <Text style={styles.modaltext}>Logout</Text>
          </View>
          </TouchableOpacity>
        </View>
      </Modal>
        <TouchableOpacity  onPress={this.getOpendTask}>
       <View style={styles.itemview}>
        <View style={styles.openview}>
        <Text style={styles.itemsubheader}>Open</Text>
        <Image style={styles.lockicon} source={require('../../../Images/open-lock.png')}></Image>
        </View>
        <View style={styles.openviewno}>
        <View style={styles.nocircle}>
        <View style={styles.nocirclewhite}>
        <Text style={styles.itemheader}>{openjob}</Text>
        </View>
        </View>
        </View>
       </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={this.getClosedTask}>
       <View style={styles.itemview}>
        <View style={styles.closedview}>
        <Text style={styles.itemsubheader}>Closed</Text>
        <Image style={styles.lockicon} source={require('../../../Images/close-lock.png')}></Image>
        </View>
        <View style={styles.closedviewno}>
        <View style={styles.nocircle}>
        <View style={styles.nocirclewhite}>
        <Text style={styles.itemheader}>{closedjob}</Text>
        </View>
        </View>
        </View>
       </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.addiconview} onPress={this.addTicket}>
       <Image source={require('../../../Images/add.png')}></Image>
       </TouchableOpacity>

       <Dialog visible={this.state.ModalVisible} 
       dialogStyle={{borderRadius: 2,marginHorizontal: 30, padding: 10}}>
        <View>
        <Text style={styles.logoutmodaltext}>Do you want to logout?</Text>
        <View style={[styles.itemsubview,{marginTop: 10,marginLeft: 130}]}>
        <TouchableOpacity onPress={this._toggleModallogout}>
              <Text style={styles.modallogouttext}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getlogout}>
            <Text style={[styles.modallogouttext,{marginLeft: 10}]}>Yes</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Dialog>
        </View>
        </SafeAreaView>

    )
}
}

Home.propTypes ={
  jobCount: propTypes.func.isRequired,
  Response: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return{
  Response: state
 }
}

const dispatchStateToProps = {jobCount}

export default connect(mapStateToProps,dispatchStateToProps)(Home)
