import React, {Component} from "react";
import  { Platform, View, Text, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../style/styles.js';
import Swipeable from 'react-native-swipeable';

export default class Categories extends Component {
    constructor (props) {
        super(props)
        this.state = {
            items: [],
            curIndex: 0,
            categories: null,
        }
    }
    componentDidMount () {
        this.setState({
            items: this.props.categories
        })
    }

    changeCategoryView(index) {
        console.log("INDEX " + index);
        this.props.changeCategoryView(index);
        this.setState({curIndex : index});
    }

    componentDidUpdate(prevProps) {
        if (Platform.OS === 'ios' && prevProps.index !== this.props.index && this.props.index !== this.state.curIndex) {
            this.swiper.scrollBy(this.props.index - this.state.curIndex, true)
        }
    }

    render() {
        let { categories } = this.props;
        let obj = [{
            title: "Hello",
            subtitle: "World",
            bg: require('../assets/images/bg5.jpeg')
        }]



        return (
            <View style={{flex:1}}>
                    <Swiper
                        onIndexChanged={(index) => this.changeCategoryView(index)}
                        loop={false}
                        ref={(ref) => {this.swiper = ref}}
                        index={0}
                        showsPagination = {false}
                        loadMinimalSize = {1}
                    >
                        {
                            this.props.categories.map((item, index) => {
                                //console.log(item.title + " " + item.subtitle + " " + index);
                                if (index === 4) {

                                }
                                return (
                                    <View style={styles.category} key={index}>
                                        <ImageBackground source = {item.bg}
                                                         style = {{
                                                             height:'100%',
                                                             width:'100%',
                                                             alignItems: 'center',
                                                             justifyContent: 'center',
                                                             flexDirection: 'column',
                                                             borderRadius:10,
                                                         }}>
                                            <Text style={styles.categoryTitle}>{item.title}</Text>
                                            <Text style = {styles.categorySubTitle}>{item.subtitle}</Text>
                                        </ImageBackground>
                                    </View>
                                )
                            })
                            /*
                            this.state.items.map((item, key) => {
                                return (
                                    <View key={key} style={item.css}>
                                        <Text style={styles.text}>{item.title}</Text>
                                    </View>
                                )
                            })*/
                        }
                    </Swiper>
                </View>
        )
    }
}