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
        };
        this.props.addTask(task);
    }

    render() {
        console.log("INPUT RENDER");
        return (
            <View>
                <TextInput
                    style={styles.inputTextStyle}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    autoFocus={true}
                />
                <Button
                    title="Add Task"
                    onPress= {this.addTask.bind(this, this.state.text)}
                />
            </View>
        )
    }
}