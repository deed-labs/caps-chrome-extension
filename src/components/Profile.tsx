import { Avatar, Box, Button, Container, Grid, Link, Stack, styled, Typography } from "@mui/material";
import ShareIcon from "../assets/icons/share_icon.png";
import DonateIcon from "../assets/icons/donate_icon.png";
import React, { useState } from "react";
import { GitHub, Telegram, Twitter } from "@mui/icons-material";
import SharingModal from "./SharingModal";
import { CAPS_APP_URL } from "../config";
import { useProfile } from "../hooks/useProfile";
import { IWallet } from "../lib/wallet";
import theme from "../theme";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useParams } from "react-router-dom";

const StyledButton = styled(Button)(() => ({
    background: theme.gradients.purpleGradient,
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    textTransform: "none",
    width: "100%",
    maxWidth: "210px",
}));

const icons = {
    twitter: <Twitter fontSize="large"/>,
    github:  <GitHub fontSize="large"/>,
    telegram: <Telegram fontSize="large"/>
}

interface IProfileProps {
    wallet: IWallet;
}

const Profile = ({wallet}: IProfileProps) => {
    const {account} = useParams();

    const [openShareModal, setOpenShareModal] = useState<boolean>(false);
    const profile = useProfile(wallet, account);

    const profileUrl = `${CAPS_APP_URL}/${account}`

    if (!profile) {
        return (
            <Box 
                height="300px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography
                    variant="h3"
                    color="#9381FF"
                >
                    404
                </Typography>
                <Typography 
                    variant="h4"
                    color="#9381FF"
                    sx={{ opacity: 0.5 }}
                >
                    Profile not found
                </Typography>
            </Box>
        )
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <SharingModal url={profileUrl} open={openShareModal} setOpen={setOpenShareModal} />
            <Grid container direction="row" gap={5} justifyContent="center" alignItems="center">
                <Grid item>
                    <img width={30} src={ShareIcon} onClick={() => setOpenShareModal(true)}/>
                </Grid>
                <Grid item>
                    <Avatar 
                        alt={profile.name}
                        src={profile.imageUrl}
                        sx={{width: 100, height: 100}}
                    />
                </Grid>
                <Grid item>
                    <Link href={profileUrl}>
                        <img  width={35} src={DonateIcon} />
                    </Link>
                </Grid>
            </Grid>
            <Box my={5} maxWidth={320}>
                <Typography variant="h5" textAlign="center" mb={2}>{profile.name}</Typography>
                <Typography textAlign="center" color="#9381FF" fontSize={20}>{profile.bio}</Typography>
            </Box>
            <Box justifyContent="center">
                <Stack direction="row" gap={2} justifyContent="center">
                   { profile.links &&
                     Object.keys(profile.links).map(name => {
                        if (profile.links[name as keyof typeof icons] === "") return <React.Fragment key={name}></React.Fragment>;
            
                        return (
                            <Link key={name} target="_blank" href={profile.links[name as keyof typeof icons]} sx={{color: "#9381FF"}}>
                                {icons[name as keyof typeof icons]}
                            </Link>
                        )
                    })
                   }
                </Stack>
            </Box>
            <Link target="_blank" href={profileUrl} mt={5} sx={{textDecoration: "none"}}>
                <StyledButton>Open full profile <OpenInNewIcon fontSize='small'/></StyledButton>
            </Link>
        </Container>
    )
}

export default Profile;