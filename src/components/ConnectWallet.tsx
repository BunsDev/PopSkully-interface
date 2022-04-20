import { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { checkNetwork } from '../functions/ethersFunctions';

declare const window:any;

function ConnectWallet() {
  
  const [state, dispatch]:any = useContext(Context);

  useEffect(() => {
    console.log('walletContextDetected: ', state.walletContextDetected);
  }, [state.walletContextDetected]);

  const connectWalletFunction = async () => {

    if (window.ethereum !== undefined && !checkNetwork()) {
      console.log("wallet connect error");
      return;
    }

    const foundAddress = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log(foundAddress);

    if (foundAddress[0] !== undefined){
      dispatch({ type:'walletAddress', content: foundAddress[0] });
    }
  }

  return (
    <button className="connect-btn" onClick={connectWalletFunction}>
      { state.walletAddress === "" ? "Connect" : "Connected" }
    </button>
  );
}

export default ConnectWallet;
