import { Router } from 'express';
import { init } from './../../node_modules/openai/_shims/index.d';
import { OpenAIRoutes } from './openai.routes';

export class Routes{
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    
    private initRoutes() {
        this.router.use('/openai', new OpenAIRoutes().router);
    }
}