<template>
  <div class="energy" :class="{high: value > 80, medium: value > 40 && value <= 80, low: value <= 40}">
    <div class="energy-icon"><i class="fas fa-bolt"></i></div>
    <div class="energy-total">{{toPercent}}</div>
  </div>
</template>

<script>
export default {
  name: 'Energy',
  props: {
    value: Number
  },
  computed: {
    toPercent() {
      return Math.round(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.energy {
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
  color: #333;
  border: 1px solid #333;
  background-color: #111;
  box-shadow: 0 0 16px rgba($color: #333, $alpha: 0.6), 0 0 16px rgba($color: #333, $alpha: 0.3) inset;
  border-radius: 4px;

  &.low {
    color: #b4202a;
    border-color: #b4202a;
    background-color: #210;
    box-shadow: 0 0 16px rgba($color: #b4202a, $alpha: 0.6), 0 0 16px rgba($color: #b4202a, $alpha: 0.3) inset;
  }

  &.medium {
    color: #f9a31b;
    border-color: #f9a31b;
    background-color: #220;
    box-shadow: 0 0 16px rgba($color: #f9a31b, $alpha: 0.6), 0 0 16px rgba($color: #f9a31b, $alpha: 0.3) inset;
  }

  &.high {
    color: #ffd541;
    border-color: #ffd541;
    background-color: #121;
    box-shadow: 0 0 16px rgba($color: #ffd541, $alpha: 0.6), 0 0 16px rgba($color: #ffd541, $alpha: 0.3) inset;
  }
}
</style>
