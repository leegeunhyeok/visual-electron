<template>
  <div id="drawer">
    <div class="drawer-btn" v-for="menu in lang[$store.state.setting.lang]['drawer']" :key="menu.name" @click="$emit('clickMenu', menu.name)">
      {{ menu.text }}
    </div>
    <div id="drawer-setting" class="drawer-btn" @click="$emit('clickMenu', 'setting')">
      {{ lang[$store.state.setting.lang]['setting'] }}
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
  z-index: 9998;
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
