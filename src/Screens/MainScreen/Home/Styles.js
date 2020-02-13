import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
    },
   itemview: {
       marginHorizontal: 20,
       marginVertical: 10,
       flexDirection: 'row',
       borderRadius: 4
   },
   openview: {
       width: '25%',
       height: 180,
       backgroundColor: Colors.royalblue,
       alignItems: 'center'
   },
   openviewno: {
    width: '75%',
    height: 180,
    backgroundColor: Colors.lightgrey,
    alignItems: 'center',
    justifyContent: 'center'
},
    closedview: {
        width: '25%',
        height: 180,
        backgroundColor: Colors.grey,
        alignItems: 'center'
    },
    closedviewno: {
    width: '75%',
    height: 180,
    backgroundColor: Colors.lightgrey,
    alignItems: 'center',
    justifyContent: 'center'
    },
   itemheader: {
       fontSize: 18,
       fontWeight: 'bold',
       color: Colors.black
   },
   itemsubheader: {
    fontSize: 18,
    color: Colors.white,
    marginTop: 25
   },
   toolbar: {
    backgroundColor: Colors.primary,
    height: 70,
    paddingHorizontal: 16,
    paddingVertical: 28,
    flexDirection: 'row',
    width:'100%',
    marginBottom: 10
   },
   sidebarview: {
    width: '42%'
  },
   sidebaricon: {
       width: 26,
       height: 26
   },
  
   smalllogo: {
    width: 50,
    height: 20,
    alignSelf: 'center',
    marginTop: 8
    },  
   bellicon: {
       width: 30,
       height: 30,
      
   },
   dots: {
    width: 12,
    height: 26,
  
},
dotview: {
    position: 'absolute',
    right: 15,
    top: 26
},
nocircle: {
  width: 70,
  height: 70,
  borderRadius: 70,
  backgroundColor: Colors.grey,
  alignItems: 'center',
  justifyContent: 'center'
},
nocirclewhite: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.lightgrey,
    alignItems: 'center',
  justifyContent: 'center'
  },
  lockicon: {
      width: 36,
      height: 36,
      position: 'absolute',
      bottom: 20
  },
  bellview: {
    position: 'absolute',
    right: 45,
    top: 25
  },
  addiconview: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  modal: {
      width: 210,
      height: 100, 
      backgroundColor: Colors.white, 
      position: 'absolute', 
      right: 0, 
      top: 40,
      paddingHorizontal: 15,
      paddingVertical: 10
    },
    itemsubview: {
        flexDirection: 'row',
        width: '100%',
      },
      modaltext: {
          fontSize: 16,
          color: Colors.black,
          marginLeft: 20
      },
      modallogouttext: {
        fontSize: 16,
        color: Colors.skyblue,
        margin: 5
    },
    logoutmodal: {
        width: 240,
        height: 100, 
        backgroundColor: Colors.white, 
        position: 'absolute', 
        right: Dimensions.get('window').width/5, 
        top: Dimensions.get('window').height/3,
        paddingHorizontal: 15,
      },
      logoutmodaltext: {
        fontSize: 16,
        color: Colors.primary,
    },
})
