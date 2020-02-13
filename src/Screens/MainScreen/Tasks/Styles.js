import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
    },
   itemview: {
       marginHorizontal: 6,
       marginVertical: 5,
       borderRadius: 8,
       borderTopWidth: 1,
       borderBottomWidth: 1,
       borderBottomColor: Colors.grey,
       borderTopColor: Colors.grey
   },
   itemsubview: {
    flexDirection: 'row',
    width: '100%',
  },
  orangeview: {
   width: '2%',
   borderRadius: 5
  },
  whiteview: {
    width: '96%',
    paddingVertical: 8,
    paddingHorizontal: 10
   },
   itemheader: {
       fontSize: 15,
       fontWeight: 'bold',
       color: Colors.black
   },
   itemsubheader: {
    fontSize: 11,
    color: Colors.black
   },
   itemsubheaderTitle: {
    fontSize: 12,
//    itemsubheader: {
//     fontSize: 16,
//     width: '60%',
//     color: Colors.black
//    }, 
    color: Colors.black
   },
   button: {
    borderRadius: 4, 
    paddingHorizontal: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10
},
buttontext: {
    fontSize: 16,
    color: Colors.white
},
toolbar: {
    backgroundColor: Colors.primary,
    height: 70,
    paddingHorizontal: 16,
    paddingTop: 28,
    flexDirection: 'row',
    width:'100%'
   },
   sidebarview: {
    width: '35%'
  },
   sidebaricon: {
       width: 22,
       height: 22
   },
   tooltextview: {
       width: '50%'
   },
   tooltext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white
    },  
   refreshicon: {
       width: 26,
       height: 26,
       marginLeft: 10,
   },
   textinput: {
       borderWidth: 1,
       borderColor: Colors.grey,
       marginTop: 10,
       marginBottom: 5,
       borderRadius: 25,
       width: '95%',
       height: 40
      },
    todoview: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.lightgrey,
        borderRadius: 20
    },
    overdue: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 15,
        borderRadius: 20
    },
    overduetext: {
        fontSize: 16,
        color: Colors.white
       },
    bottomview: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 42,
        backgroundColor: Colors.skyblue,
        justifyContent: 'center',
        alignItems: 'center'
    },  
})
