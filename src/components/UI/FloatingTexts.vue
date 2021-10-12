<template>
  <div class="floating-texts" :style="position">
    <div class="floating-text" v-for="text in texts" :key="text.id" v-on:animationend="remove(text)" :style="text.style"><i class="fas" :class="text.icon"></i> {{text.text}}</div>
  </div>
</template>

<script>
export default {
  name: 'FloatingTexts',
  props: {
    position: Object,
    texts: Array
  },
  methods: {
    remove(text) {
      let index = this.texts.indexOf(text)
      if (index !== -1) this.texts.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-texts {
  position: absolute;
  top: 50%;
  left: 50%;

  .floating-text {
    position: absolute;
    width: 50px;
    color: #fff;
    text-align: center;
    animation: pop 0.8s ease-out forwards;
  }
}

@keyframes pop {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
