"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Get a Web3 instance for the contracts
let contractProvider = new Web3('https://muddy-fragrant-firefly.matic.quiknode.pro/');

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;

// Current chainID
let chainId;

// Address of the selected account
let selectedAccount;

// Wheat ABI code
let wheatABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"controller","type":"address"}],"name":"addController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hardcap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"controller","type":"address"}],"name":"removeController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Minter Contract ABI code
let minterABI = [{"inputs":[{"internalType":"address","name":"_wheat","type":"address"},{"internalType":"address payable","name":"_generator","type":"address"},{"internalType":"address","name":"_vrfcoordinator","type":"address"},{"internalType":"address","name":"_linkToken","type":"address"},{"internalType":"uint256","name":"_maxTokens","type":"uint256"},{"internalType":"bytes32","name":"_keyhash","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"success","type":"bool"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Response","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAID_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"SendTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_dummy","type":"string"}],"name":"changeDummyURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_generator","type":"address"}],"name":"changeGenerator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"characters","outputs":[{"internalType":"contract ICharacter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dummyURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"existingCombinations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"contract Generator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenComponents","outputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_tokenId","type":"uint16"}],"name":"getTokenSeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mintCost","outputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"revealToken","outputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"t","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"seedRequests","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenCharacteristic","outputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"tokenSeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wheat","outputs":[{"internalType":"contract WHEAT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

// Generator Contract ABI code
let generatorABI = [{"inputs":[{"internalType":"address","name":"_base64contract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"success","type":"bool"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Response","type":"event"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"SendTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"_componentType","type":"string"},{"internalType":"string","name":"_value","type":"string"}],"name":"attributeForTypeAndValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"b","outputs":[{"internalType":"contract base64mod","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"uint8","name":"_id","type":"uint8"},{"internalType":"uint8","name":"_charclass","type":"uint8"}],"name":"checkAllowedComponent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"s","type":"tuple"},{"internalType":"uint256","name":"_getpaindTokens","type":"uint256"}],"name":"compileAttributes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"componentData","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"png","type":"string"},{"internalType":"uint8","name":"score","type":"uint8"},{"internalType":"uint8","name":"allowed","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"componentElementIDs","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"componentsTypes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_componentType","type":"uint8"}],"name":"deleteLastComponent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"png","type":"string"},{"internalType":"uint8","name":"score","type":"uint8"},{"internalType":"uint8","name":"allowed","type":"uint8"}],"internalType":"struct Generator.Component","name":"_component","type":"tuple"}],"name":"drawPNG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"s","type":"tuple"}],"name":"drawSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_id","type":"uint8"}],"name":"getComponentElemendIds","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"uint8","name":"_id","type":"uint8"}],"name":"getcomponentScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"seed","type":"uint16"},{"internalType":"uint8","name":"traitType","type":"uint8"},{"internalType":"uint8","name":"_class","type":"uint8"}],"name":"selectTrait","outputs":[{"internalType":"uint8","name":"traitId","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"seed","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"selectTraits","outputs":[{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"t","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"components":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"uint8","name":"base","type":"uint8"},{"internalType":"uint8","name":"eyes","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"cloth","type":"uint8"},{"internalType":"uint8","name":"boots","type":"uint8"},{"internalType":"uint8","name":"hat","type":"uint8"},{"internalType":"uint8","name":"beard","type":"uint8"},{"internalType":"uint8","name":"shield","type":"uint8"},{"internalType":"uint8","name":"weapon","type":"uint8"},{"internalType":"uint256","name":"charisma","type":"uint256"}],"internalType":"struct ICharacter.Character","name":"s","type":"tuple"},{"internalType":"uint256","name":"_getpaindTokens","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_componentType","type":"uint8"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_base64encodedPNG","type":"string"},{"internalType":"uint8","name":"_score","type":"uint8"},{"internalType":"uint8","name":"_allowed","type":"uint8"}],"name":"uploadComponent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// Show Token Image
async function  showTokenImage(tokenID){
  let tokenURI =  await new contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.tokenURI(tokenID).call();
  return tokenURI;
}

/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if(location.protocol !== 'https:') {
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // For WalletConnect
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Live
        key: "pk_live_E5C42FBC60E22802"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  document.querySelector("#accoutname").textContent = selectedAccount.substring(0,4) + "..." + selectedAccount.slice(-4);

  // Go through all accounts and get their $Wheat balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await new contractProvider.eth.Contract(wheatABI, '0x98dd4371579d35883BF37c84666b0300Ea619fFa').methods.balanceOf(address).call();

    let minted = await new  contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.minted.call().call();
      console.log("Total Minted: " + minted);
      document.querySelector("#progress-number").textContent = minted + "/10,000";
      document.getElementById('minprogress').style.width = minted / 100 +'%';
      document.querySelector("#minprogress").ariaValueNow = minted;

    if(minted >= 10000)
    {
      document.querySelector("#mintButton").setAttribute("disabled", "disabled");
    }

    // Getting NFT Balances
    const nftBalance = await new contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.balanceOf(address).call();
    console.log("NFT BALANCE: " + nftBalance);
    // Getting each tokenID
    const  userTokens = [];
    for(let i=0; i < nftBalance; i++)
    {
      userTokens.push(await new contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.tokenOfOwnerByIndex(address, i).call());
      console.log(i + " => " + userTokens[i]);
    }

    // Check that each token is revealed
    const  isRevealed = [];
    for(let i=0; i < userTokens.length; i++)
    {
      console.log("Checking revealed token!");
      let traits = await new contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.getTokenComponents(userTokens[i]).call();
      if(traits[0] == 0 && traits[1] == 0 && traits[2] == 0 && traits[3] == 0 && traits[4] == 0 && traits[5] == 0 && traits[6] == 0 && traits[7] == 0 && traits[8] == 0)  // => All traits 0 means still not defined.
      {
        isRevealed.push(false);
      }
      else
      {
        isRevealed.push(true);
      }

      console.log(i + " => " + isRevealed[i]);
    }

    //Check that reveal is enabled
    let revealEnabled = await new contractProvider.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.reveal.call().call();

    // Chech that user has any item
    let InventoryOutput;
    if(userTokens.length > 0)
    {
      //Inventory outoutput
      InventoryOutput = "<div class=\"row\">";

      for(let i=0; i < userTokens.length; i++)
      {
        // Check revealed or not
        if(isRevealed[i])
        {
         // If character is already revealed, group as roles and ask for staking. TO BE DONE!
        }
        else
        {
          InventoryOutput = InventoryOutput + "<div class=\"container\" style=\"width: 288px; height: 526px; margin: 1rem; background-image: url('holder.png'); background-repeat:no-repeat;\"><br><br><img style=\"width: 212px; height: 212px;\" src=\"./unrevealed.png\" class=\"card-img-top\" alt=\"Unknown Citizen\"><div class=\"card-body\"><p class=\"card-text\">#" + i + "<br>Reveal to see its attributes.</div><br><div class=\"card-footer\"><button class=\"btn btn-warning\" ";
          // If reveal is not enabled, render button as disabled
          if(!revealEnabled)
          {
           InventoryOutput = InventoryOutput + "disabled";
          }
          InventoryOutput = InventoryOutput + ">Reveal</button></p></div></div>";
        }
      }
      InventoryOutput = InventoryOutput + "</div>";
    }
    else
    {
      InventoryOutput = "<div class=\"alert alert-warning\" role=\"alert\"\>Your inventory is empty! You can mint a citizen or buy from <a href=\"https://opensea.io/collection/feudal-citizens\" target=\"_blank\">@opensea</div>";
    }
    document.getElementById("inventory").innerHTML = InventoryOutput;
    document.getElementById("inventory-count").innerHTML = userTokens.length;
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    // Get balance
    document.querySelector("#accountbalance").style.visibility = "visible";
    document.querySelector("#wheatBalance").textContent = humanFriendlyBalance;
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.visibility = "hidden";
  document.querySelector("#connected").style.visibility = "visible";
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.visibility = "hidden";
  document.querySelector("#prepare").style.visibility = "visible";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled");
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled");
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Mint token when mint button pressed.
 */
 async function onMint() {
    // Check user is on Polygon Network or Noy by ChainID
    if(chainId == 137)
    {
      // Get a Web3 instance for the wallet
      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      let mintAmount = parseInt(document.querySelector("#mintcount").value);

      if(mintAmount > 10)
      {
        mintAmount = 10;
      }

      let mintCost = parseInt(document.querySelector("#mintcost").value) * 10 ** 18;

      let _gasPrice = await web3.eth.getGasPrice();

      await  new web3.eth.Contract(minterABI, '0x46B1c44f79ab48a9Dc6fF0D98984e9Ca02D277BA').methods.mint(mintAmount).send({from: accounts[0], gasPrice: _gasPrice, gas: 3000000, value: mintCost});

      await refreshAccountData();
    }
    else
    {
      // Force user to switch to Polygon
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }],
        });

        // Call Mint again
        onMint();
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x89',
                  chainName: 'Polygon Mainnet',
                  rpcUrls: ['https://polygon-rpc.com/'] ,
                  nativeCurrency: {
                    name: 'POLYGON',
                    symbol: 'MATIC', // 2-6 characters long
                    decimals: 18
                  },
                },
              ],
            });

            // Call Mint again
            onMint();
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
 }
/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.visibility = "visible";
  document.querySelector("#connected").style.visibility = "hidden";
}

// Increase mint amount
function increaseMintAmount()
{
  if(parseInt(document.querySelector("#mintcount").value) < 10)
  {
    document.querySelector("#mintcount").value = parseInt(document.querySelector("#mintcount").value) + 1;
    document.querySelector("#mintcost").value = parseInt(document.querySelector("#mintcount").value) * 10;
  }
}

//Decrease mint amount
function decreaseMintAmount()
{
  if(parseInt(document.querySelector("#mintcount").value) > 1)
  {
    document.querySelector("#mintcount").value = parseInt(document.querySelector("#mintcount").value) - 1;
    document.querySelector("#mintcost").value = parseInt(document.querySelector("#mintcount").value) * 10;
  }
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#mintButton").addEventListener("click", onMint);
  document.querySelector("#addmintcount").addEventListener("click", increaseMintAmount);
  document.querySelector("#minusmintcount").addEventListener("click", decreaseMintAmount);
});