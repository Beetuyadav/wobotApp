import { StyleSheet,Dimensions } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        //padding: 5,
    },
  
   smalllogo: {
    width: 50,
    height: 20,
    alignSelf: 'center',
    marginTop: 5
    }, 
    imagestyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    backicon: {
        width: 22,
        height: 22,
        marginLeft: 20
    },
})