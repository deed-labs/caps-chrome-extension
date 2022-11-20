import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Buffer } from 'buffer';
import { CONTRACT_NAME, MAINNET_CONFIG, TESTNET_CONFIG } from './config';
import { connect, Contract, WalletConnection } from 'near-api-js';
import { HUB_OPTIONS, NearWallet } from './lib/wallet/near/wallet';

const initContract = async () => {
  let config =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? TESTNET_CONFIG
    : TESTNET_CONFIG; // FIXME: replace with mainnet config

  const nearConnection = await connect(config);
  const walletConnection = new WalletConnection(nearConnection, "CAPS");

  const contract = new Contract(
    walletConnection.account(),
    CONTRACT_NAME,
    HUB_OPTIONS
  );

  return {wallet: new NearWallet(walletConnection, contract)}
}

(window as any).nearInitPromise = initContract()
  .then(({wallet}) => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <CssBaseline />
        <App wallet={wallet}/>
      </React.StrictMode>
    );
});

window.Buffer = Buffer;
