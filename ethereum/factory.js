import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
 
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "PUT ADDRESS HERE AFTER DEPLOYING CONTRACT"
);
 
export default instance;