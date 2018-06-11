import React, {Component} from "react";
import  { TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <Icon
                name='md-add-circle'
                color='#005AAA'
                size={80}
            />
        </TouchableOpacity>
    }
}