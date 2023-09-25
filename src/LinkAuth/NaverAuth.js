const CLIENT_ID = '9PAoOnLFRBY1wUsb28BA'
const REDIRECT_URI = 'http://localhost:3000/oauth/naver'

export const NAVER_AUTH_URL =
    `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
