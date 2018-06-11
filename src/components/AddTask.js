import React, {Component} from "react";
import {View, TextInput, FlatList, Text} from 'react-native'
import {Button} from 'react-native-elements'
import styles from '../style/styles.js';
import CategoryButton from './CategoryButton.js';
require('datejs');

export default class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            currentCategory: null,
            currentIndex: 0,
        }
    }

    addTask(name) {
        let d = null;
        let flag = true;
        if (name) {
            let arr = name.split(" ");
            console.log(arr);
            for (let i = 0; i < arr.length && flag; i++) {
                for (let j = arr.length - 1; j >= i && flag; j--) {

                    let str = "";
                    for (let k = i; k <= j; k++) {
                        str += arr[k] + " ";
                    }

                    if (Date.parse(str)) {
                        d = new Date(Date.parse(str));
                        console.log("SUCCESS " + d + " " + str);
                        flag = false;
                    }
                }
            }
        }

        let task = {
            name: name,
            priority: 4,
            category: this.state.currentIndex,
            date: d,
        };
        this.props.addTask(task);
        this.props.changeInputVisible();
    }

    selectCategory(title, id) {
        this.setState({currentCategory: title});
        this.setState({currentIndex: id});
    }

    render() {
        console.log("INPUT RENDER");
        return (
            <View
                style={{justifyContent:'center', alignSelf:'center', flex:1, flexDirection: 'column', backgroundColor: '#444', width: 300, height: 400, borderRadius:10}}
            >
                <View style = {{flex:1}}>
                    <Text style = {[styles.editorTitle,{top:20}]}>
                        Task
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
                        onChangeText={(text) => this.setState({text})}
                        placeholder={this.props.placeholder}
                        value={this.state.text}
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                    />

                    <Text style = {[styles.editorTitle,{top:70}]}>
                        Category
                    </Text>
                    <View style = {{height:160, alignSelf: 'center', top: 80}}>
                        <FlatList
                            numColumns={2}
                            style = {{alignSelf:'center'}}
                            data = {this.props.categories}
                            keyExtractor = {(item, index) => index}
                            renderItem={({item, index}) => (
                                <CategoryButton
                                    title = {item.title}
                                    currentCategory = {this.state.currentCategory}
                                    selected = {index === 0 && !this.state.currentCategory ? true : item.title === this.state.currentCategory}
                                    index = {index}
                                    selectCategory = {this.selectCategory.bind(this)}
                                />
                            )}
                        />
                    </View>
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
                    title="Add Task"
                    onPress= {
                        this.addTask.bind(this, this.state.text)
                    }
                />
            </View>
        )
    }
}