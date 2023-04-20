import { createTaskQueue, arrified, getTag } from "../misc"

const taskQueue = createTaskQueue()

let subTask = null

const getFirstTask = () => {
  /**
   * 从任务队列中获取任务
  */

  const task = taskQueue.pop()

  /**
   * 返回最外层节点的fiber对象
  */

  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null
  }
}

const reconcileChildren = (fiber, children) => {
  /**
   * children 即可能是对象，也可能是数组
   * 将 children 转换成数组
  */
  const arrifiedChildren = arrified(children)

  let index = 0, numberOfElements = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null

  while(index < numberOfElements) {
    element = arrifiedChildren[index]
    /**
     * 子级的fiber对象
    */
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'palcement',
      parent: fiber
    }

    newFiber.stateNode = createStateNode(newFiber)

    if(index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }
    
    prevFiber = newFiber
    
    index++
  }

}

const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children)
  /**
   * 如果存在同级，则返回同级，构建同级的子级
   * 如果同级不存在，则返回父级，看父级是否有同级
  */
  if(fiber.child) return fiber.child
  /**
   * 是否有同级？
  */

  let currentExecutelyFiber = fiber

  while(currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    ) 
    if(currentExecutelyFiber.sibling) return currentExecutelyFiber.sibling
    currentExecutelyFiber = currentExecutelyFiber.parent
  }
}

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
