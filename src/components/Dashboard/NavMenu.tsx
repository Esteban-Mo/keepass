import {Avatar, Box, Button, IconButton, Modal, Stack, Typography} from '@mui/material';
import {useJwt} from 'react-jwt';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {exportData, importData} from '@/actions/identifiers/identifier.action';
import {Download, Upload} from '@mui/icons-material';

interface DecodedToken {
    email: string;
    iat: number;
    exp: number;
}

interface Props {
    listPassword: any[];
    refreshList: () => void;
}

export default function NavMenu(props: Props) {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [token, setToken] = useState('' as string);
    const {decodedToken, isExpired} = useJwt<DecodedToken>(token!);

    useEffect(() => {
        setToken(sessionStorage.getItem('token') as string);
    }, []);

    useEffect(() => {
        console.log(decodedToken?.email);
    }, [decodedToken]);

    const signOut = () => {
        sessionStorage.removeItem('token');
        router.push('/');
        toast.success('Déconnexion réussie');
    }

    const handleExportData = async () => {
        try {
            const encryptedData = await exportData(decodedToken?.email!);
            const dataBlob = new Blob([encryptedData], {type: 'text/plain'});
            const downloadLink = window.URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = downloadLink;
            link.download = 'exported_data.txt';
            link.click();
            window.URL.revokeObjectURL(downloadLink);
        } catch (error) {
            console.error('Erreur lors de l\'exportation des données :', error);
            toast.error('Une erreur s\'est produite lors de l\'exportation des données.');
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setOpenModal(true);
        }
    };

    const handleImportData = async () => {
        if (file) {
            try {
                const fileContent = await file.text();
                await importData(fileContent, decodedToken?.email!);
                toast.success('Importation des données réussie');
                setOpenModal(false);
                setFile(null);
                props.refreshList();
            } catch (error) {
                console.error('Erreur lors de l\'importation des données :', error);
                toast.error('Une erreur s\'est produite lors de l\'importation des données.');
                setOpenModal(false);
                setFile(null);
            }
        } else {
            toast.error('Veuillez sélectionner un fichier à importer.');
        }
    };

    return (
        <Stack sx={{
            height: '100%',
            minWidth: '285px',
            maxWidth: '285px',
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
                    height: '220px',
                    width: '100%',
                    gap: '5px',
                }}>

                    <Stack sx={{
                        width: '100%',
                        gap: '5px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <IconButton
                            sx={{color: 'rgba(232,232,232,0.87)', fontSize: '0.9em', justifyContent: 'center'}}
                            onClick={handleExportData}
                            disabled={props.listPassword.length === 0}
                        >
                            <Download/>
                            Exporter
                        </IconButton>

                        <IconButton
                            component="label"
                            sx={{color: 'rgba(232,232,232,0.87)', fontSize: '0.9em', justifyContent: 'center'}}
                        >
                            <Upload/>
                            Importer
                            <input type="file" hidden onChange={handleFileChange}/>
                        </IconButton>

                    </Stack>

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

                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
                        <Typography variant="h6" component="h2">
                            Confirmer importation
                        </Typography>
                        <Typography sx={{mt: 2}}>
                            Voulez-vous vraiment importer les données depuis le fichier sélectionné ?
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end" sx={{mt: 2}}>
                            <Button onClick={() => setOpenModal(false)} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleImportData} color="primary" variant="contained">
                                Importer
                            </Button>
                        </Stack>
                    </Box>
                </Modal>

            </Stack>


        </Stack>
    )
}