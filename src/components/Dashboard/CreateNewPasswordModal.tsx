import {Dialog, Stack, TextField, Button, InputAdornment, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useState} from 'react';
import GeneratePasswordIcon from '@mui/icons-material/VpnKey';
import {toast} from 'react-toastify';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CreateNewPasswordModal(props: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        navigator.clipboard.writeText(text);
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
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={generatePassword}>
                        <GeneratePasswordIcon/>
                    </IconButton>
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
                >
                    Créer
                </Button>
            </Stack>
        </Dialog>
    );
}