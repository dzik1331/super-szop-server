import {
    ApiController,
    Controller,
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut,
    HttpStatusCode,
    SendsResponse
} from 'dinoloop';
import {ProductService} from "../services/product.service";
import * as fs from "fs";

@Controller('/product')
export class ProductController extends ApiController {
    private LIMIT_IMAGES = 4;

    constructor(private productService: ProductService) {
        super();
    }

    @HttpGet('/tags')
    tagsTypes() {
        return this.productService.getTags();
    }

    @SendsResponse()
    @HttpGet('/list')
    products() {
        this.productService.getAll(this.request, null).subscribe((result) => {
                console.debug('Result', result);
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }

    @SendsResponse()
    @HttpGet('/get/:userId/:id')
    product(userId, id) {
        this.productService.get(this.request, userId, id).subscribe((result) => {
                console.debug('Result', result);
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }

    @SendsResponse()
    @HttpGet('/list/:userId')
    productsById(userId) {
        this.productService.getAll(this.request, userId).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }


    @SendsResponse()
    @HttpPost('/add')
    add(body) {
        const images = [];
        body.img.forEach((image, index) => {
            if (index < this.LIMIT_IMAGES) {
                const name = new Date().getTime() + '_' + body.img[index].name;
                images.push(name);
                fs.writeFileSync("public/images/" + name, body.img[index].result, 'base64');
            }
        });
        this.productService.addProduct(this.request, body, images).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }

    @SendsResponse()
    @HttpPut('/edit/:id')
    edit(body, id) {
        this.productService.editProduct(this.request, body, id).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
            console.debug('errr',error);
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }

    @SendsResponse()
    @HttpDelete('/remove/:id/:userId')
    remove(id, userId) {
        this.productService.removeProduct(this.request, id, userId).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }
}