import {ApiController, Controller, HttpGet, HttpPost, HttpStatusCode, SendsResponse} from 'dinoloop';
import {ProductService} from "../services/product.service";
import {database} from "../app";

@Controller('/product')
export class ProductController extends ApiController {

    constructor(private productService: ProductService) {
        super();
    }

    @HttpGet('/tags')
    tagsTypes() {
        return this.productService.getTags();
    }

    @SendsResponse()
    @HttpGet('/list')
    devices() {
        database.all("Select * From products", (err, data) => {
            // console.log(data)
            // console.log(err)
            if (err != null)
                this.response.status(HttpStatusCode.notFound).json(null);
            else
                this.response.status(HttpStatusCode.oK).json(data);
        });
    }

    @HttpPost('/add')
    add(body) {
        console.log(body)
        let sql = `INSERT INTO products (
                         producer,
                         description,
                         img,
                         tags,
                         price,
                         name
                     )
                     VALUES (
                         ${this.dataToString(body.producer) || null},
                         ${this.dataToString(body.description) || null},
                         ${this.dataToString(body.img)},
                         ${this.dataToString(body.tags.join(',')) || null},
                         ${body.price},
                         ${this.dataToString(body.name)}
                     )`;
        console.debug('SQL', sql);
        database.run(sql, (err, data) => {
            console.debug('err', err);
        });
        this.productService.products.push(body);
    }

    dataToString(data) {
        if (!data)
            return null;
        else
            return `'${data}'`;

    }
}