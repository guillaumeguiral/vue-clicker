<template>
  <div class="alerts">
    <div class="alert" v-for="alert in alerts" :key="alert.id" :class="alert.type" v-on:animationend="remove(alert)">
      <div class="alert-icon"><i class="fas" :class="alert.icon"></i></div>
      <div class="alert-content">
        <div class="alert-title">{{alert.title}}</div>
        <div class="alert-text">{{alert.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  props: {
    alerts: Array
  },
  methods: {
    remove(alert) {
      let index = this.alerts.indexOf(alert)
      if (index !== -1) this.alerts.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.alerts {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);

  .alert {
    display: flex;
    margin-top: 16px;
    padding: 16px;
    width: 500px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    color: #666;
    border: 1px solid #666;
    background-color: #111;
    box-shadow: 0 0 16px rgba($color: #666, $alpha: 0.6), 0 0 16px rgba($color: #666, $alpha: 0.3) inset;
    border-radius: 4px;
    animation: slide 6s ease-in-out forwards;

    &.info {
      color: #20d6c7;
      border-color: #20d6c7;
      background-color: #122;
      box-shadow: 0 0 16px rgba($color: #20d6c7, $alpha: 0.6), 0 0 16px rgba($color: #20d6c7, $alpha: 0.3) inset;
    }

    &.success {
      color: #9cdb43;
      border-color: #9cdb43;
      background-color: #121;
      box-shadow: 0 0 16px rgba($color: #9cdb43, $alpha: 0.6), 0 0 16px rgba($color: #9cdb43, $alpha: 0.3) inset;
    }

    &.danger {
      color: #df3e23;
      border-color: #df3e23;
      background-color: #311;
      box-shadow: 0 0 16px rgba($color: #df3e23, $alpha: 0.6), 0 0 16px rgba($color: #df3e23, $alpha: 0.3) inset;
    }

    .alert-icon {
      font-size: 2em;
      margin-right: 16px;
    }

    .alert-content {
      .alert-text {
        margin-top: 4px;
        font-size: 0.7em;
      }
    }
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translate(0, 100px);
  }
  10% {
    opacity: 1;
    transform: translate(0, 0);
  }
  90% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 100px);
    opacity: 0;
  }
}
</style>
