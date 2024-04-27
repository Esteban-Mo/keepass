import {Avatar, Button, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {deleteIdentifier} from '@/actions/identifiers/identifier.action';
import {useState} from 'react';
import {toast} from 'react-toastify';

interface Identifier {
    id: string;
    label: string;
    username: string;
}

interface Props {
    selectedIdentifier: Identifier | null;
    setSelectedIdentifier: (identifier: Identifier | null) => void;
    listPassword: Identifier[];
    refreshList: () => void;
}

export default function ListPassword(props: Readonly<Props>) {
    const [open, setOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<Identifier | null>(null);

    const handleClickOpen = (identifier: Identifier) => {
        setToBeDeleted(identifier);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (toBeDeleted) {
            deleteIdentifier(toBeDeleted.id);
            toast.success('Identifiant supprimé');
            props.refreshList();
        }
        setOpen(false);
    };

    return (
        <Stack sx={{
            height: '100%',
            width: '70%',
            flexDirection: 'column',
            backgroundColor: 'rgb(17,20,25)',
            justifyContent: 'start',
        }}>
            {props.listPassword.map((identifier) => (
                <Stack
                    key={identifier.id}
                    sx={{
                        height: '60px',
                        width: '100%',
                        gap: '5px',
                        flexDirection: 'row',
                        cursor: 'pointer',
                        alignItems: 'center',
                        backgroundColor: identifier === props.selectedIdentifier ? 'rgb(26,30,38)' : '',
                        '&:hover': {
                            backgroundColor: 'rgb(26,30,38)',
                        },
                    }}
                    onClick={() =>
                        props.setSelectedIdentifier(
                            props.selectedIdentifier === identifier ? null : identifier
                        )
                    }
                >
                    <Stack
                        sx={{
                            height: '60px',
                            width: '50px',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: 'rgba(66,38,73,0.87)',
                                marginLeft: '10px',
                            }}
                        >
                            {identifier.label.charAt(0)}
                        </Avatar>
                    </Stack>

                    <Stack
                        sx={{
                            height: '60px',
                            width: '100%',
                            justifyContent: 'center',
                            marginLeft: '10px',
                            color: '#ffffff',
                            fontSize: '0.9em',
                        }}
                    >
                        {identifier.label}
                        <br/>
                        <Typography
                            sx={{
                                color: '#c8c8c8',
                                fontSize: '0.8em',
                            }}
                        >
                            {identifier.username}
                        </Typography>
                    </Stack>

                    <Button sx={{
                        color: '#c8c8c8',
                        marginRight: '15px',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(41,50,57,0)',
                        },
                    }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClickOpen(identifier);
                            }}
                    >
                        <Delete/>
                    </Button>

                </Stack>
            ))}

            <Dialog
                open={open}
                onClose={handleClose}
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
                <DialogTitle>{"Confirmer la suppression"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Êtes-vous sûr de vouloir supprimer cet identifiant ? Cette action est irréversible."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            width: '80%',
                            marginTop: '20px',
                            color: 'rgb(17,20,25)',
                            '&:hover': {
                                backgroundColor: 'rgba(41,50,57,0)',
                            },
                        }}
                        onClick={handleClose}>
                        {"Annuler"}
                    </Button>
                    <Button
                        variant={'contained'}
                        sx={{
                            width: '80%',
                            marginTop: '20px',
                            color: 'rgb(209,209,209)',
                            backgroundColor: 'rgb(17,20,25)',
                            '&:hover': {
                                backgroundColor: 'rgb(35,39,50)',
                            },
                        }}
                        onClick={handleDelete} autoFocus>
                        {"Supprimer"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
