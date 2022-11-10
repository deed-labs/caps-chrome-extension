import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as nearAPI from 'near-api-js';
import { CONTRACT_NAME, MAINNET_CONFIG, TESTNET_CONFIG } from './config';
import { connect, Contract, WalletConnection } from 'near-api-js';

const HUB_OPTIONS = {
  changeMethods: ["create_soulbound", "update_soulbound"],
  viewMethods: ["get_soulbound_id_for_account"],
};

const SBT_OPTIONS = {
  changeMethods: [],
  viewMethods: ["get_metadata"],
};

const initContract = async () => {
  let config =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? TESTNET_CONFIG
    : MAINNET_CONFIG;

  const nearConnection = await connect(config);
  const walletConnection = new WalletConnection(nearConnection, "CAPS");

  const contract = new Contract(
    walletConnection.account(),
    CONTRACT_NAME!,
    HUB_OPTIONS
  );

    return { contract }
}

(window as any).nearInitPromise = initContract()
  .then(({contract}) => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <CssBaseline />
        <App contract={contract}/>
      </React.StrictMode>
    );
  });