// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
// Thanks to: https://github.com/calebroseland/vue-dom-portal

function getTarget(node) {
  if (node === void 0) {
    node = document.body
  }
  if (node === true) {
    return document.body
  }
  return node instanceof window.Node ? node : document.querySelector(node)
}

const directive = {
  inserted(el, { value }) {
    if (el.dataset && el.dataset.transfer !== 'true') return false

    el.className = `${el.className} v-transfer-dom`

    const parentNode = el.parentNode
    if (!parentNode) return

    const home = document.createComment('')
    let hasMoveOut = false

    if (value !== false) {
      parentNode.replaceChild(home, el) // moving out, el is no longer in the document
      getTarget(value).appendChild(el) // moving into new place
      hasMoveOut = true
    }

    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode,
        home,
        hasMoveOut,
        target: getTarget(value),
      }
    }
  },
  componentUpdated(el, { value }) {
    if (el.dataset && el.dataset.transfer !== 'true') return false

    const ref$1 = el.__transferDomData
    if (!ref$1) return false

    const { parentNode, home, hasMoveOut } = ref$1

    if (!hasMoveOut && value) {
      parentNode.replaceChild(home, el) // remove from document and leave placeholder
      getTarget(value).appendChild(el) // append to target
      el.__transferDomData = {
        ...el.__transferDomData,
        ...{ hasMovedOut: true, target: getTarget(value) },
      }
    } else if (hasMoveOut && value === false) {
      parentNode.replaceChild(el, home) // previously moved, coming back home
      el.__transferDomData = {
        ...el.__transferDomData,
        ...{ hasMovedOut: false, target: getTarget(value) },
      }
    } else if (value) {
      getTarget(value).appendChild(el) // already moved, going somewhere else
    }
  },
  unbind(el) {
    if (el.dataset && el.dataset.transfer !== 'true') return false
    el.className = el.className.replace('v-transfer-dom', '')
    const ref$1 = el.__transferDomData
    if (!ref$1) return
    if (el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode &&
        el.__transferDomData.parentNode.appendChild(el)
    }
    el.__transferDomData = null
  },
}

export default directive
