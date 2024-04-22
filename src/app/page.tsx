"use client";

import {Stack} from '@mui/material';
import {useState} from 'react';
import TitleLoginPage from '@/components/LoginPage/Title';
import LoginCard from '@/components/LoginPage/LoginCard';
import SignInCard from '@/components/LoginPage/SignIn';
import {ToastContainer} from 'react-toastify';

export enum State {
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

            <ToastContainer position={state === State.LOGIN ? 'bottom-right' : 'bottom-left'}/>


            <SignInCard state={state} setState={setState}/>

            <TitleLoginPage/>

            <LoginCard state={state} setState={setState}/>

        </Stack>
    );
}