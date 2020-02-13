import React from 'react';
import { View, Text, Image, AsyncStorage, TextInput, ScrollView, TouchableOpacity, StyleSheet, NetInfo, Platform } from 'react-native';
import styles from './Styles';
import Colors from '../../../Config/Colors';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from '../../../Components/picker';
import Loader from '../../../Components/Loader';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';
import { pushNotifications } from '../../../services/';


export default class AddTicket extends React.Component{
    state={
        jobheading: '',
        region: '',
        city: '',
        issues: '',
        subissues: '',
        remark: '',
        items: [

        ],
        regionarray: [],
        issuearray: [],
        cityarray: [],
        subissuearray: [],
        citydummyarray: [],
        subissuedummyarray: [],
        isFetching: false,
        isfileselected: false,
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Add Ticket',
        drawerLabel: 'Add Ticket',
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerLeft: (
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Image style={styles.backicon} source={require('../../../Images/back.png')}></Image>
          </TouchableOpacity>
        ),
      })
   
    addTickets = async() =>{
        const {jobheading, region, city, issues, subissues, remark} = this.state;
        if (jobheading == '' || region == '' || city == '' || issues == '' || subissues == '' ) {
                Toast.show('All field  mandatory', Toast.SHORT);
        }else {
            console.log('jobheading : '+jobheading)
            console.log('region : '+region)
            console.log('city : '+city)
            console.log('issues : '+issues)
            console.log('subissues : '+subissues)
            if (NetInfo.isConnected) {
                const WTappId= await AsyncStorage.getItem('WTappId')
                const WTauthKey= await AsyncStorage.getItem('WTauthKey')
                console.log('WTappId : '+WTappId)
                console.log('WTauthKey : '+WTauthKey)
                try {
                  this.setState({ isFetching: true})
                    const url=SERVER_URL;
                  const data = await axios({
                    method: 'POST',
                    url,
                    headers:{'Content-Type': 'application/json'},
                    data:{"activity_title":jobheading,"region":region,"city":city,"issue":issues,"sub_issue":subissues,
                    "action":"addTicketingJob","room_type":"3","type_id":"2","remark":remark,"appId": WTappId,"authKey": WTauthKey}
                    }) ;
                    this.setState({ isFetching: false})
                    console.log(data)
                    if (data.data.status == 1) {
                        // Toast.show(data.data.message)
                        pushNotifications.localNotification({message: 'Job added Successfully'})
                        this.props.navigation.navigate('Home')
                    } else {
                        Toast.show(data.data.message) 
                     }
                 }catch (error) {
                    Toast.show('Ticket Error : '+ error)
                  }
               } else {
                Toast.show('Please check your connectivity') 
               }
        }
    }

    componentWillMount = async () => {
        var regionarry=[];
        var cityarry=[];
        var issuearry=[];
        var subissuearry=[];

        const WTappId= await AsyncStorage.getItem('WTappId')
        const WTauthKey= await AsyncStorage.getItem('WTauthKey')
        const url=SERVER_URL;

        try {
             this.setState({ isFetching: true})
            const data = await axios({
                method: 'POST',
                url,
                headers:{'Content-Type': 'application/json'},
                data:{"action":"fetchTicketingRegions","appId": WTappId,"authKey": WTauthKey}
            }) ;
            this.setState({ isFetching: false})
                console.log(data)
                if (data.data.status == 1) {
                    
                    const array= data.data.regions
                    for(var i=0; i<array.length; i++){
                        regionarry.push({label: array[i].name, value: array[i].id})
                    }

                } else { Toast.show(data.data.message) }
           }catch (error) {  Toast.show('Region Error : '+ error) }

           try {
            this.setState({ isFetching: true})
            const data = await axios({
                method: 'POST',
                url,
                headers:{'Content-Type': 'application/json'},
                data:{"action":"fetchTicketingCities","appId": WTappId,"authKey": WTauthKey}
            }) ;
            this.setState({ isFetching: false})
                console.log(data)
                if (data.data.status == 1) {
                    
                    cityarry= data.data.cities

                } else { Toast.show(data.data.message) }
           }catch (error) {  Toast.show('City Error : '+ error) }

           try {
            this.setState({ isFetching: true})
            const data = await axios({
                method: 'POST',
                url,
                headers:{'Content-Type': 'application/json'},
                data:{"action":"fetchTicketingIssues","appId": WTappId,"authKey": WTauthKey}
            }) ;
            this.setState({ isFetching: false})
                console.log(data)
                if (data.data.status == 1) {
                    
                    const array= data.data.issues
                    for(var i=0; i<array.length; i++){
                        issuearry.push({label: array[i].name, value: array[i].id})
                    }

                } else { Toast.show(data.data.message) }
           }catch (error) {  Toast.show('Issue Error : '+ error) }

           try {
            this.setState({ isFetching: true})
            const data = await axios({
                method: 'POST',
                url,
                headers:{'Content-Type': 'application/json'},
                data:{"action":"fetchTicketingSubIssues","appId": WTappId,"authKey": WTauthKey}
            }) ;
            this.setState({ isFetching: false})
                console.log(data)
                if (data.data.status == 1) {
                    
                    subissuearry= data.data.issues

                } else { Toast.show(data.data.message) }
           }catch (error) {  Toast.show('Subissues Error : '+ error) }

           this.setState({
            regionarray: regionarry,
            issuearray: issuearry,
            citydummyarray: cityarry,
            subissuedummyarray: subissuearry,
        })
      }


       addAttechment = () => {
           
          DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },(error,res) => {
              if(res != null){
                console.log(res.uri);
                this.setState({
                    isfileselected: true,
                    
                });
              }
          });
       }

       getCity = (value) => {
        const { citydummyarray } =this.state;
        var cityarry=[];
           if (value == null) {
               
           } else {
            for(var i=0; i<citydummyarray.length; i++){
                if (value == citydummyarray[i].parent_id) {
                cityarry.push({label: citydummyarray[i].name, value: citydummyarray[i].id})
                } 
              }  

              this.setState({
                region: value,
                cityarray: cityarry
            });

          }
       
       }
    getSubIssues = (value) => {
        const { subissuedummyarray } =this.state;
        var subissuearry=[];
        if (value == null) {
               
        } else {
            
            for(var i=0; i<subissuedummyarray.length; i++){
                if(subissuedummyarray[i].issue_id == value){
                subissuearry.push({label: subissuedummyarray[i].name, value: subissuedummyarray[i].id})
                }
            }

            this.setState({
                issues: value,
                subissuearray: subissuearry
            });
        }
    }  

    renderText= () => {
     if (this.state.isfileselected) {
         return(
            <Text style={{marginLeft: 20, marginTop: 5}}>File is selected</Text>
         )
     } else {
         return null;
     }
    }
render(){
    if(this.state.isFetching){
        return(
            <Loader/>
        )
    }
    return(
        
        <View style={styles.container}>
        <ScrollView>
        <View style={styles.mainview}>

        <TextInput 
        placeholder='Job Heading' 
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=>this.setState({jobheading: text})}
        style={styles.textinput}></TextInput>
        
        <View style={styles.pickerview}>
        <View style={{width: '49%'}}>
            <RNPickerSelect
            placeholder={{
                label: 'Select Region',
                value: null,
            }}
            items={this.state.regionarray}
            underline={Colors.primary}
            onValueChange={(value) => {this.getCity(value)}}
            placeholderTextColor={Colors.primary}
            onUpArrow={() => {
                this.inputRefs.name.focus();
            }}
            onDownArrow={() => {
                this.inputRefs.picker2.togglePicker();
            }}
            value={this.state.region}
        />
        </View>
        <View style={{width: '49%',marginLeft: 6}}>
        <RNPickerSelect
        placeholder={{
            label: 'Select City',
            value: null,
        }}
        items={this.state.cityarray}
        underline={Colors.primary}
        onValueChange={(value) => {
            this.setState({
                city: value,
            });
        }}
        placeholderTextColor={Colors.primary}
        onUpArrow={() => {
            this.inputRefs.name.focus();
        }}
        onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
        }}
        value={this.state.city}
       />
       </View>
       </View>
       <View style={styles.pickerview}>
        <View style={{width: '49%'}}>
            <RNPickerSelect
            placeholder={{
                label: 'Select Issue',
                value: null,
            }}
            items={this.state.issuearray}
            underline={Colors.primary}
            onValueChange={(value) => {this.getSubIssues(value)}}
            placeholderTextColor={Colors.primary}
            onUpArrow={() => {
                this.inputRefs.name.focus();
            }}
            onDownArrow={() => {
                this.inputRefs.picker2.togglePicker();
            }}
            value={this.state.issues}
        />
        </View>
        <View style={{width: '49%',marginLeft: 6}}>
        <RNPickerSelect
        placeholder={{
            label: 'Select Sub Issue',
            value: null,
        }}
        items={this.state.subissuearray}
        underline={Colors.primary}
        onValueChange={(value) => {
            this.setState({
                subissues: value,
            });
        }}
        placeholderTextColor={Colors.primary}
        onUpArrow={() => {
            this.inputRefs.name.focus();
        }}
        onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
        }}
        value={this.state.subissues}
       />
       </View>
       </View>

       <TextInput 
        placeholder='Remarks' 
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=>this.setState({remark: text})}
        style={styles.textinput}></TextInput>
        <View style={styles.pickerview}>
        <TouchableOpacity style={styles.addiconview} onPress={this.addAttechment}>
        <Image  style={styles.attachicon} source={require('../../../Images/attached.png')}></Image>
        </TouchableOpacity>
        {this.renderText()}
        </View>
        
        <TouchableOpacity onPress={this.addTickets}>
        <View style={styles.button}>
        <Text style={styles.buttontext}>Submit</Text>
        </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
       
    )
}
}

