import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { getUserInfo } from '../../action/user';
import { frontURL } from '../../config';

function Auth(props) {
    const { match } = props;
    const [user, setUser] = useState(null);

    const login = useCallback(() => {
        const onLogin = async () => {
            const res = await getUserInfo(match.params.id);
            const { success, ...rest } = res;
            console.log(success)
            if (success) {
                window.localStorage.setItem('user', JSON.stringify(rest));
            } else {
                window.localStorage.removeItem('user');
                window.location.replace(frontURL)
            }
            const localUser = window.localStorage.getItem('user');
            if (localUser != null) {
                setUser(JSON.parse(localUser))
            }
        }
        onLogin()
    }, [match.params.id])

    useEffect(() => {
        login()

    }, [login])

    return (
        <>
            {user != null && <Redirect to={{ pathname: '/admin/dashboard' }} />}
        </>
    );
}

export default Auth;
