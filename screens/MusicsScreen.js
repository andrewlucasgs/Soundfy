import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'expo';

export default class LibraryScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    render() {
        artists = [
            {
                name: 'Alt-J',
                musics: [
                    {
                        name: 'Matilda',
                        duration: '3:57',
                        favorite: true,
                    },
                    {
                        name: 'Cold Blood',
                        duration: '3:57',
                        favorite: false,
                    },
                    {
                        name: 'Deadcrush',
                        duration: '3:57',
                        favorite: true,
                    }
                ]
            }
        ]
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {artists[0].musics.map(music => {
                        return (
                            <TouchableOpacity style={styles.music}>
                                <Text style={styles.items}>{music.name}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    items: {
        color: '#fff',
        alignSelf: 'center',
        paddingLeft: 20,
    },
    music: {
        flexDirection: 'row',
        padding: 10,
    },
    contentContainer: {
        paddingTop: 30,
    },
});
