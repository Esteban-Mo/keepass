"use client"

import {Stack, InputBase, IconButton, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavMenu from '@/components/Dashboard/NavMenu';
import {useEffect, useState} from 'react';
import CreateNewPasswordModal from '@/components/Dashboard/CreateNewPasswordModal';
import {useRouter} from 'next/navigation';
import {checkTokenValidity} from '@/actions/authentification/auth.action';
import {getIdentifier} from '@/actions/identifiers/identifier.action';
import {useJwt} from 'react-jwt';
import ListPassword from '@/components/Dashboard/ListPassword';
import IdentifierInformation from '@/components/Dashboard/IdentifierInformation';
import {ToastContainer} from 'react-toastify';

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

const token = sessionStorage.getItem('token');

export default function Dashboard() {
    const [listPassword, setListPassword] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const {decodedToken, isExpired} = useJwt<DecodedToken>(token!);
    const [selectedIdentifier, setSelectedIdentifier] = useState<any>(null);

    useEffect(() => {
        setSelectedIdentifier(listPassword[0])
    }, [listPassword]);

    useEffect(() => {
        const checkTokenAndRedirect = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }

            const parts = token.split('.');
            if (parts.length !== 3) {
                sessionStorage.removeItem('token');
                router.push('/');
                return;
            }

            try {
                const decodedToken = await checkTokenValidity(token);
                console.log("Decoded Token:", decodedToken);
                setIsTokenValid(true);
            } catch (error) {
                console.error("Erreur de vérification du token:", error);
                setIsTokenValid(false);
                sessionStorage.removeItem('token');
                router.push('/');
            }
        };

        void checkTokenAndRedirect();
    }, [router]);

    const refreshList = async () => {
        if (!decodedToken) return;
        const identifiers = await getIdentifier(decodedToken.email);
        setListPassword(identifiers);
    }

    useEffect(() => {
        const getIdentifierList = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }

            const parts = token.split('.');
            if (parts.length !== 3) {
                return;
            }

            if (!decodedToken) return;
            const identifiers = await getIdentifier(decodedToken.email);
            setListPassword(identifiers);
        }

        void getIdentifierList();
    }, [decodedToken]);

    return (
        <>
            <ToastContainer position="bottom-right"/>

            {isTokenValid && (
                <Stack sx={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                }}>
                    <NavMenu/>

                    <Stack sx={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                    }}>
                        <Stack
                            sx={{
                                height: '50px',
                                width: '100%',
                                backgroundColor: 'rgb(17,20,25)',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'start',
                                flexDirection: 'row',
                            }}
                        >
                            <InputBase
                                placeholder="Rechercher..."
                                sx={{
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    width: '100%',
                                    color: 'white',
                                }}
                                startAdornment={
                                    <IconButton size="small" sx={{color: 'rgba(255, 255, 255, 0.5)'}}>
                                        <SearchIcon/>
                                    </IconButton>
                                }
                            />

                            <Button
                                sx={{
                                    height: '90%',
                                    width: '50px',
                                    fontSize: '2em',
                                    backgroundColor: 'rgb(47,56,67)',
                                    borderRadius: '4px',
                                    margin: '0 10px 0 10px',
                                }}
                                onClick={() => setOpenDialog(true)}
                            >
                                +
                            </Button>
                        </Stack>

                        <Stack sx={{
                            height: '100%',
                            width: '100%',
                            flexDirection: 'row',
                            backgroundColor: 'rgb(17,20,25)',
                            justifyContent: 'center',
                        }}>
                            {listPassword.length > 0 && (
                                <>
                                    <ListPassword selectedIdentifier={selectedIdentifier} setSelectedIdentifier={setSelectedIdentifier} listPassword={listPassword} refreshList={refreshList}/>

                                    <Stack
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            WebkitBoxShadow: '-7px 0px 21px -2px rgba(44,47,60, 0.87)',
                                            boxShadow: '-7px 0px 21px -2px rgba(44,47,60, 0.87)',
                                        }}
                                    >

                                        <IdentifierInformation selectedIdentifier={selectedIdentifier}/>

                                    </Stack>
                                </>
                            )}
                            {listPassword.length < 1 && (
                                <Stack sx={{
                                    color: '#c8c8c8',
                                    fontSize: '1.2em',
                                }}>
                                    Aucun identifiant enregistré
                                </Stack>
                            )}
                        </Stack>
                    </Stack>

                    <CreateNewPasswordModal open={openDialog} setOpen={setOpenDialog} refreshList={refreshList}/>
                </Stack>
            )}

            {!isTokenValid && (
                <Stack sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgb(17,20,25)',
                }}>
                    Chargement en cours...
                </Stack>
            )}
        </>
    )
}