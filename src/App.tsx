import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Contract } from 'near-api-js';
import { Box, Button, Container, Link, Stack, styled, ThemeProvider } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProfilePage from './components/Profile';
import theme from './theme';
import SearchBar from './components/SearchBar';
import { CAPS_APP_URL } from './config';

const StyledButton = styled(Button)(() => ({
  background: theme.gradients.purpleGradient,
  fontSize: "20px",
  fontWeight: "700",
  color: "#fff",
  textTransform: "none",
  width: "100%",
  maxWidth: "210px",
}));

const App = ({contract}: IAppProps) => {
  // TODO: pass address
  const address = "";
  const profileUrl = `${CAPS_APP_URL}/${address}`

  return (
   <ThemeProvider theme={theme}>
      <Box p={2}>
        <Stack direction="column" alignItems="center" gap={5}>
          <SearchBar />
          <ProfilePage address={address} contract={contract} />
          <Link target="_blank" href={profileUrl} sx={{textDecoration: "none"}}>
            <StyledButton>Open full profile <OpenInNewIcon fontSize='small'/></StyledButton>
          </Link>
        </Stack>
      </Box>
   </ThemeProvider>
  );
}

interface IAppProps {
  contract: Contract;
}

export default App;
