import axios from 'axios';

const limit = 20;
const owner = '0x960DE9907A2e2f5363646d48D7FB675Cd2892e91';
export const getCollectionList = (offset) => {
	return axios.get('https://api.opensea.io/api/v1/assets', {
		params: {
			format: 'json',
			limit,
			offset,
			owner
		}
	});
};

export const getDetail = (address, tokenId) => {
	return axios.get(`https://api.opensea.io/api/v1/asset/${address}/${tokenId}`);
};
