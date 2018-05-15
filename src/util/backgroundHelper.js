import R from 'ramda';
import actions from '../store/actions';
import { Platform, NetInfo } from 'react-native';
import BackgroundTask from 'react-native-background-task';
import DeviceInfo from 'react-native-device-info';

const getSubredditsToFetch = (subreddits, toTake) => R.map(R.prop('name'), R.take(toTake,R.sortBy(R.prop('lastFetched'), subreddits)));

async function backgroundTask(store) {
    const { dispatch, getState } = store;
    const { settings: { backgroundTask }, subreddits } = getState();

    const canRunCell = backgroundTask.fetchOverCellular || (await NetInfo.getConnectionInfo()).type === 'wifi';
    const canRunPower = backgroundTask.fetchOnBattery || true; // TODO

    const obj = DeviceInfo.getBatteryLevel().then(val => {
        let x = val;
        debugger;
    })

    if ((canRunCell && canRunPower) || __DEV__) {
        const subredditsToFetch = getSubredditsToFetch(subreddits, backgroundTask.subredditsToFetch);
    }

    BackgroundTask.finish();
}

export default backgroundTask;
