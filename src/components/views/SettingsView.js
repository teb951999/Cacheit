import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TBIcon from '../TBIcon';
import { connect } from 'react-redux';
import { routeNames } from '../../nav/routes';
import MagicButton from '../../util/dev/MagicButton';
import actions from '../../store/actions';
import { fetchSubreddit } from '../../util/requestHelper';

function mapStateToProps(state) {
    return {
        subs: state.subreddits,
        reduxState: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSub: sub => fetchSubreddit(sub, dispatch),
        addSub: (sub, comments) => dispatch(actions.addSubreddit(sub, comments)),
        causeError: () => dispatch({ type: 'ERROR' }),
    };
}

class SettingsView extends Component {

    constructor(props) {
        super(props);
        const { addSub } = this.props;
    }

    makeid = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }

    magicPress = (event) => {
        const { addSub, fetchSub } = this.props;
        addSub(this.makeid());
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a settings page. It would presumably do something if it came to that.
                </Text>
                { __DEV__ && <MagicButton onPress={this.magicPress} /> }
                <View style={{ flex: 1 }}>
                    <Text>
                        { JSON.stringify(this.props.reduxState) }
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
