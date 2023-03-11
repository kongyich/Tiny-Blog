import { Request, Response } from 'express'
import {
  Get, Controller, Middleware
} from '../decorator';
import { FirstMiddleAware, SecondMiddleAware } from '../middleware'
// import { router } from '../utils/router';

@Controller("/")
class FoodController {
  @Get("/showFood/:foodname/:price")
  @Middleware(SecondMiddleAware)
  @Middleware(FirstMiddleAware)
  showFood(req: Request, res: Response): void {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    let foodname = req.params.foodname
    let price = req.params.price
    res.write(`food:${foodname}`);
    res.write(`food:${price}`);
    res.write("very good");
    res.write("nice")

    res.end();
  }
}
