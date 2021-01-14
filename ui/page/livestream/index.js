import { connect } from 'react-redux';
import { doResolveUri, makeSelectClaimForUri } from 'lbry-redux';
import LivestreamPage from './view';

const LBRY_URL_FOR_LIVESTREAM = 'lbry://@SaltyCracker#a/30-thousand-troops-take-over-dc-for-most#3';
const BITWAVE_URL = 'https://bitwave.tv/embed/doomtube';

const select = state => ({
  uri: LBRY_URL_FOR_LIVESTREAM,
  bitwaveUrl: BITWAVE_URL,
  claim: makeSelectClaimForUri(LBRY_URL_FOR_LIVESTREAM)(state),
});

export default connect(select, {
  doResolveUri,
})(LivestreamPage);
