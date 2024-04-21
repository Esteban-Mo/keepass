import {Stack} from '@mui/material';

export default function TitleLoginPage() {
    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
        }}>

            <Stack sx={{
                height: '100%',
                width: '100%',
                backgroundImage: 'url(./img/forest.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                zIndex: -1,
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
                    marginTop: '95px',
                }}>
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <img src="./img/logo.png" alt="logo" style={{width: '100px', height: '100px'}}/>
                    </Stack>

                    <Stack
                        sx={{
                            justifyContent: 'center',
                            marginLeft: '30px',
                            fontSize: '4em',
                            fontWeight: 'bold',
                            color: 'rgba(232,232,232,0.87)',
                            textShadow: '2px 3px 6px #000000'
                        }}>
                        KEEPASS
                    </Stack>
                </Stack>


                <Stack sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: '50px',
                    color: 'rgba(220,220,220,0.91)',
                    textShadow: '2px 3px 13px #000000'
                }}>
                    Protégez vos secrets, comme la forêt protège ses trésors.<br/>
                    Votre mot de passe, notre sanctuaire.
                </Stack>
            </Stack>


        </Stack>
    )
}