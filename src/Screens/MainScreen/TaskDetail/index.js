import React from 'react';
import Colors from '../../../Config/Colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import DetailScreen from '../Detail';
import CommentScreen from '../Comment';
import FileScreen from '../File';

  export default createMaterialTopTabNavigator({
    DETAILS: DetailScreen,
    COMMENTS: CommentScreen,
    FILES: FileScreen
  },{
    initialRouteName: 'DETAILS',
  },
  
  {
    tabBarOptions:{
      activeTintColor: Colors.royalblue,
      inactiveTintColor: Colors.primary,
      labelStyle: {
        fontSize: 16,
      },
    style:{
      backgroundColor: Colors.lightgrey
    },
    indicatorStyle: {
      backgroundColor: Colors.royalblue
    }
    },
  });