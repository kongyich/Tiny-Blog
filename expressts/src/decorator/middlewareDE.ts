import 'reflect-metadata'
import { RequestHandler } from 'express'

export const Middleware = function(middleware: RequestHandler): MethodDecorator {
  return (target, methodName) => {
    let middlewares = Reflect.getMetadata('middleawares', target, methodName) || []

    middlewares.push(middleware)
    Reflect.defineMetadata('middleawares', middlewares, target, methodName)
  }
}
