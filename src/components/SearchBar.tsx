import { Box, FormControl, TextField, InputAdornment, styled } from "@mui/material";
import { useState } from "react";
import searchIcon from "../assets/icons/search.png";

const StyledFormWrap = styled(Box)(() => ({
  justifySelf: "center",
}));

const SearchBar = ({}) => {
  const [query, setQuery] = useState<string>("");

  const handleKeyboard = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === "Enter") {
      window.location.pathname = "/" + query;
    }
  }

  return (
      <StyledFormWrap>
        <FormControl sx={{minWidth: "350px"}}>
          <TextField
            variant="outlined"
            placeholder="Address..."
            onChange={(e) => {setQuery(e.target.value)}}
            onKeyDown={handleKeyboard}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={searchIcon} width="20px" alt="search logo" />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
      </StyledFormWrap>
  );
} 

export default SearchBar;