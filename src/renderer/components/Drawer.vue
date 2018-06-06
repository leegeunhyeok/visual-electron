<template>
  <div id="drawer">
    <div v-if="$store.state.drawer.edit">
      <div class="drawer-btn" v-for="menu in lang[$store.state.setting.lang]['drawer']['edit']" :key="menu.name" @click="$emit('clickEditMenu', menu.name)">
        {{ menu.text }}
      </div>
      <div class="drawer-btn drawer-bottom" @click="$emit('clickEditMenu', 'home')">
        {{ lang[$store.state.setting.lang]['home'] }}
      </div>
    </div>
    <div v-else>
      <div class="drawer-btn" v-for="menu in lang[$store.state.setting.lang]['drawer']['default']" :key="menu.name" @click="$emit('clickMenu', menu.name)">
        {{ menu.text }}
      </div>
      <div class="drawer-btn drawer-bottom" @click="$emit('clickMenu', 'setting')">
        {{ lang[$store.state.setting.lang]['setting'] }}
      </div>
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

.drawer-bottom {
  border-top: 1px solid #21222e;
  position: absolute;
  bottom: 0px;
}

</style>
