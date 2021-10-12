<template>
  <div class="credits">
    <div class="credits-icon"><i class="fas fa-dollar-sign"></i></div>
    <div class="credits-total">{{shorten(value)}}</div>
  </div>
</template>

<script>
import numbro from "numbro";

export default {
  name: 'Credits',
  props: {
    value: Number
  },
  methods: {
    shorten(n) {
      return numbro(n).format({ thousandSeparated: true, average: true, totalLength: 2 })
    }
  }
}
</script>

<style lang="scss" scoped>
.credits {
  position: relative;
  display: flex;
  width: 300px;
  margin: 0 16px;
  padding: 16px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  font-size: 2em;
  font-weight: 600;
  color: #20d6c7;
  border: 1px solid #20d6c7;
  background-color: #122;
  box-shadow: 0 0 16px rgba($color: #20d6c7, $alpha: 0.6), 0 0 16px rgba($color: #20d6c7, $alpha: 0.3) inset;
  border-radius: 4px;

  .credits-total {
    text-shadow: 0 0 16px rgba($color: #20d6c7, $alpha: 0.6)
  }
}
</style>
