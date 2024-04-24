"use client"

import {Stack, InputBase, IconButton, Button, Avatar, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavMenu from '@/components/Dashboard/NavMenu';
import {useEffect, useState} from 'react';
import CreateNewPasswordModal from '@/components/Dashboard/CreateNewPasswordModal';
import {useRouter} from 'next/navigation';
import {checkTokenValidity} from '@/actions/authentification/auth.action';
import {getIdentifier} from '@/actions/identifiers/identifier.action';
import {useJwt} from 'react-jwt';

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

const token = sessionStorage.getItem('token');

export default function Dashboard() {
    const [listPassword, setListPassword] = useState<any[]>();
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const {decodedToken, isExpired} = useJwt<DecodedToken>(token!);

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
                            alignItems: 'center',
                        }}>
                            {listPassword && (
                                <>
                                    <Stack sx={{
                                        height: '100%',
                                        width: '80%',
                                        gap: '5px',
                                        flexDirection: 'row',
                                    }}>


                                        <Stack sx={{
                                            height: '60px',
                                            width: '50px',
                                            justifyContent: 'center',
                                        }}>

                                            <Avatar
                                                sx={{
                                                    borderRadius: '10px',
                                                    backgroundColor: 'rgba(66,38,73,0.87)',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                A
                                            </Avatar>

                                        </Stack>

                                        <Stack sx={{
                                            height: '60px',
                                            width: '100%',
                                            justifyContent: 'center',
                                            marginLeft: '10px',
                                            color: '#ffffff',
                                            fontSize: '0.9em',
                                        }}>
                                            Ldlc
                                            <br/>
                                            <Typography sx={{
                                                color: '#c8c8c8',
                                                fontSize: '0.8em',
                                            }}>
                                                test@test.com
                                            </Typography>
                                        </Stack>


                                    </Stack>

                                    <Stack sx={{
                                        height: '100%',
                                        width: '100%',
                                        WebkitBoxShadow: '-7px 0px 21px -2px rgba(44,47,60, 0.87)',
                                        boxShadow: '-7px 0px 21px -2px rgba(44,47,60, 0.87)',
                                    }}>


                                    </Stack>
                                </>
                            )}

                            {!listPassword && (
                                <Stack sx={{
                                    color: '#c8c8c8',
                                    fontSize: '1.2em',
                                }}>
                                    Aucun identifiant enregistré
                                </Stack>
                            )}
                        </Stack>
                    </Stack>

                    <CreateNewPasswordModal open={openDialog} setOpen={setOpenDialog}/>
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