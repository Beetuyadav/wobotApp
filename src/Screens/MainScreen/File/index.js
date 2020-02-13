import React from 'react';
import { View, Text, FlatList, Image} from 'react-native';

import styles from './Styles';
import Moment from 'moment';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

 class FileScreen extends React.Component {
    state = {
      readdata: [],
    }

    componentWillReceiveProps = (nextprops) => {
      console.log(nextprops)
      if (nextprops.Comments.comments) {
       let array=nextprops.Comments.comments.data.comments
       let filearray=[];
       for (var i=0; i< array.length; i++) {
        var selecttime=array[i].time
         var filetime=array[i].time+' - '+array[i].date;
        if (array[i].file != '') {
           filearray.push({ name: array[i].file_name, file: array[i].image,time: selecttime, datetime:filetime})
         }
       }
     
         this.setState({ readdata: filearray});
      } 
}
  render() {
    return (
    <View style={styles.container}>
    <FlatList
    data = {this.state.readdata}
    renderItem = {({item})=>
      <View style={styles.liststyle}>
          <View style={styles.rowview}>
          <View style={{justifyContent: 'center'}}>
             <Image
             style={styles.img}
             source={{uri:item.file}}
             ></Image>
             </View>
             <View style={styles.verticalview}>
             <Text style={styles.iname}>{item.name}</Text>
             <Text style={{fontSize:12}}>by {item.time}</Text>
             <Text style={{fontSize:12}}>{item.datetime}</Text>
             </View>
          </View>
      </View>
  }
    ></FlatList>
    </View>
    );
  }
  }
  FileScreen.propTypes ={
    Comments: propTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => {
    return{
      Comments: state.Comments
   }
  }
  
  export default connect(mapStateToProps)(FileScreen)
  