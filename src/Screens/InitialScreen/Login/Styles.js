import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
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
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.grey,
    padding: 10,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: Colors.skyblue,
        marginVertical: 12
    },
    buttontext: {
        fontSize: 18,
        color: Colors.white
    },
    forgottext: {
        fontSize: 18,
        color: Colors.skyblue,
        alignSelf: 'flex-end',
    },
    logo: {
        width: 270,
        height: 60,
        alignSelf: 'center',
        marginBottom: 60
        },
})