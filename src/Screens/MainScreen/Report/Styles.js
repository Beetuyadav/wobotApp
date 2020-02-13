import { StyleSheet } from 'react-native';
import Colors from '../../../Config/Colors';
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    // toolbar: {
    //     container: {
    //       backgroundColor: colors.primary,
    //       ...Platform.select({
    //         ios: {
    //           paddingTop: 20,
    //           height: 64,
    //         },
    //       }),
    //     },
    //   },
   itemview: {
       marginHorizontal: 5,
       marginVertical: 4,
       padding: 4
   },
   itemheader: {
       fontSize: 16,
       fontWeight: 'bold',
       color: Colors.primary
   },
   itemsubheader: {
    fontSize: 14,
    color: Colors.primary,
    alignSelf: 'flex-end'
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
    width: '20%'
  },
   sidebaricon: {
       width: 22,
       height: 22
   },
   tooltextview: {
       width: '40%'
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
  bottomline: {
      height: 1,
      backgroundColor: Colors.primary
  },
  marktext: {
    fontSize: 16,
    color: Colors.white
    },
    markview: {
        position: 'absolute',
        right: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: Colors.skyblue,
        top: 24
    }
})