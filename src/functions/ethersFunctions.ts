import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from '../Store';
import popsABI from '../contractABIs/popsABI.json';


declare const window:any;
let provider:any = undefined;
let popsContract:any = undefined;
const FANTOM_NETWORK_ID = "250";

//Provider and Initialization
export const initializeEthers = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const addr = await signer.getAddress();

    if (window.ethereum.networkVersion === FANTOM_NETWORK_ID) {
      dispatch({type:"onFantomNetwork", content:true});
    }
    dispatch({type: 'walletContextDetected', content: true });
    dispatch({type: 'triggerAll', content: false});

    popsContract = new ethers.Contract(
      "0x1b60B6daA371F5066bd8C1DC032627bf1f4E95df",
      popsABI,
      signer
    );

    console.log(popsContract);

    return addr;
  } catch (error) {
    console.log(error);
    dispatch({type: 'walletContextDetected', content: false });
    dispatch({type:"onFantomNetwork", content: false});
    return undefined;
  }
}

export const checkNetwork = () => {
  try {
    return (window.ethereum.networkVersion === FANTOM_NETWORK_ID);
  } catch {
    return false;
  }
}

export const checkTotalSupply = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const supplyOfPops = await popsContract.totalSupply();
    //console.log(supplyOfPops.toNumber());
    dispatch({type: 'totalPopsSupply', content: supplyOfPops.toNumber()});
  } catch(error) {
    return console.log(error);
  }
}

export const checkForWhitelistMint = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    let isWhitelisted = false;
    const signer = provider.getSigner(0);
    const userAddress = signer.getAddress();
    const whitelistNumber = await popsContract.whitelistedAddresses(userAddress);
    console.log(whitelistNumber.toNumber());
    if(whitelistNumber.toNumber() === 1) {
      isWhitelisted = true;
    }
    dispatch({type: 'isWhitelisted', content: isWhitelisted});
    return isWhitelisted;
  } catch(error) {
    return console.log(error);
  }

}

export const mint = async (dispatch:any, amountToMint:any) => {
  try {
    let amountToPayFor = amountToMint as number;
    const ftmAddress = '0x0000000000000000000000000000000000000000'
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const isWhitelisted = await checkForWhitelistMint(dispatch);
    console.log(isWhitelisted);
    if(isWhitelisted) {
      amountToPayFor--;
      console.log("Made it in the if statement");
    }
    console.log(amountToPayFor);
    const signer = provider.getSigner(0);
    const cost = 50;
    const totalyPayout = cost * amountToPayFor;
    let gasLimitForTx = amountToPayFor * 280000;
    if(amountToPayFor === 0) {
        gasLimitForTx = gasLimitForTx + 250000;
    }
    console.log(totalyPayout);
    try {
      const connectedpopsContract = await popsContract.connect(signer);
      const tx = await connectedpopsContract.mint(ftmAddress, amountToMint,
        {gasLimit: gasLimitForTx, "value": ethers.utils.parseUnits(totalyPayout.toString(),'ether')}
      );
    } catch(error) {
      return console.log(error);
    }
  } catch(error) {
    return console.log(error);
  }
}