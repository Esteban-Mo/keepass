"use client";

import {Stack} from '@mui/material';
import {useState} from 'react';
import TitleLoginPage from '@/components/LoginPage/Title';

enum State {
    LOGIN,
    SIGNUP
}

export default function Home() {
    const [state, setState] = useState<State>(State.LOGIN);

    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
        }}>

            <Stack sx={{
                height: '100%',
                width: state === State.LOGIN ? '0%' : '100%',
                backgroundColor: 'rgba(52,177,180,0.25)',
                transition: 'width 0.5s'
            }}>

            </Stack>

            <TitleLoginPage/>

            <Stack sx={{
                height: '100%',
                width: state === State.LOGIN ? '100%' : '0%',
                backgroundColor: 'rgba(180,52,120,0.25)',
                transition: 'width 0.5s'
            }}>

            </Stack>

        </Stack>
    );
}