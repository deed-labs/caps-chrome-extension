import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, Container, Link, Stack, styled, ThemeProvider } from '@mui/material';
import ProfilePage from './components/Profile';
import theme from './theme';
import SearchBar from './components/SearchBar';
import { IWallet } from './lib/wallet';

const App = ({wallet}: IAppProps) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [address, setAddress] = useState<string>(urlParams.get("address") ?? "");

  return (
   <ThemeProvider theme={theme}>
      <Box p={2}>
        <Stack direction="column" alignItems="center" gap={5}>
          <SearchBar setValue={setAddress} />
          <ProfilePage address={address} wallet={wallet} />
        </Stack>
      </Box>
   </ThemeProvider>
  );
}

interface IAppProps {
  wallet: IWallet;
}

export default App;
