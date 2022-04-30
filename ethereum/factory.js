import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7f87F4f26E6D3aED7a59cEA6CA871F4444867203'
);

export default instance;