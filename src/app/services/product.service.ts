import {Injectable} from "injection-js";
import {database} from "../app";
import {Observable} from "rxjs";
import {MainService} from "./mainService";

interface Product {
    id;
    name;
    price;
    tags;
    img;
    description;
}

@Injectable()
export class ProductService extends MainService {

    getAll(request, userId) {

        let sql = "Select * From products";
        if (userId != null) {
            sql = sql + ` WHERE userId = ${userId}`;
        }
        return new Observable((observer) => {
            this.checkSession(request).subscribe((result) => {
                if (result) {
                    database.all(sql, (err, data) => {
                        if (err != null)
                            observer.next(null);
                        else
                            observer.next(data);
                        observer.complete();
                    });
                } else {
                    this.sendSessionError(observer);
                }
            })
        })

    }

    addProduct(request, data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO products (
                         producer,
                         description,
                         img,
                         tags,
                         price,
                         name,
                         userId
                     )
                     VALUES (
                         ${this.dataToString(data.producer) || null},
                         ${this.dataToString(data.description) || null},
                         ${this.dataToString(data.img)},
                         ${this.dataToString(data.tags.join(',')) || null},
                         ${data.price},
                         ${this.dataToString(data.name)},
                         ${data.userId}
                     )`;

            this.checkSession(request).subscribe(
                (result) => {
                    if (result) {
                        database.run(sql, (err) => {
                            if (err) {
                                observer.error(err)
                            } else {
                                observer.next('Added')
                            }
                            observer.complete();
                        });
                    } else {
                        this.sendSessionError(observer);
                    }
                }
            )

        })
    }


    getTags() {
        return [
            'Jedzenie',
            'Elektronika',
            'RTV AGD',
            'Telewizor',
            'Komputer',
            'PC',
            'Laptop',
            'Notebook',
            'Muzyka',
            'Film',
            'Bajka',
            'Książka',
            'Animacja',
            'Warzywa',
            'Owoce',
            'Kuchnia',
            'Sypialnia',
            'Łazienka',
            'Rozrywka',
            'Gry',
            'Meble',
            'Remont'
        ]
    }
}