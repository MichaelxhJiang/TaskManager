import React, {Component} from "react";
import  { TouchableOpacity, Image} from 'react-native';
import styles from '../style/styles.js';

export default class AddTaskButton extends Component {
    changeInputVisible() {
        console.log("Change inputVisible");
        this.props.changeInputVisible();
    }

    render() {
        return <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.changeInputVisible.bind(this)}
            title="Add Task"
            color="#6395d1"
            accessibilityLabel="Add Task"
        >
            <Image
                style={styles.imageStyle}
                source={require('../assets/images/plus-button.png')}
            />
        </TouchableOpacity>
    }
}