import React, {Component} from "react";
import  { View, Text, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../style/styles.js';

export default class Categories extends Component {
    changeCategoryView(index) {
        this.props.changeCategoryView(index);
    }
    render() {
        return (
            <View style={{height:200}}>
            <Swiper
                showsButtons
                onIndexChanged={(index) => this.changeCategoryView(index)}
                loop={false}
            >
                {
                    this.props.categories.map((item, index) => {
                        return (
                            <View style={item.css} key={index}>
                                <ImageBackground source = {require('../assets/images/bg1.jpg')}
                                                 style = {{flex:1, height:'100%', width:'100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
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