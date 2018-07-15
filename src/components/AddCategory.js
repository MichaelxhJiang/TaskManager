import React, {Component} from "react";
import {View, TextInput, FlatList, Text} from 'react-native'
import {Button} from 'react-native-elements'
import styles from '../style/styles.js';
import CategoryButton from './CategoryButton.js';
require('datejs');

export default class AddCategory extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            subTitle:"",
        }
    }

    addCategory(title, subtitle) {
        const { categories } = this.props.categories;
        for (let i = 0; i < categories; i++) {
            if (categories[i].title === title) {
                return;
            }
        }

        let cat = {
            title: title,
            subtitle: subtitle,
            css : styles.category,
            bg: require('../assets/images/bg4.jpg')
        };

        this.props.addCategory(cat);
        this.props.changeInputVisibleCat();
    }

    render() {
        console.log("INPUT RENDER");
        return (
            <View
                style={{justifyContent:'center', alignSelf:'center', flex:1, flexDirection: 'column', backgroundColor: '#444', width: 300, height: 400, borderRadius:10}}
            >
                <View style = {{flex:1}}>
                    <Text style = {[styles.editorTitle,{top:20}]}>
                        Category Title
                    </Text>

                    <TextInput
                        style={{
                            position: 'absolute',
                            //height: 40,
                            width: 250,
                            top: 60,
                            alignSelf:'center',
                            color: 'white',
                            borderBottomWidth: 2,
                            borderBottomColor: 'white',
                            fontSize: 16,
                        }}
                        onChangeText={(title) => this.setState({title: title})}
                        placeholder={this.props.placeholder}
                        value={this.state.title}
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                    />

                    <Text style = {[styles.editorTitle,{top:70}]}>
                        Subtitle
                    </Text>

                    <TextInput
                        style={{
                            position: 'absolute',
                            //height: 40,
                            width: 250,
                            top: 120,
                            alignSelf:'center',
                            color: 'white',
                            borderBottomWidth: 2,
                            borderBottomColor: 'white',
                            fontSize: 16,
                        }}
                        onChangeText={(subTitle) => this.setState({subTitle: subTitle})}
                        placeholder={this.props.placeholder}
                        value={this.state.subTitle}
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <Button
                    titleStyle={{
                        fontFamily: 'bold',
                        fontSize: 18,
                    }}
                    buttonStyle={{
                        borderRadius: 10,
                        backgroundColor: '#005aaa',
                    }}
                    title="Add Category"
                    onPress= {
                        this.addCategory.bind(this, this.state.title, this.state.subTitle)
                    }
                />
            </View>
        )
    }
}