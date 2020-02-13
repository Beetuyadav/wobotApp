import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  NetInfo,SafeAreaView,
} from "react-native";
import styles from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../Config/Colors";
import { getJobs } from "../../../Redux/Actions/Job";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Loader from "../../../Components/Loader";
import Toast from "react-native-simple-toast";
import CompleteFlatList from "react-native-complete-flatlist";

var tasktype = "";
class Tasks extends React.Component {
  state = {
    usertype: "",
    Jobs: [],
    searchTerm: "",
    currentpage: 1,
    nojobs: 1
  };

  constructor(props) {
    super(props);
    const { navigation: { getParam } } = props;
    console.warn(getParam('taskType'), this.props.getJobs);
  }
  componentWillMount = async () => {
    tasktype = await AsyncStorage.getItem("TaskType");
    this.getAllJobs();
  };

  refreshPage = async () => {
    const {
      navigation: { getParam }
    } = this.props;
    this.setState({
      usertype: "",
      Jobs: [],
      searchTerm: "",
      currentpage: 1,
      nojobs: 1
    });
    if (NetInfo.isConnected) {
      this.props.getJobs(1, getParam("taskType"));
    } else {
      Toast.show("Please check your connectivity");
    }
  };

  getAllJobs = () => {
    const {
      navigation: { getParam }
    } = this.props;
    // tasktype = await AsyncStorage.getItem("TaskType");
    if (NetInfo.isConnected) {
      this.props.getJobs(this.state.currentpage, getParam("taskType"));
    } else {
      Toast.show("Please check your connectivity");
    }
  };

  componentWillReceiveProps = nextprops => {
    try {
      if (nextprops.Response.Job.isFetching == false) {
        if (nextprops.Response.Job.jobs.data.status == 1) {
          console.log(nextprops.Response.Job.jobs.data.jobs);
          const array = nextprops.Response.Job.jobs.data.jobs;

          var jobarray = [];
          console.log(this.state.Jobs.length);
          if (this.state.Jobs.length == 1) {
          } else {
            jobarray = this.state.Jobs;
          }
          for (var i = 0; i < array.length; i++) {
            if (tasktype == "Open") {
              if (array[i].status_type === 0) {
              } else {
                jobarray.push(array[i]);
              }
            } else {
              if (array[i].status_type === 1) {
              } else {
                jobarray.push(array[i]);
              }
            }
          }
          console.log(jobarray);
          this.setState({
            Jobs: jobarray,
            nojobs: nextprops.Response.Job.jobs.data.status
          });
        } else {
          Toast.show(nextprops.Response.Job.jobs.data.message);
          this.setState({ nojobs: nextprops.Response.Job.jobs.data.status });
        }
      }
    } catch (error) {
      Toast.show("Error " + error);
    }
  };

  // getTasks = async (
  //   id,
  //   status,
  //   color,
  //   time_status_text,
  //   title,
  //   region,
  //   city,
  //   issue,
  //   sub_issue,
  //   tag,
  //   start_date,
  //   remarks,
  //   executives
  // ) => {
  //   console.log(id + " : " + status);
  //   const d = {
  //     jobID: id,
  //     jobstatus: status,
  //     jobcolor: color,
  //     jobtime_status_text: time_status_text,
  //     jobtitle: title,
  //     jobregion: region,
  //     jobcity: city,
  //     jobissue: issue,
  //     jobsubissue: sub_issue,
  //     jobtag: tag,
  //     jobstart_date: start_date,
  //     jobremarks: remarks,
  //     jobname: executives
  //   };

  //   this.props.navigation.navigate("TaskDetail", d);
  // };
  getTasks = item => {
    // item.id,
    //         item.status,
    //         item.color,
    //         item.time_status_text,
    //         item.title,
    //         item.region,
    //         item.city,
    //         item.issue,
    //         item.sub_issue,
    //         item.tag,
    //         item.start_date,
    //         item.remarks,
    //         item.executives.names[0]
    const { id,
      status,
      color,
      time_status_text,
      title,
      region,
      city,
      issue,
      sub_issue,
      tag,
      start_date,
      remarks,
      executives } = item;


    console.log(id + " : " + status);
    AsyncStorage.setItem("jobID", id);
    AsyncStorage.setItem("jobstatus", status);
    AsyncStorage.setItem("jobcolor", color);
    AsyncStorage.setItem("jobtime_status_text", time_status_text);
    AsyncStorage.setItem("jobtitle", title);

    AsyncStorage.setItem("jobregion", region);
    AsyncStorage.setItem("jobcity", city);
    AsyncStorage.setItem("jobissue", issue);
    AsyncStorage.setItem("jobsubissue", sub_issue);
    AsyncStorage.setItem("jobtag", tag);
    AsyncStorage.setItem("jobstart_date", start_date);
    AsyncStorage.setItem("jobremarks", remarks);
    AsyncStorage.setItem("jobname", executives.names.join(","));

    // console.log('Logging executives', executives.names.join(" "));
    this.props.navigation.navigate("TaskDetail");
  };
  backHome = () => {
    this.props.navigation.navigate("Home");
  };
  cell = (data, index) => {
    const item = data.cleanData ? data.cleanData : data;
    //  console.warn('TotalItem___',item.executives);
    return (
      <TouchableOpacity onPress={() => this.getTasks(item)} >
        <View style={styles.itemview}>
          <View style={styles.itemsubview}>
            <View
              style={[
                styles.orangeview,
                {
                  backgroundColor:
                    item.time_status_text === "Today" ? "green" : "red"
                }
              ]}
            />

            <View style={styles.whiteview}>
              <View style={styles.itemsubview}>
                <View style={styles.todoview}>
                  <Text style={styles.itemsubheader}>{item.status}</Text>
                </View>
                <View
                  style={[
                    styles.overdue,
                    {
                      backgroundColor:
                        item.time_status_text === "Today" ? "green" : "red"
                    }
                  ]}
                >
                  <Text style={styles.overduetext}>
                    {item.time_status_text}
                  </Text>
                </View>
              </View>
              <Text style={[styles.itemheader, { marginTop: 5 }]}>
                {item.title}
              </Text>
              <Text style={styles.itemsubheader}>
                {item.region}-{item.city}
              </Text>
              <View style={styles.itemsubview}>
                <Text style={styles.itemsubheaderTitle}>
                  {item.issue}-{item.sub_issue}
                </Text>
                <Text
                  style={[
                    styles.itemsubheader,
                    { position: "absolute", right: 0, color: item.color }
                  ]}
                >
                  {item.tag}
                </Text>
              </View>
              <View style={[styles.itemsubview, { marginTop: 6 }]}>
                <Image
                  style={styles.sidebaricon}
                  source={require("../../../Images/calendar.png")}
                />
                <Text style={[styles.itemsubheader, { marginLeft: 10 }]}>
                  {item.start_date}
                </Text>
              </View>
              <View style={[styles.itemsubview, { marginTop: 6 }]}>
                <Image
                  style={styles.sidebaricon}
                  source={require("../../../Images/user.png")}
                />
                <Text style={[styles.itemsubheader, { marginLeft: 10 }]}>
                  {item.executives.names.join(",")}
                </Text>
              </View>
            </View>

            <View
              style={[styles.orangeview, { backgroundColor: item.color }]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderPagination = () => {
    const { currentpage } = this.state;
    return (
      <TouchableOpacity
        style={styles.bottomview}
        onPress={() => this.getPage(currentpage + 1)}
      >
        <Text style={styles.buttontext}>Load more</Text>
      </TouchableOpacity>
    );
  };

  getPage = page => {

    const {
      navigation: { getParam }
    } = this.props;
    if (this.state.nojobs === 0) {
      Toast.show("No jobs to show.");
    } else {
      this.setState({ currentpage: page });
      if (NetInfo.isConnected) {
        this.props.getJobs(page, getParam('taskType'));
      } else {
        Toast.show("Please check your connectivity");
      }
    }
  };

  render() {
    if (this.props.Response.Job.isFetching) {
      return <Loader />;
    }
    return (
      <SafeAreaView style={{
        flex: 1,
      }}>

      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={styles.sidebarview}>
            <TouchableOpacity onPress={this.backHome}>
              <Image
                style={styles.sidebaricon}
                source={require("../../../Images/back.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tooltextview}>
            <Text style={styles.tooltext}>Task List</Text>
          </View>
          <TouchableOpacity onPress={this.refreshPage}>
            <Image
              style={styles.refreshicon}
              source={require("../../../Images/refresh.png")}
            />
          </TouchableOpacity>
        </View>

        <CompleteFlatList
          searchKey={["title"]}
          data={this.state.Jobs}
          keyExtractor={item => item.id}
          renderItem={this.cell}
          searchBarBackgroundStyles={styles.textinput}
        />

        <View style={{ height: 42 }} />
        {this.renderPagination()}
      </View>
      </SafeAreaView>
    );
  }
}

Tasks.propTypes = {
  getJobs: propTypes.func.isRequired,
  Response: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    Response: state
  };
};

const dispatchStateToProps = { getJobs };

export default connect(
  mapStateToProps,
  dispatchStateToProps
)(Tasks);
