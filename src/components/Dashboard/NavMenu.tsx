import {Stack} from '@mui/material';

export default function NavMenu() {
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

            </Stack>


        </Stack>
    )
}