import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, FlatList, Image, TextInput, Platform,
  ScrollView, PermissionsAndroid, NetInfo} from 'react-native';
import styles from './Styles';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../../Config/Colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Styles from './Styles';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNPickerSelect from '../../../Components/picker';
import FileViewer from 'react-native-file-viewer';
import Moment from 'moment';
import { connect } from 'react-redux';
import { readFlieArray, getComments } from '../../../Redux/Actions/Comments';
import propTypes from 'prop-types';
import Loader from '../../../Components/Loader';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { RNS3 } from 'react-native-aws3';


var id=0;
var messagesarray= [];
const  options = {
  title: 'Capture Image',
};
var path = RNFS.ExternalStorageDirectoryPath+"/WobotTicketing";
let commentdate='';

const awsoptions = {
  bucket: "wobotbucket",
  region: "us-east-1",
  accessKey: "AKIAJQSAQQNZ5K426EGA",
  secretKey: "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",
  successActionStatus: 201
}

 class CommentScreen extends React.Component {
    constructor()
      {
        super();
        this.state = { 
          valueArray: [],
          Comments: '',
          file: '',
          disabled: false,
          avatarSource: '',
          filename: '',
          filetype: '',
          fileformate: '',
          curTime:'',
          jobid: '',
          firstletter: '',
          username: '',
          isFetching: false,
        }
        this.index = 0;
    }

    componentWillMount = async () => {
   
      const Id= await AsyncStorage.getItem('jobID')
      const name= await  AsyncStorage.getItem('WTUname')
       console.log('Id : '+Id) 
       if (NetInfo.isConnected) {
        this.props.getComments(Id);
       } else {
        Toast.show('Please check your connectivity') 
       }
      this.setState({
        jobid: Id,
        firstletter: name.charAt(0).toUpperCase(),
        username: name
      })
     
 }
   
    addMore = () =>
      {
      var selecttime = Moment(new Date(),"hh:mm A").format('hh:mm A');  
      var slctdate = Moment(new Date(),"DD/MMM/YYYY").format("DD/MMM/YYYY");  
      console.log(slctdate)
      const { Comments, valueArray, file, filename, filetype, fileformate, firstletter, username} = this.state;
      if (Comments != '') {
        let newlyAddedValue = { index: this.index, title:firstletter, name:username, color:'#00bfa5',
          comment: Comments, filename: '', file: '',selecttime, date: slctdate}
       
        this.setState({ valueArray: [ ...valueArray, newlyAddedValue ], Comments: '', filename: '',  file: '',}); 
        this.index = this.index + 1;
      }else if (file != '') {
        let newlyAddedValue = { index: this.index, title:firstletter, name:username, color:'#00bfa5',
        comment: '', filename: filename, file: file,selecttime, date: slctdate}
 
        this.setState({ valueArray: [ ...valueArray, newlyAddedValue ], Comments: '', filename: '', file: ''}); 
        this.index = this.index + 1;
        this.uploadAWSFile(file,filename,filetype)
        //this.fetchFiles();
      }
       else {
        Toast.show('Write Comment...');
      }  
              
    }

    openCamera = () => {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response);
             if(Platform.OS == 'android'){
              RNFS.mkdir(path)
              .then(()=>{
               RNFS.writeFile(path+'/'+response.fileName,response.data,'base64')
               .then((success) => {
                 console.log('FILE WRITTEN!');
               })
               .catch((err) => {
                 console.log(err.message);
               });
              })
              .catch((err) => {
               console.log(err.message);
              });
              Toast.show('File is selected, press send')
         console.log(response);
         this.setState({
          file: response.uri,
          filename: response.fileName,
          filetype: response.type
        })
             } else {
              Toast.show('File is selected, press send')
              //console.log(response);
              var name = response.uri.split('/');
              console.log(name);
              this.setState({
               file: response.uri,
               filename: name[name.length-1],
               filetype: response.type
             })
             }
        }
      });
    }
    addAttechment = async() => {  
        if(Platform.OS == 'android'){
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                'title': 'File Permission',
                'message': 'Wobot Ticketing App needs access to your External Storage'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the File")
              DocumentPicker.show({
                filetype: [DocumentPickerUtil.allFiles()],
              },(error,res) => {
                console.log(res);
                  if(res !== null){
                    try{
                      
                    RNFS.mkdir(path)
                    .then(()=>{
                     console.log(res.uri );
                     console.log(path+'/'+res.fileName);
                     RNFS.copyFile(res.uri,path+'/'+res.fileName)
                     .then((success) => {
                       console.log('FILE WRITTEN!');
                     })
                     .catch((err) => {
                       console.log('copy error: '+err.message);
                     });
                    })
                    .catch((err) => {
                     console.log(err.message);
                    });
                    Toast.show('File is selected, press send')
                   
                    this.setState({
                      file: res.uri,
                      filename: res.fileName,
                      filetype: res.type
                    })
                    } catch(error){
                        console.log('error is:'+error)
                    }
                  }
              });
            } else {
              console.log("File permission denied")
            }
          } catch (err) {
            console.warn(err)
          }
        } else if(Platform.OS == 'ios') {
          try {
            console.log("You can use the File")
            DocumentPicker.show({
              filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
              console.log(res);
                if(res !== null){
                  try{
                  Toast.show('File is selected, press send')
            
                  this.setState({
                    file: res.uri,
                    filename: res.fileName,
                    filetype: res.type
                  })
                  } catch(error){
                      console.log('error is:'+error)
                  }
                }
            });
            } catch (err) {
          console.warn(err)
        }

        }
              
   }
   
  uploadAWSFile =(fileuri,filename,filetype)=>{
    this.setState({isFetching: true})
    const file = {
      uri: fileuri,
      name: filename,
      type: filetype
    }

    RNS3.put(file, awsoptions).then(response => {
      console.log(response);
      this.setState({isFetching: false})
      if (response.status !== 201){
        console.log("Failed to upload image to S3");
        console.log(response.body);
      }else{
        setTimeout(() => this.refs.flatList.scrollToEnd(),50)
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
       }
    });

  }

  fetchFiles = async() =>{
     if(Platform.OS == 'android'){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'File Permission',
          'message': 'Wobot Ticketing App needs access.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNFS.mkdir(path)
        .then(()=>{
         RNFS.readDir(path)
         .then((success) => {
           console.log(success);
           this.props.readFlieArray(success);
         })
         .catch((err) => {
           console.log('read error: '+err.message);
         });
        })
        .catch((err) => {
         console.log('mkdir error:'+err.message);
        });
      } else {
        console.log("File permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  

  }

  componentWillReceiveProps = (nextprops) => {
         console.log(nextprops)
         if (nextprops.Comments.comments) {
          let array=nextprops.Comments.comments.data.comments
          let commentarray=[];
          const regex = /(<([^>]+)>)/ig;
          for (var i=0; i< array.length; i++) {
            var selecttime=array[i].time
            var filetime=array[i].date+' '+array[i].time;
            if (array[i].message != '') {
              commentarray.push({ index: this.index, title:array[i].title, name:array[i].name, color:array[i].color,
                 comment: array[i].message.replace(regex, ''), filename: '', file: '',selecttime, date: array[i].date})
                 this.index = this.index + 1;
                 
            }else if (array[i].file != '') {
              commentarray.push({ index: this.index, title:array[i].title, name:array[i].name, color:array[i].color,
                 comment: '', filename: array[i].file_name, image:array[i].image, file: array[i].file, selecttime, date: array[i].date})

              this.index = this.index + 1;
            }
          }
        
            this.setState({ valueArray: commentarray});
         } 
  }
     renderDate = (date) => {
      if(commentdate != date){
        commentdate=date
        return(
          <Text style={{alignSelf: 'center', marginBottom: 15}}>---- {date} ----</Text>
        )
       
      }else{
        return null;
      }
     }

     openFile = (uri) => {
      
      this.props.navigation.navigate('ImageViewer', {
        url: uri,
      });
     }

     renderComments = (item) =>{
      
        if (item.comment !=  '') {
          return(
            <View>
              <View style = { styles.itemview }>
              {this.renderDate(item.date)}
              <View style={styles.itemsubview}>
              <View style={[styles.chattitleview,{backgroundColor: item.color}]}>
              <Text style={styles.chattitletext}>{item.title}</Text>
              </View>
              <Text style={[styles.chatname,{marginLeft: 10}]}>{item.name}</Text>
              <Text style={{position:'absolute',right:5}}>{item.selecttime}</Text>
              </View>
             
              <Text style={[styles.chatmsg,{marginLeft: 40}]}>{item.comment}</Text>
              
              </View>
              <View style={{backgroundColor: Colors.lightgrey, height: 1.3}}></View>
              </View>
          );   
        } else {
      
          return(
            <TouchableOpacity onPress={()=> this.openFile(item.file)}>
              <View  style = { styles.itemview }>
              {this.renderDate(item.date)}
              <View style={styles.itemsubview}>
              <View style={[styles.chattitleview,{backgroundColor: item.color}]}>
              <Text style={styles.chattitletext}>{item.title}</Text>
              </View>
              <Text style={[styles.chatname,{marginLeft: 10}]}>{item.name}</Text>
              <Text style={{position:'absolute',right:5}}>{item.selecttime}</Text>
              </View>
              <Image style={styles.fileimage} source={{uri: item.image}}></Image>
              <Text style={[styles.chatmsg,{alignSelf: 'center'}]}>{item.filename}</Text>
              </View>
              <View style={{backgroundColor: Colors.lightgrey, height: 1.3}}></View>
              </TouchableOpacity>
          );  
        }
        
     }
     renderBottomView = () => {
        if (Platform.OS == "android") {
          return(
            <View style={styles.bottomview}>
            <View style={styles.itemsubview}>
            <View style={styles.inputView}>
            <TextInput 
               placeholder='Comments' 
               placeholderTextColor= {Colors.grey} 
               value={this.state.Comments}
               onChangeText={text=> this.setState({Comments: text})}
               style={styles.textinput}></TextInput>
               <TouchableOpacity  onPress={this.addAttechment}>
               <Image style={[styles.sidebaricon,{marginTop: 12}]} source={require('../../../Images/attached.png')}></Image>
               </TouchableOpacity>
               <TouchableOpacity  onPress={this.openCamera}>
               <Image style={[styles.sidebaricon,{marginTop: 12, marginLeft: 6}]} source={require('../../../Images/attached.png')}></Image>
               </TouchableOpacity>
               </View>
               <TouchableOpacity  onPress={this.addMore}>
               <Image style={[styles.sidebaricon,{marginTop: 13, marginLeft: 8}]} source={require('../../../Images/send.png')}></Image>
               </TouchableOpacity>
               </View>
               </View>
          )
        } else {
          return(
            <KeyboardAccessoryView alwaysVisible>
            <View style={styles.bottomview}>
            <View style={styles.itemsubview}>
            <View style={styles.inputView}>
            <TextInput 
               placeholder='Comments' 
               placeholderTextColor= {Colors.grey} 
               value={this.state.Comments}
               onChangeText={text=> this.setState({Comments: text})}
               style={styles.textinput}></TextInput>
               {/* <TouchableOpacity  onPress={this.addAttechment}>
               <Image style={[styles.sidebaricon,{marginTop: 12}]} source={require('../../../Images/attached.png')}></Image>
               </TouchableOpacity> */}
               <TouchableOpacity  onPress={this.addAttechment}>
               <Image style={[styles.sidebaricon,{marginTop: 12}]} source={require('../../../Images/attached.png')}></Image>
               </TouchableOpacity>
               </View>
               <TouchableOpacity  onPress={this.addMore}>
               <Image style={[styles.sidebaricon,{marginTop: 13, marginLeft: 8}]} source={require('../../../Images/send.png')}></Image>
               </TouchableOpacity>
               </View>
               </View>
               </KeyboardAccessoryView>
          )
        }
     }
    render() {
        
      if(this.props.Comments.isFetching || this.state.isFetching){
        return(
       <Loader/>
        )
      }
      return (
      <View style={styles.container}>
      <FlatList
        ref="flatList"
        data={this.state.valueArray}
        keyExtractor={item=> item.index.toString()}
        renderItem={({item})=>{ 
        if (item.comment !=  '') {
        return(
          <View>
            <View style = { styles.itemview }>
            {this.renderDate(item.date)}
            <View style={styles.itemsubview}>
            <View style={[styles.chattitleview,{backgroundColor: item.color}]}>
            <Text style={styles.chattitletext}>{item.title}</Text>
            </View>
            <Text style={[styles.chatname,{marginLeft: 10}]}>{item.name}</Text>
            <Text style={{position:'absolute',right:5}}>{item.selecttime}</Text>
            </View>
           
            <Text style={[styles.chatmsg,{marginLeft: 40}]}>{item.comment}</Text>
            
            </View>
            <View style={{backgroundColor: Colors.lightgrey, height: 1.3}}></View>
            </View>
        );   
      } else {
    
        return(
          <TouchableOpacity onPress={()=> this.openFile(item.file)}>
            <View  style = { styles.itemview }>
            {this.renderDate(item.date)}
            <View style={styles.itemsubview}>
            <View style={[styles.chattitleview,{backgroundColor: item.color}]}>
            <Text style={styles.chattitletext}>{item.title}</Text>
            </View>
            <Text style={[styles.chatname,{marginLeft: 10}]}>{item.name}</Text>
            <Text style={{position:'absolute',right:5}}>{item.selecttime}</Text>
            </View>
            <Image style={styles.fileimage} source={{uri: item.image}}></Image>
            <Text style={[styles.chatmsg,{alignSelf: 'center'}]}>{item.filename}</Text>
            </View>
            <View style={{backgroundColor: Colors.lightgrey, height: 1.3}}></View>
            </TouchableOpacity>
        );  
      }
       }
      }
      />
      <View style={{height: 40}}></View>
      {this.renderBottomView()}
      </View>
      );
    }
  }

  CommentScreen.propTypes ={
    readFlieArray: propTypes.func.isRequired,
    getComments: propTypes.func.isRequired,
    Comments: propTypes.object.isRequired
  }
  const mapStateToProps = (state) => {
    return{
    FileArray: state,
    Comments: state.Comments
   }
  }
  const dispatchStateToProps = {readFlieArray, getComments}

export default connect(mapStateToProps,dispatchStateToProps)(CommentScreen)