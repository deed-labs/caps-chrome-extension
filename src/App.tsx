import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Contract } from 'near-api-js';
import { Box, Button, Container, Stack, styled, ThemeProvider } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProfilePage from './components/Profile';
import theme from './theme';
import SearchBar from './components/SearchBar';

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
  return (
   <ThemeProvider theme={theme}>
      <Box p={5}>
        <Stack direction="column" alignItems="center" gap={5}>
          <SearchBar />
          <ProfilePage address="" contract={contract} />
          <StyledButton>Open full profile <OpenInNewIcon fontSize='small'/></StyledButton>
        </Stack>
      </Box>
   </ThemeProvider>
  );
}

interface IAppProps {
  contract: Contract;
}

export default App;
