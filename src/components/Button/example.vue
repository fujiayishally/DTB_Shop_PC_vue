<template>
  <div>
    <div class="demo">
      <p>按钮类型</p>
      <Button type="default">按钮</Button>
      <Button type="primary">按钮</Button>
      <Button type="info">按钮</Button>
      <Button type="success">按钮</Button>
      <Button type="warning">按钮</Button>
      <Button type="error">按钮</Button>
      <Button type="text">按钮</Button>
    </div>
    <div class="demo" style="background-color:rgb(190, 200, 200);">
      <p>幽灵按钮</p>
      <Button type="default" ghost>按钮</Button>
      <Button type="primary" ghost>按钮</Button>
      <Button type="info" ghost>按钮</Button>
      <Button type="success" ghost>按钮</Button>
      <Button type="warning" ghost>按钮</Button>
      <Button type="error" ghost>按钮</Button>
      <Button type="text" ghost>按钮</Button>
    </div>

    <div class="demo">
      <p>禁用按钮</p>
      <Button disabled type="default">按钮</Button>
      <Button disabled type="primary">按钮</Button>
      <Button disabled type="info">按钮</Button>
      <Button disabled type="success">按钮</Button>
      <Button disabled type="warning">按钮</Button>
      <Button disabled type="error">按钮</Button>
      <Button disabled type="text">按钮</Button>
    </div>
    <div class="demo">
      <p>按钮大小</p>
      <div style="margin-bottom:5px;">
        <Button type="primary" long size="large">长按钮</Button>
      </div>
      <Button type="primary" size="large">大号按钮</Button>
      <Button type="primary" size="default">普通按钮</Button>
      <Button type="primary" size="small">小型按钮</Button>
    </div>

    <div class="demo">
      <p>按钮形状</p>
      <Button type="info" shape="circle">圆形按钮</Button>
      <Button type="info">默认按钮</Button>
      <Button type="info" shape="square">方形按钮</Button>
    </div>

    <div class="demo">
      <p>按钮图标</p>
      <Button type="primary" icon="search" />
      <Button type="primary" icon="search" shape="circle"></Button>
      <Button type="primary" icon="search">Search</Button>
      <Button type="primary" icon="search">
        <span>Search</span>
        <Icon type="right" />
      </Button>
      <Button type="primary" icon="search" shape="circle">Search</Button>
    </div>

    <div class="demo">
      <p>加载图标</p>
      <Button type="info" loading />
      <Button type="primary" shape="circle" loading></Button>
      <Button type="primary" loading>Loading...</Button>
    </div>
    <div class="demo">
      <p>跳转按钮</p>
      <Button to="/product">Normal</Button>
      <Button to="/product" replace>No history</Button>
      <Button to="//baidu.com" target="_blank">New window</Button>
    </div>
  </div>
</template>

<style lang="scss">
.demo {
  float: left;
  clear: left;
  margin: 10px;
  padding: 10px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  & > button,
  & > a {
    margin: 0 5px;
  }
}
</style>
