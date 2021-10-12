<template>
  <div class="click-value">
    <div class="click-value-icon"><i class="fas fa-mouse-pointer"></i></div>
    <div class="click-value-total">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'ClickValue',
  props: {
    value: Number
  }
}
</script>

<style lang="scss" scoped>
.click-value {
  display: flex;
  width: 150px;
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
}
</style>
