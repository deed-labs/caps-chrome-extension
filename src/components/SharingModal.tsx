import { Box, Modal, Paper, Stack } from "@mui/material";
import { LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { useEffect, useState } from "react";

const QRCode = require('qrcode');

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    outline: 'none',
    p: 2,
};

interface IModalProps {
    url: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SharingModal = ({url, open, setOpen}: IModalProps) => {
    const [qr, setQr] = useState('');
    
    const generateQr = () => {
        QRCode.toDataURL(url, {
            width: 250,
            margin: 2,
            color: {
                dark: '#7165BE',
            }
        }).then((url: string) => {
            setQr(url);
        });
    }

    useEffect(() => {
        generateQr();
    }, [])

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Paper sx={modalStyle}>
                <Box>
                    <img src={qr} />
                    <Stack direction="row" gap={2} justifyContent="center">
                        <TwitterShareButton url={url}>
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>
                        <TelegramShareButton url={url}>
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>
                        <LinkedinShareButton url={url}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                        <RedditShareButton url={url}>
                            <RedditIcon size={40} round />
                        </RedditShareButton>
                    </Stack>
                </Box>
            </Paper>  
        </Modal>
    )
}

export default SharingModal;