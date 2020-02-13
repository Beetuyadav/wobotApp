import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Animated,
  ScrollView,
  PermissionsAndroid
} from "react-native";
import styles from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../Config/Colors";
import { createMaterialTopTabNavigator } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import Toast from "react-native-simple-toast";
import moment from "moment";
import Styles from "./Styles";
import RNFS from "react-native-fs";
import axios from "axios";
import { SERVER_URL } from "../../../Config/Constants";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNPickerSelect from "../../../Components/picker";
import FileViewer from "react-native-file-viewer";
import Moment from "moment";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Hyperlink from "react-native-hyperlink";

var id = 0;
var messagesarray = [];
const options = {
  title: "Capture Image"
};
var path = RNFS.ExternalStorageDirectoryPath + "/WobotTicketing";
export default class DetailScreen extends React.Component {
  state = {
    id: "",
    status: "",
    color: "",
    time_status_text: "",
    title: "",
    region: "",
    city: "",
    issue: "",
    subissue: "",
    tag: "",
    start_date: "",
    selectstatus: "",
    remarks: "",
    executives: "",
    pickeritem: [
      {
        label: "To Do",
        value: "1"
      },
      {
        label: "Closed",
        value: "2"
      }
    ]
  };

  // componentWillMount = async () => {
  //   const {
  //     navigation: { getParam }
  //   } = this.props;

  //   console.warn('Hello_____', navigation);
  //   const Id = getParam("jobID");
  //   const status = getParam("jobstatus");
  //   const color = getParam("jobcolor");
  //   const jobtime_status_text = getParam("jobtime_status_text");
  //   const title = getParam("jobtitle");
  //   const region = getParam("jobregion");
  //   const city = getParam("jobcity");
  //   const issue = getParam("jobissue");
  //   const subissue = getParam("jobsubissue");
  //   const tag = getParam("jobtag");
  //   const jobstart_date = getParam("jobstart_date");
  //   const jobremarks = getParam("jobremarks");
  //   const jobname = getParam("jobname");
    
  //   let jobstatus = "";
  //   console.log(status);
  //   if (status == "To Do") {
  //     jobstatus = "1";
  //   }
  //   console.log("Id : " + Id);
  //   this.setState({
  //     id: Id,
  //     status: status,
  //     color: color,
  //     time_status_text: jobtime_status_text,
  //     title: title,
  //     region: region,
  //     city: city,
  //     issue: issue,
  //     subissue: subissue,
  //     tag: tag,
  //     start_date: jobstart_date,
  //     remarks: jobremarks,
  //     selectstatus: jobstatus,
  //     executives: jobname
  //   });
  // };
  componentWillMount = async () => {
   
    const Id= await AsyncStorage.getItem('jobID')
    const status=await AsyncStorage.getItem('jobstatus')
    const color=await AsyncStorage.getItem('jobcolor')
    const jobtime_status_text=await AsyncStorage.getItem('jobtime_status_text')
    const title=await AsyncStorage.getItem('jobtitle')
    const region=await AsyncStorage.getItem('jobregion')
    const city=await AsyncStorage.getItem('jobcity')
    const issue=await AsyncStorage.getItem('jobissue')
    const subissue=await AsyncStorage.getItem('jobsubissue')
    const tag=await AsyncStorage.getItem('jobtag')
    const jobstart_date=await AsyncStorage.getItem('jobstart_date')
    const jobremarks=await AsyncStorage.getItem('jobremarks')
    const jobname=await AsyncStorage.getItem('jobname')
    console.warn('TestName:---',jobname);
    let jobstatus='';
    console.log(status)
    if(status == 'To Do'){
    jobstatus='1';
    }
     console.log('Id : '+Id) 
    this.setState({
      id: Id,
      status: status,
      color: color,
      time_status_text: jobtime_status_text,
      title: title,
      region: region,
      city: city,
      issue: issue,
      subissue: subissue,
      tag: tag,
      start_date: jobstart_date,
      remarks: jobremarks,
      selectstatus: jobstatus,
      executives:jobname,
    })
}
  changeStatus = async () => {

    const { selectstatus, id } = this.state;
    if (selectstatus == null) {
      Toast.show("Select Status");
    } else {
      const WTappId = await AsyncStorage.getItem("WTappId");
      const WTauthKey = await AsyncStorage.getItem("WTauthKey");
      try {
        const url = SERVER_URL;
        const data = await axios({
          method: "POST",
          url,
          headers: { "Content-Type": "application/json" },
          data: {
            action: "changeStatus",
            job_id: id,
            status: selectstatus,
            appId: WTappId,
            authKey: WTauthKey
          }
        });

        if (data.data.status == 1) {
          Toast.show(data.data.message);
          this.props.navigation.navigate("Task");
        } else {
          Toast.show(data.data.message);
        }
      } catch (error) {
        Toast.show("Error : " + error);
      }
    }
  };

  renderButton = () => {
    if (this.state.status == "Closed") {
      return null;
    } else {
      return (
        <View>
          <RNPickerSelect
            placeholder={{
              label: "Select Status",
              value: null
            }}
            items={this.state.pickeritem}
            underline={Colors.primary}
            onValueChange={value => {
              this.setState({ selectstatus: value });
            }}
            placeholderTextColor={Colors.primary}
            onUpArrow={() => {
              this.inputRefs.name.focus();
            }}
            onDownArrow={() => {
              this.inputRefs.picker2.togglePicker();
            }}
            value={this.state.selectstatus}
          />
          <TouchableOpacity onPress={this.changeStatus}>
            <View style={styles.button}>
              <Text style={styles.buttontext}>CHANGE STATUS</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const {
      id,
      status,
      color,
      time_status_text,
      title,
      region,
      city,
      issue,
      subissue,
      tag,
      start_date,
      remarks,
      executives
    } = this.state;

    return (
      
      <View style={styles.container}>
        <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
          <View style={styles.itemsubview}>
            <View style={styles.todoview}>
              <Text style={styles.subheader}>{status}</Text>
            </View>
            <View
              style={[
                styles.overdue,
                {
                  backgroundColor:
                    time_status_text === "Today" ? "green" : "red",
                  borderRadius: 20
                }
              ]}
            >
              <Text style={styles.overduetext}>{time_status_text}</Text>
            </View>
          </View>
          <Text style={[styles.header, { marginTop: 20 }]}>{title}</Text>
          <Text style={[styles.subheader, { marginTop: 10 }]}>
            {issue}-{subissue}
          </Text>
          <View style={styles.bottomline} />
          <View style={[styles.itemsubview, { marginTop: 6 }]}>
            <Image
              style={styles.sidebaricon}
              source={require("../../../Images/calendar.png")}
            />
            <Text style={[styles.subheader, { marginLeft: 10 }]}>
              {start_date}
            </Text>
          </View>
          <View style={styles.bottomline} />
          <View style={[styles.itemsubview, { marginTop: 6 }]}>
            <Image
              style={styles.sidebaricon}
              source={require("../../../Images/pin.png")}
            />
            <Text style={[styles.subheader, { marginLeft: 10 }]}>
              {region}-{city}
            </Text>
          </View>
          <View style={styles.bottomline} />
          <View style={[styles.itemsubview, { marginTop: 6 }]}>
            <Image
              style={styles.sidebaricon}
              source={require("../../../Images/user.png")}
            />
            <Text style={[styles.subheader, { marginLeft: 10 }]}>
              {executives}
            </Text>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.textView}>
            <Text style={styles.subheader}>Remarks: </Text>

            <Hyperlink
              linkDefault
              linkStyle={{ color: "#2980b9", fontSize: 16 }}
            >
              <Text style={{ fontSize: 16 }}>{remarks}</Text>
            </Hyperlink>
          </View>
          <View style={styles.bottomline} />

          {this.renderButton()}
        </View>
      </View>
    );
  }
}
