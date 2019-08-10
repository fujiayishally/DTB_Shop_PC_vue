<template>
  <div>
    <Tree :data="data" :show-check-box="showCheckBox" />
  </div>
</template>

<script>
import Tree from './Tree'
export default {
  name: '',
  components: { Tree },
  data() {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [{ title: 'leaf 1-1-1' }, { title: 'leaf 1-1-2' }],
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [{ title: 'leaf 1-2-1' }, { title: 'leaf 1-2-2' }],
            },
          ],
        },
      ],
      showCheckBox: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>
