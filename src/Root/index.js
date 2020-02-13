import React from "react";
import { TouchableOpacity, Image } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../Config/Colors";

import SplashScreen from "../Screens/InitialScreen/Splash";
import LoginScreen from "../Screens/InitialScreen/Login";
import ForgotScreen from "../Screens/InitialScreen/Forgot";

import Drawer from "../Drawer";

import HomeScreen from "../Screens/MainScreen/Home";
import NotificatoinScreen from "../Screens/MainScreen/Notification";
import TaskDetailScreen from "../Screens/MainScreen/TaskDetail";
import AddTicketScreen from "../Screens/MainScreen/AddTicket";
import ChangePasswordScreen from "../Screens/MainScreen/ChangePassword";
import TaskScreen from "../Screens/MainScreen/Tasks";
import ImageViewerScreen from "../Screens/MainScreen/ImageViewer";
import WebViewScreen from "../Screens/MainScreen/WebView/webview";
import ReportViewScreen from "../Screens/MainScreen/Report/reportView";

const auth = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: LoginScreen,
    Forgot: ForgotScreen
  },
  {
    initialRouteName: "Splash"
  }
);

const homestack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: "none"
  }
);
const notificatoinstack = createStackNavigator(
  {
    Notification: NotificatoinScreen
  },
  {
    headerMode: "none"
  }
);

const webviewstack = createStackNavigator(
  {
    webview: WebViewScreen
  },
  {
    headerMode: "none"
  }
);

const reportviewstack = createStackNavigator(
  {
    reportView: ReportViewScreen
  },
  {
    headerMode: "none"
  }
);
// 
const TaskDetailstack = createStackNavigator(
  {
    TaskDetail: TaskDetailScreen,
    ImageViewer: ImageViewerScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Task Detail",
      drawerLabel: "Task Detail",
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("Task")}>
          <Image
            style={{ width: 22, height: 22, marginLeft: 20 }}
            source={require("../Images/back.png")}
          />
        </TouchableOpacity>
      )
    })
  }
);
const AddTicketstack = createStackNavigator({
  AddTask: AddTicketScreen
});
const TaskStack = createStackNavigator(
  {
    Task: TaskScreen
  },
  {
    headerMode: "none"
  }
);
const ChangePswrdstack = createStackNavigator({
  ChangePassword: ChangePasswordScreen
});

const homeDrawer = createDrawerNavigator(
  {
    Home: homestack
  },
  {
    contentComponent: Drawer
  }
);

const root = createStackNavigator(
  {
    Home: homeDrawer,
    Notification: notificatoinstack,
    TaskDetail: TaskDetailstack,
    AddTicket: AddTicketstack,
    ChangePassword: ChangePswrdstack,
    Task: TaskStack,
    Webview: webviewstack,
    reportView :reportviewstack
  },
  {
    initialRouteName: "Home",
    headerMode: 'none',
  }
);

export default (Root = createSwitchNavigator(
  {
    Auth: auth,
    Main: root
  },
  {
    initialRouteName: "Auth"
  }
));
