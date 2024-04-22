"use client"

import {Stack, InputBase, IconButton, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavMenu from '@/components/Dashboard/NavMenu';
import {useState} from 'react';
import CreateNewPasswordModal from '@/components/Dashboard/CreateNewPasswordModal';

export default function Dashboard() {
    const [listPassword, setListPassword] = useState<any[]>();
    const [openDialog, setOpenDialog] = useState(false);

    return (
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
                            }}>

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
    )
}