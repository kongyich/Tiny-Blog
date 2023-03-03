import { router } from '../utils/router'
import { RequestHandler } from 'express'
import MethodType from '../utils/methodTypes'

export function Controller(rootPath: string): ClassDecorator {
  return (target) => {
    for(let methodName in target.prototype) {
      let routerPath = Reflect.getMetadata('path', target.prototype, methodName)
      let reqName: MethodType = Reflect.getMetadata('methodtype', target.prototype, methodName)
      const targetMethodfunc: RequestHandler = target.prototype[methodName];

      let middleawareFuncs: RequestHandler[] = Reflect.getMetadata('middleawares', target.prototype, methodName)
      console.log('controller:', routerPath, reqName)
      if(routerPath && reqName) {
        if(middleawareFuncs) {
          router[reqName](routerPath, ...middleawareFuncs, targetMethodfunc)
        } else {
          router.get(routerPath, targetMethodfunc)
          router[reqName](routerPath, targetMethodfunc)
        }
      }
    }
  }
}
