import {Dialog, Stack, TextField, Button, InputAdornment, IconButton, Tooltip} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import GeneratePasswordIcon from '@mui/icons-material/VpnKey';
import {toast} from 'react-toastify';
import {updateIdentifier} from '@/actions/identifiers/identifier.action';
import {useJwt} from 'react-jwt';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    refreshList: () => void;
    selectedIdentifier: any;
}

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

export default function UpdateidentifierInformation(props: Readonly<Props>) {
    const [label, setLabel] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState('' as string);
    const {decodedToken} = useJwt<DecodedToken>(token!);

    useEffect(() => {
        if (!props.selectedIdentifier) return;
        setLabel(props.selectedIdentifier.label);
        setUsername(props.selectedIdentifier.username);
        setPassword(props.selectedIdentifier.password);
        console.log(props.selectedIdentifier);
    }, [props.selectedIdentifier]);

    useEffect(() => {
        setToken(sessionStorage.getItem('token') as string);
    }, []);

    const generatePassword = () => {
        const length = 24;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let generatedPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(generatedPassword);
        copyToClipboard(generatedPassword);
        toast.success('Mot de passe copié dans le presse-papier', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const copyToClipboard = (text: string) => {
        void navigator.clipboard.writeText(text);
    }

    const handleCreate = async () => {
        try {

            if (!decodedToken) {
                toast.error('Impossible de mettre à jour un identifiant sans être connecté');
                return;
            }

            if (label === '' || username === '' || password === '') {
                toast.error('Veuillez remplir tous les champs');
                return;
            }

            await updateIdentifier(props.selectedIdentifier.id, label, username, password);
            toast.success('Identifiant mis à jour avec succès');
            props.setOpen(false);
            props.refreshList();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'identifiant :', error);
            toast.error('Une erreur est survenue lors de la mise à jour de l\'identifiant');
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => {
                props.setOpen(false);
            }}
            maxWidth="lg"
            PaperProps={{
                style: {
                    width: '350px',
                    backgroundColor: 'rgb(227,227,227)',
                    padding: '24px',
                    boxShadow: '0px 0px 26px rgba(255,255,255,0.6)',
                },
            }}
        >
            <Stack spacing={2}>
                <TextField
                    label="Label"
                    variant="outlined"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                    sx={{
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
                />
                <TextField
                    label="Identifiant"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{
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
                />
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        sx={{
                            width: '100%',
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
                                        onClick={() => {
                                            copyToClipboard(password);
                                            setShowPassword(!showPassword)
                                        }}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Tooltip title={'Générer un mot de passe'} placement="top">
                        <IconButton onClick={generatePassword}>
                            <GeneratePasswordIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        marginTop: '20px',
                        backgroundColor: 'rgb(17,20,25)',
                        '&:hover': {
                            backgroundColor: 'rgb(41,50,57)',
                        },
                    }}
                    onClick={handleCreate}
                    disabled={label === '' || username === '' || password === '' || (label === props.selectedIdentifier?.label && username === props.selectedIdentifier?.username && password === props.selectedIdentifier?.password)}
                >
                    Mettre à jour
                </Button>
            </Stack>
        </Dialog>
    );
}