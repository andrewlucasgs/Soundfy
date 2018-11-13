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
import music from '../constants/Api'

export default class LibraryScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            musics: music,
            albuns: this.groupBy(music, "album")
        };
    }

    updateState() {
        this.setState({ musics: music })
    };

    groupBy(collection, property) {
        var i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    };

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {this.state.albuns.map(music => {
                            return (
                                <TouchableOpacity key={music[0].name} style={styles.music}>
                                    <Text style={styles.items}>{music[0].album}</Text>
                                    <TouchableOpacity onPress={() => { console.log(music); this.updateState() }} style={{ padding: 10, backgroundColor: 'gray' }}>
                                        <Text style={{ fontSize: 30, color: 'green' }}>+</Text>
                                    </TouchableOpacity>
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
        fontSize: 25,
        alignSelf: 'center',
        paddingLeft: 20,
    },
    music: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingTop: 30,
    },
});
