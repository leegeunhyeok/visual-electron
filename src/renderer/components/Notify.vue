<template>
  <div id="notify-area">
    {{ message }}
    <div id="notify-close-area" @click="$emit('closeNotify')">
      <div class="notify-close notify-close-1"></div>
      <div class="notify-close notify-close-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notify',
  props: ['message']
}
</script>

<style>

#notify-area {
  position: absolute;
  top: 65px;
  right: 15px;
  background-color: #1a1b24;
  color: #a2ecfb;
  font-weight: bold;
  line-height: 40px;
  padding-left: 20px;
  height: 40px;
  z-index: 9999;
}

#notify-close-area {
  position: relative;
  cursor: pointer;
  margin: 0;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  float: right;
  transition: .5s;
}

#notify-close-area:hover {
  background-color: #282a38;
}

.notify-close {
  position: absolute;
  cursor: pointer;
  top: 19px;
  left: 10px;
  width: 20px;
  height: 3px;
  background-color: #a2ecfb;
}

.notify-close-1 {
  transform: rotate(45deg)
}

.notify-close-2 {
  transform: rotate(-45deg)
}

</style>
