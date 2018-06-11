import React, {Component} from "react";
import  { View, Text, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../style/styles.js';
import Swipeable from 'react-native-swipeable';

export default class Categories extends Component {
    changeCategoryView(index) {
        this.props.changeCategoryView(index);
    }
    render() {
        return (
            <View style={{height:'40%', borderRadius:10}}>
                    <Swiper
                        onIndexChanged={(index) => this.changeCategoryView(index)}
                        loop={false}
                    >
                        {
                            this.props.categories.map((item, index) => {
                                return (
                                    <View style={item.css} key={index}>
                                        <ImageBackground source = {require('../assets/images/bg2.jpg')}
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
                        }
                    </Swiper>
                </View>
        )
    }
}