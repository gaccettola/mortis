// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment =
{
    production  : false,

    restapiurl  : 'https://accettolasystems.com:19001/v1/',
    socketUrl   : 'wss://accettolasystems.com:19001'

    // restapiurl  : 'http://localhost:8989/v1/',
    // socketUrl   : 'ws://localhost:8989'

};
