import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    mainview:{
        flex: 1,
        justifyContent: 'center',
    },
    textinput: {
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    marginVertical: 10
    },
    button: {
        borderRadius: 4, 
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: Colors.royalblue,
        marginHorizontal: 5,
        marginTop: 25,
    },
   
    buttontext: {
        fontSize: 22,
        color: Colors.white
    },
   
   picker: {
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.primary,
    padding: 10,
    marginVertical: 10
   },
   backicon: {
       width: 22,
       height: 22,
       marginLeft: 20
   },
   pickerview: {
       flexDirection: 'row',
       width: '100%'
   },
   addiconview: {
    alignSelf: 'flex-end',
  },
  attachicon: {
      width: 32,
      height: 32
  }
})