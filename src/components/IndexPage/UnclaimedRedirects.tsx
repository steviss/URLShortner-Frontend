import { Box, Typography, Grow, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Divider, Pagination, Tooltip } from '@material-ui/core';
import { unclaimedRedirectsStyle } from '@styles';
import React, { useEffect, useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { AccountRequiredModal, QrCodeRedirectModal, ClaimRedirectModal } from '@modal';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import { useCopyToClipboard } from '@utility/useCopyToClipboard';
import { config } from '@utility/config';
import { UserPermissions } from '../../types/User';
import { ClaimType } from 'stores/ClaimStore';

export const UnclaimedRedirects: React.FC = observer(() => {
    const unclaimedRedirectsCSS = unclaimedRedirectsStyle();
    const {
        notificationStore: { createNotification },
        claimStore: { items, getAll },
        userStore: { userPermissions },
    } = useStore();
    let [isCopied, handleCopy, message] = useCopyToClipboard(2000);
    let [qrModal, qrModalToggle] = useState<boolean>(false);
    let [qrUrl, setQrUrl] = useState<string | null>(null);
    let [claimRedirect, setClaimRedirect] = useState<ClaimType | null>(null);
    let [arModal, arModalToggle] = useState<boolean>(false);
    let [crModal, crModalToggle] = useState<boolean>(false);
    const itemsPerPage = 5;
    const [page, setPage] = useState<number>(1);
    const [noOfPages, setNoPages] = useState<number>(Math.ceil(items.length / itemsPerPage));
    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };
    const openQrModal = (url: string) => {
        qrModalToggle(true);
        setQrUrl(url);
    };
    const openClaimRedirect = (redirect: ClaimType) => {
        crModalToggle(true);
        setClaimRedirect(redirect);
    };
    useEffect(() => {
        getAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setNoPages(Math.ceil(items.length / itemsPerPage));
    }, [items]);
    useEffect(() => {
        if (message) {
            createNotification(message.status, message.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCopied]);
    const renderUnclaimedRedirects = () => {
        return items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
            let itemUrl = `${config.__REDIRECT_URL__}${item.slug}`;
            return (
                <ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar>
                            <LinkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.url} secondary={itemUrl} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Claim ownership" aria-label="claim tooltip">
                            {userPermissions > UserPermissions.Guest ? (
                                <IconButton aria-label="claim button" onClick={() => openClaimRedirect(item)}>
                                    <LoyaltyIcon />
                                </IconButton>
                            ) : (
                                <IconButton aria-label="claim button" onClick={() => arModalToggle(true)}>
                                    <LoyaltyIcon />
                                </IconButton>
                            )}
                        </Tooltip>
                        <Tooltip title="Copy redirect url" aria-label="copy url tooltip">
                            <IconButton aria-label="copy url button" onClick={() => handleCopy(itemUrl)}>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="View QR Code for redirect" aria-label="qrcode tooltip">
                            <IconButton aria-label="copy url button" onClick={() => openQrModal(item.slug)}>
                                <CropFreeIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    };
    return (
        <Grow in={items.length > 0} exit={items.length === 0} unmountOnExit mountOnEnter>
            <Paper square className={unclaimedRedirectsCSS.root}>
                <Box component="header" className={unclaimedRedirectsCSS.header}>
                    <Typography variant="h2" className={unclaimedRedirectsCSS.heading}>
                        Unclaimed Links
                    </Typography>
                </Box>
                <Box className={unclaimedRedirectsCSS.body}>
                    <List dense>{renderUnclaimedRedirects()}</List>
                    <Divider />
                    <Box className={unclaimedRedirectsCSS.pagination}>
                        <Pagination count={noOfPages} page={page} onChange={changePage} defaultPage={1} size="small" showFirstButton showLastButton />
                    </Box>
                </Box>
                <QrCodeRedirectModal url={qrUrl} open={qrModal} handleClose={() => qrModalToggle(false)} />
                <AccountRequiredModal open={arModal} handleClose={() => arModalToggle(false)} />
                <ClaimRedirectModal redirect={claimRedirect} open={crModal} handleClose={() => crModalToggle(false)} />
            </Paper>
        </Grow>
    );
});
