import Cookies from 'js-cookie';

export const isAccessTokenPresent = (): boolean => {
    const accessToken = Cookies.get('access_token');
    return !!accessToken;
};