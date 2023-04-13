const createTaskQueue = () => {
  const taskQueue = []

  return {
    /**
     * 向任务队列添加任务
    */
    push: item => taskQueue.push(item),
    /**
     * 从任务队列获取任务
    */
    pop: () => taskQueue.shift(),

    /**
     * 
     * 判断是否还有任务？
    */
   isEmpty: () => taskQueue.length === 0
  }
}

export default createTaskQueue
