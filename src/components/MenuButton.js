import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuButton extends Component {
    toggleMenu() {
        console.log("Hello");
        this.props.toggleMenu();
    }

    render() {
        return (
            <View style={{position:'absolute', top:'6%', left:'2%'}}>
                <TouchableOpacity
                    onPress={this.toggleMenu.bind(this)}
                >
                    <Icon
                        name='md-menu'
                        size={40}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}