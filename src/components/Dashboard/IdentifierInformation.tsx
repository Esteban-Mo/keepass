import {Stack, IconButton} from '@mui/material';
import {Key, Person, VisibilityOff, Visibility} from '@mui/icons-material';
import {useState} from 'react';
import {toast} from 'react-toastify';

interface Identifier {
    id: string;
    label: string;
    username: string;
    password: string;
}

interface Props {
    selectedIdentifier: Identifier | null;
}

export default function IdentifierInformation(props: Readonly<Props>) {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copié dans le presse-papier');
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
                        {showPassword ? <VisibilityOff
                                sx={{color: '#ffffff'}}
                                onClick={(event) => {
                                    setShowPassword(false)
                                    event.stopPropagation()
                                }}/>
                            :
                            <Visibility
                                sx={{color: '#ffffff'}}
                                onClick={(event) => {
                                    setShowPassword(true)
                                    event.stopPropagation()
                                }}/>
                        }
                    </IconButton>
                </Stack>

                <Stack sx={{
                    height: '265px',
                    width: '95%',
                    border: '1px solid #363636',
                    borderRadius: '10px 10px 10px 10px',
                    marginTop: '40px',
                }}>
                </Stack>
            </Stack>
        </Stack>
    )
}