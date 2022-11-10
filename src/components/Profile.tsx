import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, keyframes, Link, Modal, Paper, Stack, styled, Typography } from "@mui/material";
import ShareIcon from "../assets/icons/share_icon.png";
import DonateIcon from "../assets/icons/donate_icon.png";
import React, { useEffect, useState } from "react";
import { GitHub, Telegram, Twitter } from "@mui/icons-material";
import { Profile } from "../types";
import SharingModal from "./SharingModal";
import theme from "../theme";
import { Contract } from "near-api-js";

const icons = {
    twitter: <Twitter fontSize="large"/>,
    github:  <GitHub fontSize="large"/>,
    telegram: <Telegram fontSize="large"/>
}

const ProfilePage = ({address, contract}: IProfileProps) => {
    const [openShareModal, setOpenShareModal] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    const getProfile = async () => {
        // TODO: get profile from the blockchain
        let profile: Profile = {
            accountId: address ?? "",
            name: "Buttercup Cumbersnatch",
            bio: "Actor, also known as Sherlock Holmes",
            links: {
                twitter: "https://twiiter.com",
                github: "https://github.com",
                telegram: "",
            }
        };

        setProfile(profile);
    }

    useEffect(() => {
        getProfile();
    }, [])

    if (!profile) {
        return (
            <Box justifyContent="center">
                <Typography 
                    variant="h3"
                    textAlign="center"
                    color="#9381FF"
                >
                    404
                </Typography>
                <Typography 
                    variant="h4"
                    textAlign="center"
                    color="#9381FF"
                    sx={{ opacity: 0.5 }}
                >
                    Profile not found
                </Typography>
            </Box>
        )
    }

    return (
        <Container>
            <SharingModal url={window.location.href} open={openShareModal} setOpen={setOpenShareModal} />
            <Grid container direction="row" gap={5} justifyContent="center" alignItems="center">
                <Grid item>
                    <img width={30} src={ShareIcon} onClick={() => setOpenShareModal(true)}/>
                </Grid>
                <Grid item>
                    <Avatar 
                        alt={profile.name}
                        src="https://birdinflight.com/wp-content/uploads/2021/10/benedict-cumberbatch.jpg"
                        sx={{width: 100, height: 100}}
                    />
                </Grid>
                <Grid item>
                    <img  width={35} src={DonateIcon} />
                </Grid>
            </Grid>
            <Box my={5}>
                <Typography variant="h5" textAlign="center" mb={2}>{profile.name}</Typography>
                <Typography textAlign="center" color="#9381FF" fontSize={20}>{profile.bio}</Typography>
            </Box>
            <Box justifyContent="center">
                <Stack direction="row" gap={2} justifyContent="center">
                   {
                     Object.keys(profile.links).map(name => {
                        if (profile.links[name as keyof typeof icons] === "") return <React.Fragment key={name}></React.Fragment>;
            
                        return (
                            <Link key={name} href={profile.links[name as keyof typeof icons]} sx={{color: "#9381FF"}}>
                                {icons[name as keyof typeof icons]}
                            </Link>
                        )
                    })
                   }
                </Stack>
            </Box>
        </Container>
    )
}

interface IProfileProps {
    address: string;
    contract: Contract | null;
}

export default ProfilePage;