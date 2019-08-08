<template>
  <button :class="typeClass">
    <IconSvg type="loading" v-if="isLoading" :class="loadingClass" />

    <IconSvg
      v-if="leftIcon"
      :class="iconClass"
      :type="leftIcon"
      :size="$attrs['icon-size']"
    />

    <span v-if="$slots.default" :class="buttonTextClass">
      <slot></slot>
    </span>

    <IconSvg
      v-if="rightIcon"
      :class="iconClass"
      :type="rightIcon"
      :size="$attrs['icon-size']"
    />
  </button>
</template>

<script>
import { buttonPrefix } from '@/assets/styles/variables.scss'

export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        const enumValue = [
          'default',
          'primary',
          'info',
          'warning',
          'danger',
          'save',
        ]
        return enumValue.indexOf(value) !== -1
      },
    },
    size: {
      type: String,
      default: 'normal',
      validator: function(value) {
        const enumValue = ['large', 'normal', 'small', 'mini']
        return enumValue.indexOf(value) !== -1
      },
    },
  },
  computed: {
    typeClass() {
      let buttonPrefix = this.buttonPrefix
      let classStr = ''
      classStr += ` ${buttonPrefix}`
      classStr += ` ${buttonPrefix}-${this.type}`
      classStr += ` ${buttonPrefix}-${this.size}`
      if (this.$attrs.hasOwnProperty('plain'))
        classStr += ` ${buttonPrefix}-plain`
      if (this.$attrs.hasOwnProperty('disabled'))
        classStr += ` ${buttonPrefix}-disabled`
      if (this.$attrs.hasOwnProperty('square'))
        classStr += ` ${buttonPrefix}-square`
      if (this.$attrs.hasOwnProperty('round'))
        classStr += ` ${buttonPrefix}-round`
      return classStr
    },
    loadingClass() {
      let classStr = ''
      classStr += '__spinner'
      classStr += ` ${buttonPrefix}-loading`
      classStr += ` ${buttonPrefix}-button-icon`
      return classStr
    },
    buttonTextClass() {
      let classStr = ''
      classStr += ` ${buttonPrefix}-button-text`
      return classStr
    },
    iconClass() {
      let classStr = ''
      classStr += ` ${buttonPrefix}-button-icon`
      return classStr
    },
    isLoading() {
      return this.$attrs.hasOwnProperty('loading')
    },
    leftIcon() {
      return this.$attrs['left-icon']
    },
    rightIcon() {
      return this.$attrs['right-icon']
    },
  },
  data() {
    return {
      buttonPrefix,
    }
  },
}
</script>

<style lang="scss">
.#{$ButtonPrefix} {
  position: relative;
  margin: 0;
  text-align: center;
  box-sizing: border-box;
  -webkit-appearance: none;
  border-radius: $ButtonRadius;
}

$sizes: (
  large: $ButtonSizeLarge,
  normal: $ButtonSizeNormal,
  small: $ButtonSizeSmall,
  mini: $ButtonSizeMini,
);

@each $sizeName, $settings in $sizes {
  .#{$ButtonPrefix + '-' + $sizeName} {
    min-width: map-get($settings, width);
    height: map-get($settings, height);
    line-height: map-get($settings, line-height);
    padding: map-get($settings, padding);
    font-size: map-get($settings, font);
  }
}

.#{$ButtonPrefix + '-square' } {
  border-radius: 0;
}
.#{$ButtonPrefix + '-round' } {
  border-radius: 10em;
}

$types: (
  primary: $Primary,
  save: $Save,
  info: $Info,
  warning: $Warning,
  danger: $Danger,
);

@each $type, $typeColor in $types {
  .#{$ButtonPrefix + '-' + $type} {
    color: $White;
    background-color: $typeColor;
    border: 1px solid $typeColor;

    &.#{$ButtonPrefix + '-plain'} {
      background-color: $White;
      color: $typeColor;
    }
  }
}
.#{$ButtonPrefix + '-default' } {
  color: $DimGray;
  background-color: $White;
  border: 1px solid $Gainsboro;
}

.#{$ButtonPrefix + '-disabled'} {
  opacity: 0.6;
}

.#{$ButtonPrefix + '-loading'}.__spinner {
  font-size: 20px;
  animation-duration: 1.4s;
}

.#{$ButtonPrefix} .#{$ButtonPrefix + '-button-text'}:not(:first-child) {
  display: inline-block;
  margin-left: 5px;
  vertical-align: top;
}

.#{$ButtonPrefix} .#{$ButtonPrefix + '-button-text'}:not(:last-child) {
  display: inline-block;
  margin-right: 5px;
  vertical-align: top;
}
.#{$ButtonPrefix} .#{$ButtonPrefix + '-button-icon'} {
  // margin-top: -1px;
}
</style>
