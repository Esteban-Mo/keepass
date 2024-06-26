import {Stack, IconButton, Typography, Button} from '@mui/material';
import {Key, Person, VisibilityOff, Visibility, Newspaper, Update, Edit} from '@mui/icons-material';
import {useState} from 'react';
import {toast} from 'react-toastify';
import UpdateidentifierInformation from '@/components/Dashboard/UpdateidentifierInformation';

interface Identifier {
    id: string;
    label: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    selectedIdentifier: Identifier | null;
    refreshList: () => void;
}

export default function IdentifierInformation(props: Readonly<Props>) {
    const [showPassword, setShowPassword] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copié dans le presse-papier');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return date.toLocaleString('fr-FR', options);
    };

    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
        }}>
            <Stack sx={{
                height: '65px',
                width: '100%',
                justifyContent: 'center',
                marginLeft: '10px',
                color: '#dfdfdf',
                fontSize: '1.5em',
            }}>
                {props.selectedIdentifier && props.selectedIdentifier.label}
            </Stack>

            <Stack sx={{
                height: '100%',
                width: '100%',
                color: '#dfdfdf',
                fontSize: '1.5em',
                alignItems: 'center',
            }}>
                <Stack sx={{
                    height: '65px',
                    width: '95%',
                    border: '1px solid #363636',
                    borderRadius: '10px 10px 0 0',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgb(26,30,38)',
                    },
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                       onClick={() => props.selectedIdentifier && copyToClipboard(props.selectedIdentifier.username)}
                >
                    <Person sx={{
                        marginLeft: '15px',
                    }}/>

                    {props.selectedIdentifier && (
                        <Stack sx={{
                            color: '#dfdfdf',
                            fontSize: '0.6em',
                            marginLeft: '10px',
                        }}>
                            {props.selectedIdentifier.username}
                        </Stack>
                    )}
                </Stack>

                <Stack sx={{
                    height: '65px',
                    width: '95%',
                    borderRight: '1px solid #363636',
                    borderLeft: '1px solid #363636',
                    borderBottom: '1px solid #363636',
                    borderRadius: '0 0 10px 10px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgb(26,30,38)',
                    },
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                       onClick={() => props.selectedIdentifier && copyToClipboard(showPassword ? props.selectedIdentifier.password : '*'.repeat(props.selectedIdentifier.password.length))}
                >
                    <Key sx={{
                        marginLeft: '15px',
                    }}/>

                    {props.selectedIdentifier && (
                        <Stack sx={{
                            color: '#dfdfdf',
                            fontSize: '0.6em',
                            marginLeft: '10px',
                        }}>
                            {showPassword ? props.selectedIdentifier.password : '*'.repeat(props.selectedIdentifier.password.length)}
                        </Stack>
                    )}

                    <IconButton
                        aria-label="toggle password visibility"
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '10px',
                        }}
                    >
                        {showPassword ? (
                            <VisibilityOff
                                sx={{color: '#ffffff'}}
                                onClick={(event) => {
                                    setShowPassword(false);
                                    event.stopPropagation();
                                }}
                            />
                        ) : (
                            <Visibility
                                sx={{color: '#ffffff'}}
                                onClick={(event) => {
                                    setShowPassword(true);
                                    event.stopPropagation();
                                }}
                            />
                        )}
                    </IconButton>
                </Stack>

                <Stack sx={{
                    height: '265px',
                    width: '95%',
                    border: '1px solid #363636',
                    borderRadius: '10px 10px 10px 10px',
                    marginTop: '40px',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    <Stack
                        sx={{
                            height: '65px',
                            width: '98%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: '10px',
                        }}
                    >
                        <Newspaper/>
                        <Stack>
                            <Typography
                                sx={{
                                    color: '#dfdfdf',
                                    fontSize: '0.5em',
                                    marginLeft: '10px',
                                }}>
                                Date de création <br/>
                            </Typography>

                            <Typography
                                sx={{
                                    color: '#808080',
                                    fontSize: '0.5em',
                                    marginLeft: '10px',
                                }}>
                                {props.selectedIdentifier && formatDate(props.selectedIdentifier.createdAt)}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        sx={{
                            height: '65px',
                            width: '98%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: '5px',
                        }}
                    >
                        <Update/>
                        <Stack>
                            <Typography
                                sx={{
                                    color: '#dfdfdf',
                                    fontSize: '0.5em',
                                    marginLeft: '10px',
                                }}>
                                Date de la dernière mise à jours <br/>
                            </Typography>

                            <Typography
                                sx={{
                                    color: '#808080',
                                    fontSize: '0.5em',
                                    marginLeft: '10px',
                                }}>
                                {props.selectedIdentifier && formatDate(props.selectedIdentifier.updatedAt)}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={() => setShowUpdateDialog(true)}
                        sx={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: 'rgb(31,35,44)',
                            '&:hover': {
                                backgroundColor: 'rgba(41,50,57,0)',
                            },
                        }}>
                        <Edit/>
                    </Button>

                </Stack>
            </Stack>

            <UpdateidentifierInformation open={showUpdateDialog} setOpen={setShowUpdateDialog} selectedIdentifier={props.selectedIdentifier} refreshList={props.refreshList}/>

        </Stack>
    );
}