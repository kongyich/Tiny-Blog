import { Request, Response, NextFunction } from 'express'

// 测试中间件函数1
export const FirstMiddleAware = (req: Request, res: Response,
  next: NextFunction) => {
  console.log("第一个中间件函数....")
  next();
}

// 测试中间件函数1
export const SecondMiddleAware = (req: Request, res: Response,
  next: NextFunction) => {
  console.log("第二个中间件函数....")
  next();
}
