import {ApiController, Controller, HttpGet} from 'dinoloop';

@Controller('/product')
export class ProductController extends ApiController {

    constructor() {
        super();
    }

    @HttpGet('/list')
    devices() {
        return [
            {
                id: 1,
                name: 'Produkt 1',
                price: 25,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'https://bakoma.pl/wp-content/uploads/bio_truskawka_370x370-200x200.png',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 2,
                name: 'Produkt 2',
                price: 501.45,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://www.aleradetails.com/wp-content/uploads/2016/08/238239-200x200.jpg',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 3,
                name: 'Produkt 3',
                price: 49.99,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://superhitproducts.in/wp-content/uploads/2017/01/i-love-sundays-black-mug-31-200x200.jpg',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 4,
                name: 'Produkt 4',
                price: 100,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://avoornetworks.com/wp-content/uploads/2016/10/wireless-cisco-200x200.png',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 5,
                name: 'Produkt 1',
                price: 25,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'https://bakoma.pl/wp-content/uploads/bio_truskawka_370x370-200x200.png',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 6,
                name: 'Produkt 2',
                price: 501.45,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://www.aleradetails.com/wp-content/uploads/2016/08/238239-200x200.jpg',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 7,
                name: 'Produkt 3',
                price: 49.99,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://superhitproducts.in/wp-content/uploads/2017/01/i-love-sundays-black-mug-31-200x200.jpg',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            },
            {
                id: 8,
                name: 'Produkt 4',
                price: 100,
                tags: ['elektronika', 'komputery Pc'],
                imgSmall: 'http://avoornetworks.com/wp-content/uploads/2016/10/wireless-cisco-200x200.png',
                description: 'Produkt najwyższej jakości, wyprodukowany w Chinach'
            }
        ];
    }
}