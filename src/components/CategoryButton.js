import React, {Component} from "react";
import {Button} from 'react-native-elements';
export default class CategoryButton extends Component {
    selectCategory(title, id) {
        this.props.selectCategory(title, id);
    }

    render() {
        const { title } = this.props;
        const { index } = this.props;
        const { selected } = this.props;

        return (
            <Button
                title={title}
                titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
                buttonStyle={selected ? { backgroundColor: '#005AAA', borderRadius: 100, width: 125 } : { borderWidth: 1, borderColor: 'white', borderRadius: 30, width: 125, backgroundColor: 'transparent' }}
                containerStyle={{ marginRight: 10, marginTop: 10}}
                onPress={this.selectCategory.bind(this, title, index)}
            />
        );
    }
}