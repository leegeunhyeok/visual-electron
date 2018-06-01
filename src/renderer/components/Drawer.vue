<template>
  <div id="drawer">
    <div class="drawer-btn" v-for="menu in lang[$store.state.language.lang]['drawer']" :key="menu">
      {{ menu }}
    </div>
    <div id="drawer-setting" class="drawer-btn">
      {{ lang[$store.state.language.lang]['setting'] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  props: ['lang']
}
</script>

<style>

#drawer {
  background-color: #1a1b24;
  position: absolute;
  top: 50px;
  width: 300px;
  height: calc(100% - 50px);
}

.drawer-btn {
  cursor: pointer;
  color: #d5d5d5;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  transition: 0.2s;
}

.drawer-btn:hover {
  background-color: #282a38;
}

#drawer-setting {
  border-top: 1px solid #21222e;
  position: absolute;
  bottom: 0px;
}

</style>
