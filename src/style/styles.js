import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
    inputTextStyle: {
        position: 'absolute',
        height: 40,
        width: '80%',
        top: 40,
        alignSelf:'center',
        backgroundColor: '#AAA',
    },
    inputTextStyleFade: {
        position: 'absolute',
        height: 40,
        width: '80%',
        top: 40,
        alignSelf:'center',
    },
    listStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#EAEAEA',
        paddingVertical: 8
    },
    buttonStyle: {
        position: 'absolute',
        bottom: '5%',
        right: '2%',
        //backgroundColor: '#AAA',
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    category: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    categorySubTitle: {
        color: '#fff',
        fontSize: 18,
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    listItem: {
        height: 75,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
});