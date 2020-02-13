import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    heading: {
        fontSize: 20,
        color: Colors.primary,
        alignSelf: 'center'
    },
    mainview:{
        flex: 1,
        justifyContent: 'center',
    },
    textinput: {
    fontSize: 16,
    color: Colors.primary,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.primary,
    padding: 10,
    marginVertical: 10
    },
    button: {
        borderRadius: 4, 
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: Colors.skyblue,
        marginHorizontal: 5,
        marginTop: 20,
    },
   
    buttontext: {
        fontSize: 16,
        color: Colors.white
    },
    forgottext: {
        fontSize: 22,
        color: Colors.red,
        alignSelf: 'center',
    },
})