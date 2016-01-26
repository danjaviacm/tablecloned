let Env = 'dev';
let BASE_URL = 'http://localhost:8000/';
let key_pusher = '5ad5c09fbf6f2ffe36f6';
let IMG = 'http://segdig1.s3.amazonaws.com';

if(window.location.host == 'seguros.comparamejor.com'){
    Env = 'prd';
    BASE_URL = 'https://seguros.comparamejor.com/';
    key_pusher = '3173debe12cb90da0c9f';
    IMG = ''
}

//BASE_URL = 'https://seguros.comparamejor.com/';
//key_pusher = '3173debe12cb90da0c9f';

export default {
    BASE_URL: BASE_URL,
    ENV: Env,
    KEY_PUSHER: key_pusher,
    IMG: IMG
}