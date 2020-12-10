import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button, Box } from '@material-ui/core';
import { dialogStyle, qrCodeRedirectModalStyle } from '@styles';
import { config } from '@utility/config';
import { CustomLink } from '@objects';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useCopyToClipboard } from '@utility/useCopyToClipboard';

export interface ModalProps {
    open: boolean;
    handleClose: () => void;
    url?: string | null;
}

export const QrCodeRedirectModal: React.FC<ModalProps> = ({ open, handleClose, url = '' }) => {
    const downloadRef = useRef<HTMLAnchorElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const dialogCSS = dialogStyle();
    let [dataURI, setDataURI] = useState<string>('');
    let [, handleCopy] = useCopyToClipboard(2000);
    useEffect(() => {
        if (document.getElementById('qrcode')) {
            let uri = (document.getElementById('qrcode') as HTMLCanvasElement).toDataURL();
            setDataURI(uri);
        }
        return () => {
            setDataURI('');
        };
    }, []);
    const qrCodeRedirectModalCSS = qrCodeRedirectModalStyle();
    let modalId = 'Qr Code Redirect Modal';
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <DialogTitle className={qrCodeRedirectModalCSS.dialogHeader}>
                <Typography variant="h2" component="span" className={qrCodeRedirectModalCSS.heading}>
                    QrCode
                </Typography>
                <IconButton className={qrCodeRedirectModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent className={qrCodeRedirectModalCSS.dialogContent}>
                <Box className={qrCodeRedirectModalCSS.urlInfo}>
                    <Typography component="span" className={qrCodeRedirectModalCSS.urlAddress}>{`${config.__REDIRECT_URL__}${url || ''}`}</Typography>
                    <IconButton aria-label="copy-url" className={qrCodeRedirectModalCSS.urlCopyButton} onClick={() => handleCopy(`${config.__REDIRECT_URL__}${url || ''}`)}>
                        <FileCopyIcon />
                    </IconButton>
                </Box>
                <Box ref={canvasRef}>
                    <QRCode id="qrcode" size={240} value={`${config.__REDIRECT_URL__}${url || ''}`} />
                </Box>
                <Box className={qrCodeRedirectModalCSS.dialogContentButtons}>
                    <Box className={qrCodeRedirectModalCSS.dialogButtonContainer}>
                        <CustomLink ref={downloadRef} href={dataURI} download={`${url}.png`} label="Download">
                            <GetAppIcon />
                        </CustomLink>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions className={qrCodeRedirectModalCSS.dialogFooter}>
                <Button onClick={handleClose} className={qrCodeRedirectModalCSS.dialogClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
