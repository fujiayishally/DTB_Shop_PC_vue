<template>
  <div>
    <div class="demo">
      <Button type="default">按钮</Button>
      <Button type="primary">按钮</Button>
      <Button type="info">按钮</Button>
      <Button type="success">按钮</Button>
      <Button type="warning">按钮</Button>
      <Button type="error">按钮</Button>
      <Button type="text">按钮</Button>
    </div>
    <div class="demo">
      <Button>按钮</Button>
      <Button plain type="default">按钮</Button>
      <Button plain type="primary">按钮</Button>
      <Button plain type="save">按钮</Button>
      <Button plain type="danger">按钮</Button>
      <Button plain type="warning">按钮</Button>
      <Button plain type="info">按钮</Button>
    </div>

    <div class="demo">
      <Button>按钮</Button>
      <Button disabled type="default">按钮</Button>
      <Button disabled type="primary">按钮</Button>
      <Button disabled type="save">按钮</Button>
      <Button disabled type="danger">按钮</Button>
      <Button disabled type="warning">按钮</Button>
      <Button disabled type="info">按钮</Button>
    </div>
    <div class="demo">
      <Button type="primary" loading />
      <Button type="primary" loading loading-type="spinner" />
      <Button type="danger" loading>加载中...</Button>
    </div>
    <div class="demo">
      <Button square type="primary">方形按钮</Button>
      <Button round type="danger">圆形按钮</Button>
    </div>
    <div class="demo">
      <Button left-icon="search" icon-size="30" type="primary" />
      <Button right-icon="search" icon-size="30" type="primary" />
      <Button left-icon="search" icon-size="30" type="primary">按钮</Button>
      <Button right-icon="search" icon-size="30" type="primary">按钮</Button>
    </div>
    <div class="demo">
      <Button type="primary" size="large">大号按钮</Button>
      <Button type="primary" size="normal">普通按钮</Button>
      <Button type="primary" size="small">小型按钮</Button>
      <Button type="primary" size="mini">迷你按钮</Button>
    </div>
  </div>
</template>

<style lang="scss">
.demo {
  margin: 10px;

  & > * {
    margin: 10px;
  }
}
</style>
