const clickOutside = {
  bind(el, binding) {
    function clickHandler(event) {
      console.log(el.contains(event.target))
      if (el.contains(event.target)) {
        return false
      }

      if (binding.expression) {
        binding.value(event)
      }
    }

    el.__vueClickOutside__ = clickHandler
    document.addEventListener('click', clickHandler)
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}

export default clickOutside
