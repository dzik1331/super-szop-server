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
export class ProductService extends MainService{

    getAll() {
        return new Observable((observer) => {
            database.all("Select * From products", (err, data) => {
                if (err != null)
                    observer.next(null);
                else
                    observer.next(data)
                observer.complete();
            });
        })

    }

    addProduct(data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO products (
                         producer,
                         description,
                         img,
                         tags,
                         price,
                         name
                     )
                     VALUES (
                         ${this.dataToString(data.producer) || null},
                         ${this.dataToString(data.description) || null},
                         ${this.dataToString(data.img)},
                         ${this.dataToString(data.tags.join(',')) || null},
                         ${data.price},
                         ${this.dataToString(data.name)}
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