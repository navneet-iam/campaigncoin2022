// import Web3 from "web3";
 
// window.ethereum.request({ method: "eth_requestAccounts" });
 
// const web3 = new Web3(window.ethereum);
 
// export default web3;
import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser AND metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);     // copy of web3 that was injected by metamask-->provider
    /*web3 = new Web3(window.web3.currentProvider) */
} else {
  // We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/4e0c0f78dbcb4e01ad75d2a93d5f4911"     // set up own provider that connect rinkey test network through infura
  );
  web3 = new Web3(provider);
}
 
export default web3;