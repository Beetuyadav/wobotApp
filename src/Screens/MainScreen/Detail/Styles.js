import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: 8,
    },
    imagestyle: {
        width: 128,
        height: 128,
        borderRadius: 80,
        marginBottom:20
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black
    },
    subheader: {
     fontSize: 16,
    },
    subheaderClick: {
        fontSize: 16,
        color: 'blue'
   
       },
    textView: {
        flexDirection: 'row',
        marginTop:5,
    },
    checkinoutView: {
        flexDirection: 'row',
        marginTop:10,
        justifyContent: 'space-between'
    },
    itemview: {
        marginVertical: 0.3,
        backgroundColor: Colors.lightsky,
        padding: 10
    },
    itemsubview: {
        flexDirection: 'row',
        width: '100%',
      },
      todoview: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: Colors.lightgrey,
        borderRadius: 20
    },
    overdue: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginLeft: 15,
    },
    overduetext: {
        fontSize: 16,
        color: Colors.white
       },
    sidebaricon: {
        width: 22,
        height: 22
    },
    bottomline: {
        height: 1,
        backgroundColor: Colors.lightgrey,
        marginTop: 6,
        marginBottom: 2
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: Colors.skyblue,
        marginVertical: 10,
    },
    buttontext: {
        fontSize: 18,
        color: Colors.white
    },
    textinput: {
        fontSize: 16,
        padding: 10,
        width: '80%'
        },
     bottomview: {
       backgroundColor: Colors.white,
       position: 'absolute',
       bottom: 1,
       left: 1,
       right: 1
        }, 
      inputView: {
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.grey
      },
     fileimage: {
         width: 160,
         height: 160,
         alignSelf: 'center',
         borderWidth: 1 ,
         borderColor: Colors.black,
         borderRadius: 6
        },
      liststyle:{
          padding: 10,
      },
      rowview:{
          flexDirection: 'row',
      },
      img:{
          width: 48,
          height: 48,
      },
      iname:{
          fontSize: 16,
          fontWeight: 'bold',
      },
      verticalview:{
          marginLeft: 10
      }  
  
})
