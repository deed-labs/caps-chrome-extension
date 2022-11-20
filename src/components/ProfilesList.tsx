import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ACCOUNTS_LIST, GET_ACCOUNTS_MSG } from "../chrome/constants";
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
                    if (response.type === ACCOUNTS_LIST) setAccounts(response.accounts ?? []);
                });
         });
    }, [])

    const openProfile = (account: string) => {
        window.location.search = "?page=profile&account=" + account;
    }

    if (profiles.length === 0) {
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
        <Box 
            pt={2}
            sx={{ width: '100%', maxWidth: 320, overflow: "auto"}}
        >
            <Typography 
                variant="h6"
                textAlign="center"
                color="#9381FF"
                sx={{ opacity: 0.8 }}
            >
                Accounts from page
            </Typography>
            <List >
                {profiles && profiles.map((profile, index) => {
                    return (
                    <React.Fragment key={index}>
                            <ListItem onClick={() => {openProfile(profile.account)}} style={{cursor: "pointer"}}>
                                <ListItemAvatar>
                                    <Avatar src={profile.imageUrl}/>
                                </ListItemAvatar>
                                <ListItemText primary={profile.name} secondary={profile.bio} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                    </React.Fragment>
                    )
                })}
            </List>
        </Box>
    )
}

export default ProfilesList;