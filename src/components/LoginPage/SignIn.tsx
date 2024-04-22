import {Button, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {State} from '@/app/page';
import {toast} from 'react-toastify';
import {useState} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {checkIfUserExist, createUser} from '@/actions/users/user.action';

interface Props {
    state: State;
    setState: (state: State) => void;
}

export default function SignInCard(props: Readonly<Props>) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        const user = await checkIfUserExist(email);

        if (!user) {
            const re = /\S+@\S+\.\S+/;
            if (!re.test(email)) {
                toast.error('Adresse e-mail invalide');
                return;
            }

            await createUser(email, password);
            toast.success('Inscription réussie');
        } else {
            toast.error('L\'utilisateur existe déjà');
        }
    }

    return (
        <Stack sx={{
            height: '100%',
            width: props.state === State.SIGNUP ? '100%' : '0%',
            backgroundColor: 'rgb(17,20,25)',
            transition: 'width 0.5s',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        }}>


            <Stack sx={{
                height: '500px',
                width: '450px',
                backgroundColor: 'rgba(255,255,255,0.87)',
                borderRadius: '10px',
                boxShadow: '2px 3px 13px rgba(255,255,255,0.87)',
            }}>

                <Stack sx={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2em',
                    fontWeight: 'bold',
                    textShadow: '2px 3px 13px rgba(126,126,126,0.87)',
                    color: 'rgb(17,20,25)'
                }}>
                    INSCRIPTION
                </Stack>

                <Stack sx={{
                    height: '80%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        sx={{
                            width: '80%',
                            marginTop: '20px',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgb(17,20,25)',
                                },
                            },
                            '& label.Mui-focused': {
                                color: 'rgb(17,20,25)',
                            },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Stack>

                <Stack sx={{
                    height: '80%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        sx={{
                            width: '80%',
                            marginTop: '20px',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgb(17,20,25)',
                                },
                            },
                            '& label.Mui-focused': {
                                color: 'rgb(17,20,25)',
                            },
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)} edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Stack sx={{
                    height: '80%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Button
                        variant="contained"
                        sx={{
                            width: '80%',
                            marginTop: '20px',
                            backgroundColor: 'rgb(17,20,25)',
                            '&:hover': {
                                backgroundColor: 'rgb(41,50,57)',
                            },
                        }}
                        onClick={login}
                        disabled={!email || !password || email.length < 3 || password.length < 3}
                    >
                        Inscription
                    </Button>

                </Stack>

                <Stack sx={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}>

                    <Button variant="text"
                            sx={{
                                width: '80%',
                                marginTop: '20px',
                                color: 'rgb(17,20,25)',
                                '&:hover': {
                                    backgroundColor: 'rgba(41,50,57,0)',
                                },
                            }}
                            onClick={() => props.setState(State.LOGIN)}>
                        Vous avez un compte ? Connectez-vous
                    </Button>

                </Stack>


            </Stack>

        </Stack>
    )
}