import React, {Component} from "react";
import {View, TextInput, Button} from 'react-native'
import styles from '../style/styles.js';

export default class Editor extends Component {
    constructor() {
        super();
        this.state = {
            text : "",
        }
    }

    addTask(name) {
        let task = {
            name: name,
            priority: 4,
            category: 0,
        };
        this.props.addTask(task);
        this.props.changeInputVisible();
    }

    render() {
        console.log("INPUT RENDER");
        return (
            <View
                style={{justifyContent:'center', alignSelf:'center', flex:1, backgroundColor: '#444', width: 250, height: 400, borderRadius:14}}
            >
                <TextInput
                    style={{
                        position: 'absolute',
                        height: 40,
                        width: 200,
                        top: 40,
                        alignSelf:'center',
                    }}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    autoFocus={true}
                />
                <Button
                    title="Add Task"
                    onPress= {
                        this.addTask.bind(this, this.state.text)
                    }
                />
            </View>
        )
    }
}