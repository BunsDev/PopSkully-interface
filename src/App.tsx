import React, { useContext, useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import discord_img from "./images/discord.png";
import twitter_img from "./images/twitter.png";
import popskully from "./images/vector-logo.png";
import menu_img from "./images/menu.png";
import gallery from "./images/gallery.png";
import nftkey from "./images/nftkey.png";
import mace from "./images/mace.png";
import funeral from "./images/funeral.png";
import logo from "./images/skullys-logo.png";
import mm_logo from "./images/metamask-logo.png";

import { mint, checkTotalSupply, initializeEthers, checkForWhitelistMint } from "./functions/ethersFunctions";
import ConnectWallet from "./components/ConnectWallet";
import { Context } from "./Store";

const menuToggle = () => {
    const navlinks = document.querySelector('.nav-links');
    navlinks?.classList.toggle('mobile-menu');
}
function App() {

  //const [active, setActive] = React.useState("Public");
  const [state, dispatch]:any = useContext(Context);
  const [spendInput, setSpendInput] = useState('');

  useEffect(() => {
    async function getInit() {
        await initializeEthers(dispatch);
    }
    getInit();
  },[]);

  useEffect(() => {
    async function getSupply() {
        await checkTotalSupply(dispatch);
        await checkForWhitelistMint(dispatch);
    }
    getSupply();
  },[state.walletAddress]);

  return (
    <Router>
    <div className="App">
           <nav className="navbar">
                <h1 className="logo"><a>POP SKULLYS</a></h1>
                <ul className="nav-links">
                    <li><a href="https://thecult.gitbook.io/welcome/">The Cult</a></li>
                    <li><a href="https://fantomgallery.com">Gallery</a></li>
                    <li><Link to="/"><ConnectWallet/></Link></li>
                </ul>
                <img src={menu_img} alt="" className="menu-btn" onClick={menuToggle}/>
            </nav>
            <header>
            <div>
            <section className="drops">
            <div className="title">
            <h1>Join the cult.</h1>
            <h2>{state.totalPopsSupply}/3,333</h2>
            </div>
            <div className="row">
                <div className="col">
                <div className="mint-text">
                    <h4>Summon a Pop Skully to join the cult</h4>
                    {
                            !state.walletAddress ? <h3>Connect your wallet to summon</h3> : 
                            state.walletAddress && state.isWhitelisted ? 
                            <>
                                <h4>You are on the list. Cast your spell for free.</h4>
                                <br/>
                                <button onClick={() => mint(dispatch, 1)}  disabled={false}>Summon</button>
                            </>
                            :
                            <>
                                <input type="number" value={spendInput} onInput={e => setSpendInput((e.target as HTMLInputElement).value)} placeholder="Amount: Max of 5"/>
                                <br/>
                                <br/>
                                <button onClick={() => mint(dispatch, spendInput)}  disabled={false}>Summon</button>
                            </>
                    }
                    <h4>Each Pop Skully is 50 FTM</h4>
                </div>
                </div>
                <div className="col">
                </div>
            </div>

            <img className="pop-skully"src={popskully} alt=""/>
            </section>
            </div>
            </header>
            <section className="info">

                <h1>3,333 Unique Pop Skullys</h1>
                <h4>Pop Skullys are a collection of 3,333 randomly generated collectibles made from hundreds of traits designed by Funeral. The Cult is real. We are here for the art. We are here for the tech.</h4>
                
            </section>
            <section className="wallets">
            <div className="wallet-cards">
            <div className="row">
                <div className="col">
                    <h1>Are you new to Web3?</h1>
                    <p>You can use a wallet like Metamask to safely store your FTM and other crypto currencies. This wallet will be installed as a browser extension and serve as your account as you explore new projects.</p>

                </div>
                <div className="card">
                    <img src={mm_logo} alt=""/>
                    
                        <p>Metamask is the most popular software wallet and browser extension. Metamask allows you to store mainnet FTM and interact with Fantom dApps.</p>
  
                    <div className='card-links'>
                    <ul>
                    <li><a href="https://metamask.io">Download Metamask </a></li>
                    <li><a href="https://docs.fantom.foundation/tutorials/set-up-metamask">Set up Metamask on Fantom</a></li>
                    </ul>
                    </div>
                </div>
            </div>
            </div>
            </section>
            <section className="team">
            <div className="team-members">
            <h1>The Team</h1>
            <div className="row">
                <div className="col">
                <a href="https://twitter.com/yolofinancial"><img className="team-member" src={funeral} alt=""/></a>
                <h3>Funeral</h3>
                <h4>Designer/ Dev</h4>
                </div>
                <div className="col">
                <a href="https://twitter.com/CryptoMacePapa"><img className="team-member" src={mace} alt=""/></a>
                <h3>Mace Papa</h3>
                <h4>Dev</h4>
                </div>
            </div>
            </div>
            <h4>Special thanks to Larkin, Tombheads, Elle, Dream, Degatchi, Maxflow, Xona, The Empire, and our cult members.</h4>
            </section>
            <section className="card-section">
            <a href="https://fantomgallery.com"><div className="join">
                <h1>Fantom Gallery</h1>
                <Switch>
                    <Route exact path="/">
                    <div className="card">
                    <img src={logo} alt=""/>
                    <div className="bottom-card">
                    <button>Enter</button>
                    </div>
                    </div>
                    </Route>
                </Switch>
                <p>Explore the current exhibition</p>
            </div></a>
            </section>
            <section className="footer">
                <div className="social-links">
                    <a href="https://twitter.com/CultNFTs"><img src={twitter_img} alt=""/></a>
                    <a href="https://discord.com/eBHpwv9yGW"><img src={discord_img} alt=""/></a>
                    <a href="https://fantomgallery.com"><img src={gallery} alt=""/></a>
                    <a href="https://fantomgallery.com"><img src={nftkey} alt=""/></a>
                  </div>
            </section>
        </div>
        </Router>
    );
}

export default App;
