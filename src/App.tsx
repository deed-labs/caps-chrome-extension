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
  return (
   <ThemeProvider theme={theme}>
      <Box p={2}>
        <Stack direction="column" alignItems="center" gap={5}>
          <SearchBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProfilesList wallet={wallet} />} />
              <Route path="/profile/:account" element={<Profile wallet={wallet}/>} />
            </Routes>
          </BrowserRouter>
        </Stack>
      </Box>
   </ThemeProvider>
  );
}

export default App;
