export default {
  functional: true,
  inject: ['TableRoot'],
  props: {
    row: Object, //当前行的数据
    column: Object, //当前列的数据
    index: Number, //当前是第几行
    render: Function, //具体的 render 函数内容
    slot: String,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    }
    const slot = ctx.props.slot
    const render = ctx.props.render

    if (slot)
      return h('div', ctx.injections.TableRoot.$scopedSlots[slot](params))
    if (render) return render(h, params)
  },
}
