import {Avatar, Button, Stack} from '@mui/material';
import {useJwt} from 'react-jwt';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';

const token = sessionStorage.getItem('token');

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

export default function NavMenu() {
    const {decodedToken, isExpired} = useJwt<DecodedToken>(token!);
    const router = useRouter();

    useEffect(() => {
        console.log(decodedToken?.email);
    }, [decodedToken]);

    const signOut = () => {
        sessionStorage.removeItem('token');
        router.push('/');
        toast.success('Déconnexion réussie');
    }

    return (
        <Stack sx={{
            height: '100%',
            minWidth: '285px',
            position: 'relative',
            backgroundColor: 'rgb(17,20,25)',
        }}>

            <Stack sx={{
                height: '100%',
                width: '100%',
                backgroundImage: 'url(./img/forest.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                zIndex: 10,
                opacity: 0.3,
            }}>

            </Stack>

            <Stack sx={{
                height: '100%',
                width: '100%',
                backdropFilter: 'blur(5px)',
                zIndex: 10,
                alignItems: 'center',
            }}>

                <Stack sx={{
                    height: '120px',
                    flexDirection: 'row',
                    marginTop: '5px',
                }}>
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <img src="./img/logo.png" alt="logo" style={{width: '50px', height: '50px'}}/>
                    </Stack>

                    <Stack
                        sx={{
                            justifyContent: 'center',
                            marginLeft: '5px',
                            fontSize: '2em',
                            fontWeight: 'bold',
                            color: 'rgba(232,232,232,0.87)',
                            textShadow: '2px 3px 6px #000000'
                        }}>
                        KEEPASS
                    </Stack>
                </Stack>

                <Stack sx={{
                    height: '100%',
                    width: '100%',
                }}>

                </Stack>

                <Stack sx={{
                    height: '120px',
                    width: '100%',
                    gap: '5px',
                }}>

                    <Stack sx={{
                        height: '50%',
                        width: '100%',
                        color: 'rgba(232,232,232,0.87)',
                        fontSize: '0.9em',
                        flexDirection: 'row',
                    }}>

                        <Stack sx={{
                            height: '100%',
                            width: '85px',
                            color: 'rgba(232,232,232,0.87)',
                            fontSize: '0.9em',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Avatar>
                                A
                            </Avatar>
                        </Stack>

                        <Stack sx={{
                            height: '100%',
                            width: '100%',
                            color: 'rgba(232,232,232,0.87)',
                            fontSize: '0.9em',
                            justifyContent: 'center',
                        }}>

                            <Stack sx={{
                                width: '100%',
                                color: 'rgba(232,232,232,0.87)',
                                fontSize: '0.9em',
                            }}>
                                {decodedToken?.email}
                            </Stack>

                            <Stack sx={{
                                width: '100%',
                                color: 'rgba(179,179,179,0.87)',
                                fontSize: '0.7em',
                            }}>
                                Version gratuite
                            </Stack>

                        </Stack>

                    </Stack>

                    <Button
                        variant="text"
                        sx={{
                            width: '100%',
                            color: 'rgba(232,232,232,0.87)',
                            fontSize: '0.9em',
                            justifyContent: 'center',
                        }}
                        onClick={signOut}
                    >
                        DECONNEXION
                    </Button>

                </Stack>

            </Stack>


        </Stack>
    )
}