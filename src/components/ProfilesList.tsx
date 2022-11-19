import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_ACCOUNTS_MSG } from "../chrome/constants";
import { Message } from "../chrome/types";
import { useProfiles } from "../hooks/useProfiles";
import { IWallet } from "../lib/wallet";

interface IProfilesListProps {
    wallet: IWallet;
}

const ProfilesList = ({wallet}: IProfilesListProps) => {
    const [accounts, setAccounts] = useState<string[]>([]);
    const profiles = useProfiles(wallet, accounts);

    useEffect(() => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
         }, (tabs) => {
            chrome.tabs.sendMessage(
                // Current tab ID
                tabs[0].id || 0,
              
                // Message type
                { type: GET_ACCOUNTS_MSG } as Message,
              
                // Callback executed when the content script sends a response
                (response: Message) => {
                    setAccounts(response.accounts ?? []);
                });
         });
    }, [])

    if (!profiles) {
        return (
            <Box 
                height="300px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography 
                    variant="h4"
                    color="#9381FF"
                    sx={{ opacity: 0.5 }}
                >
                    Profiles not found
                </Typography>
            </Box>
        )
    }

    return (
        <List dense>
            {profiles.map((profile, index) => {
                return (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={profile.imageUrl}/>
                        </ListItemAvatar>
                        <ListItemText primary={profile.name} />
                    </ListItem>
                )
            })}
        </List>
    )
}

export default ProfilesList;