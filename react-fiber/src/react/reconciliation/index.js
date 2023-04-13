import { createTaskQueue } from "../misc"

const taskQueue = createTaskQueue()

const subTask = null

const getFirstTask = () => {

}

const executeTask = fiber => {}

const workLoop = deadline => {
  if(!subTask) {
    subTask = getFirstTask()
  }

  /**
   * 任务存在并且浏览器有空余时间
   * 执行任务/接受任务/返回新的任务
  */

  while(subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
  }
}

const performTask = deadline => {
  workLoop(deadline)
  /**
   * 是否还有没执行的任务？
  */
  if(subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

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

  /**
   * 在浏览器空闲的时候执行任务
  */

  requestIdleCallback(performTask)
}
