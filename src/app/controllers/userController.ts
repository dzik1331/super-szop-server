import {ApiController, Controller, HttpGet, HttpPost} from 'dinoloop';

@Controller('/user')
export class UserController extends ApiController {

    constructor() {
        super();
    }

    @HttpPost('/login')
    devices(body: any) {
        console.log(body);
        return {result: {login: body.login, name: null, role: 'administrator'}};
    }
}