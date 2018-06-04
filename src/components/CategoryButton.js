import React, {Component} from "react";
import {Button} from 'react-native-elements';
export default class CategoryButton extends Component {
    constructor() {
        super();

        this.state = {
            selected: false
        };
    }

    componentDidMount() {
        const { selected } = this.props;

        this.setState({
            selected
        });
    }

    render() {
        const { title } = this.props;
        const { selected } = this.state;

        return (
            <Button
                title={title}
                titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
                buttonStyle={selected ? { backgroundColor: 'rgba(213, 100, 140, 1)', borderRadius: 100, width: 127 } : { borderWidth: 1, borderColor: 'white', borderRadius: 30, width: 127, backgroundColor: 'transparent' }}
                containerStyle={{ marginRight: 10 }}
                onPress={() => this.setState({ selected: !selected })}
            />
        );
    }
}