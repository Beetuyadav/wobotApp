import { StyleSheet } from 'react-native';
import Colors from '../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent
    },
    loaderView: {
        flexDirection: 'row'
    },
    Loader: {
    
    },
    Loadingtext: {
        marginLeft: 20,
        fontSize: 20,
        color: Colors.green
    }
})