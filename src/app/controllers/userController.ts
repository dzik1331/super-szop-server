import {ApiController, Controller, HttpGet, HttpPost, HttpStatusCode, SendsResponse} from 'dinoloop';
import {UserService} from "../services/user.service";

@Controller('/user')
export class UserController extends ApiController {

    constructor(private userService: UserService) {
        super();
    }

    @SendsResponse()
    @HttpPost('/login')
    login(body: any) {
        console.log(body);
        this.userService.login(body).subscribe((result) => {
            this.userService.addSession(result).subscribe((data) => {
                result['userSession'] = data;
                this.response.status(HttpStatusCode.oK).json(result)
            })
        }, (error) => {
            this.response.status(HttpStatusCode.notFound).json(error)
        })
        // return {result: {login: body.login, name: null, role: 'administrator'}};
    }

    @SendsResponse()
    @HttpGet('/roles')
    roles() {
        this.userService.getRolesQuery().subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(null);
            })
    }

    @SendsResponse()
    @HttpPost('/add')
    add(body) {
        console.log(body)
        this.userService.addUser(body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }
}