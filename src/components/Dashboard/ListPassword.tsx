import {Avatar, Stack, Typography} from '@mui/material';

interface Identifier {
    id: string;
    label: string;
    username: string;
}

interface Props {
    selectedIdentifier: Identifier | null;
    setSelectedIdentifier: (identifier: Identifier | null) => void;
    listPassword: Identifier[];
}

export default function ListPassword(props: Readonly<Props>) {
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
                </Stack>
            ))}

        </Stack>
    );
}