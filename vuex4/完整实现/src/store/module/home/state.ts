interface IMsg {
  id: number,
  code: string,
  name: string,
  addr: string
}

interface IHomeList {
  [key: number]: IMsg
}

interface IState {
  'homeList': IHomeList
}

const state: IState = {
  homeList: [{
    id: 0,
    code: '123d1',
    name: '红太阳',
    addr: '幸福路1号'
  },
  {
    id: 1,
    code: '123a2',
    name: '金浪漫',
    addr: '浪漫路2号'
  },
  {
    id: 2,
    code: '123d6',
    name: '红彤彤',
    addr: '喜悦路23号'
  },
  {
    id: 3,
    code: '123c5',
    name: '喜洋洋',
    addr: '快乐路1号'
  },
  {
    id: 4,
    code: '123p0',
    name: '大草原',
    addr: '搞笑路1号'
  },
  {
    id: 5,
    code: '123h3',
    name: '红太郎',
    addr: '幸福路24号'
  }
  ]
}

export { IMsg, IHomeList, IState, state }
