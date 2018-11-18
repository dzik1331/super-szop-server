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
    products() {
        this.productService.getAll().subscribe((result) => {
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
        this.productService.addProduct(body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }
}