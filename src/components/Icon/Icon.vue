<template>
  <component :is="tagName" v-bind="tagProps" @click="handleClick" />
</template>

<script>
import IconSVG from './IconSvg'
import IconPNG from './IconPng'

export default {
  name: 'Icon',
  components: { IconSVG, IconPNG },
  props: {
    png: Boolean,
    type: {
      type: String,
      required: true,
    },
    size: [Number, String],
    color: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    isPngPattern() {
      const { png } = this
      return !!png
    },
    tagSize() {
      if (this.size) {
        return /(em|px)$/.test(this.size) ? this.size : `${this.size}px`
      } else {
        return this.size
      }
    },
    tagName() {
      const { isPngPattern } = this
      return isPngPattern ? 'IconPNG' : 'IconSVG'
    },
    tagProps() {
      const { isPngPattern, type, color, tagSize } = this
      if (isPngPattern) {
        return {
          type,
          size: tagSize,
        }
      } else {
        return {
          type,
          color,
          size: tagSize,
        }
      }
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="" scoped></style>
