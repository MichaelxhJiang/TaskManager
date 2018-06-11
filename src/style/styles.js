import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
    editorFade: {
        position: 'absolute',
        width: 300,
        height: 400,
        top: 40,
        alignSelf:'center',
    },
    listStyle: {
        alignSelf: 'stretch',
        paddingVertical: 8
    },
    buttonStyle: {
        position: 'absolute',
        bottom: '2%',
        right: '2%',
        //backgroundColor: '#AAA',
    },
    imageStyle: {
        width: 60,
        height: 60
    },
    category: {
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
        paddingLeft: 20,
        borderRadius:10
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
        borderRadius:10
    },
    listItem: {
        height: 75,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius:10
    },
    editorTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});