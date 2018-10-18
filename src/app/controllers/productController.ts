import {ApiController, Controller, HttpGet, HttpPost} from 'dinoloop';
import {ProductService} from "../services/product.service";

@Controller('/product')
export class ProductController extends ApiController {

    constructor(private productService: ProductService) {
        super();
    }

    @HttpGet('/tags')
    tagsTypes() {
        return this.productService.getTags();
    }

    @HttpGet('/list')
    devices() {
        return this.productService.products
    }

    @HttpPost('/add')
    add(body) {
        console.log(body)
        this.productService.products.push(body);
    }
}