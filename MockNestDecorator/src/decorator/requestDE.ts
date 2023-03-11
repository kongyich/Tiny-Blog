import 'reflect-metadata'
import MethodType from '../utils/methodTypes';

// 封装方法装饰器
function reqMethodDecorator(methodType: MethodType) {
  return function (path: string): MethodDecorator {
    return (targetPrototype, methodname) => {
      console.log("方法装饰器:执行的类是:", targetPrototype, " 方法是:", methodname)
      Reflect.defineMetadata('path', path, targetPrototype, methodname)
      Reflect.defineMetadata('methodtype', methodType, targetPrototype, methodname)
    }
  }
}

export const Get = reqMethodDecorator("get")
export const Post = reqMethodDecorator("post")
