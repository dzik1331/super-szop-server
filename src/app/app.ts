import express = require('express');
import bodyParser = require('body-parser');
import {ApiController, Dino} from 'dinoloop';
import {ReflectiveInjector} from "injection-js";
import {Container, CONTROLLERS} from "./container";
import * as clone from 'lodash.clone';
import * as cors from 'cors'
const app = express();
const port = process.env.PORT || 8443;

/************ basic express-setup **************/
app.use(bodyParser.json());
app.use(cors());
// Dino requires express app instance
// and the base-uri on which dino app to be mounted
const dino = new Dino(app, '/api');

dino.useRouter(() => express.Router());
CONTROLLERS.forEach((c: any) => {
    dino.registerController(c);
});



dino.dependencyResolver<ReflectiveInjector>(Container,
    (injector, type) => {
        let t = injector.get(type);
        if (t instanceof ApiController) {
            return clone(t);
        }

        return t;
    });

dino.bind();
app.listen(port, () => console.log(`Server started on port ${port}`));
