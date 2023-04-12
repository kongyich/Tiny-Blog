import { createTaskQueue } from "../misc"

const taskQueue = createTaskQueue()

export const render = (element, dom) => {
/**
 * 1. 向任务队列中添加任务
 * 2. 制定在浏览器空闲时间执行任务
 * 
 * 通过 vdom 对象，构建fiber对象
*/

taskQueue.push({
  dom,
  props: { children: element }
})
}
