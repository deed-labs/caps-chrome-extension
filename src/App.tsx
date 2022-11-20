import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, Container, Link, Stack, styled, ThemeProvider } from '@mui/material';
import Profile from './components/Profile';
import theme from './theme';
import SearchBar from './components/SearchBar';
import { IWallet } from './lib/wallet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilesList from './components/ProfilesList';

interface IAppProps {
  wallet: IWallet;
}

const App = ({wallet}: IAppProps) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get("page") ?? "";

  return (
   <ThemeProvider theme={theme}>
      <Box p={2} height="550px">
        <Stack direction="column" alignItems="center">
          <SearchBar />
          { page === "list"
            ? <ProfilesList wallet={wallet} />
            : page === "profile"
            ? <Profile wallet={wallet} />
            : <></>
          }
        </Stack>
      </Box>
   </ThemeProvider>
  );
}

export default App;
