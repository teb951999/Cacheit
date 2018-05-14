import R from 'ramda';
import { Platform } from 'react-native';
import { networkConnectivityTypes, limits } from '../constants';

const always_on_url = 'https://www.httpbin.org/ip';

const requestOptions = {
    cache: 'no-cache',
    credentials: 'omit',
    // eslint-disable-next-line
    headers: new Headers({
        'Content-Type': 'application/json',
        'User-Agent': `${Platform.OS}/Cacheit/1.0.0`,
    })
};

// Make request and return json results - I could and should throttle this later
export const makeRequest = _makeRequest;

function _makeRequest (url) {
    return fetch(url).then(response => response.json()); // PROMISE
}