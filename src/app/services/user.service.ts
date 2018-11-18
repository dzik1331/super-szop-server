import {Injectable} from "injection-js";
import {Observable} from "rxjs";
import {database} from "../app";
import {MainService} from "./mainService";
import * as c from "password-hash"

@Injectable()
export class UserService extends MainService {


    login(userData) {
        return new Observable((observer) => {
            database.get(`Select login, name, lastName, role, password From users WHERE login = '${userData.login}'`, (err, data) => {
                if (err != null)
                    observer.error('NO_FOUND');
                else {
                    console.debug('data', data)
                    if (data) {
                        if (c.verify(userData.password, data.password)) {
                            delete data.password;
                            observer.next(data)
                        } else {
                            observer.error('BAD_PASSWORD')
                        }
                    } else {
                        observer.error('NO_FOUND');
                    }
                }
                observer.complete();
            });
        })
    }

    getRolesQuery() {
        return new Observable((observer) => {
            database.all("Select * From userRoles", (err, data) => {
                if (err != null)
                    observer.next(null);
                else
                    observer.next(data)
                observer.complete();
            });
        })
    }

    addUser(data) {
        console.debug('qqqqq', c.verify('Qwert!2345', 'sha1$5e291eb9$1$c382661dba056e7c4780a8a96bf0e5b53499c63e')
        )
        console.debug('qqqq2', c.verify('Qwert!234', 'sha1$5e291eb9$1$c382661dba056e7c4780a8a96bf0e5b53499c63e'))
        return new Observable((observer) => {
            let sql = `INSERT INTO users (
                         login,
                         name,
                         lastName,
                         password,
                         role
                     )
                     VALUES (
                         ${this.dataToString(data.login)},
                         ${this.dataToString(data.name)},
                         ${this.dataToString(data.lastName)},
                         ${this.dataToString(c.generate(data.password))},
                         ${data.role}
                     )`;
            console.debug('SQL', sql);
            database.run(sql, (err) => {
                console.debug('err', err);
                if (err) {
                    observer.error(err)
                } else {
                    observer.next('Added')
                }
                observer.complete();
            });
        })
    }

}