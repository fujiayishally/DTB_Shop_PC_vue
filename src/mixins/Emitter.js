import { findComponentUpward, findComponentsDownward } from '@/utils/assist.js'

// 向上给指定父组件派发事件并传递参数
function dispatch(componentName, eventName, ...params) {
  let parent = findComponentUpward(this, componentName)

  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params))
  }
}

// 向下给指定子组件广播事件，并转递参数
function broadcast(componentName, eventName, ...params) {
  let children = findComponentsDownward(this, componentName)
  children.forEach(item => item.$emit.apply(item, [eventName].concat(params)))
}
export default {
  methods: { dispatch, broadcast },
}
