<template>
  <div class="board">
    <div class="board-menu">
      <div class="board-menu-item" v-tooltip.left="'Factory'" :class="{selected: tab === 'factory'}" @click="changeTab('factory')"><i class="fas fa-cogs"></i></div>
      <div class="board-menu-item" v-tooltip.left="'Achievements'" :class="{selected: tab === 'achievements'}" @click="changeTab('achievements')"><i class="fas fa-trophy"></i></div>
      <div class="board-menu-item" v-tooltip.left="'Options'" :class="{selected: tab === 'options'}" @click="changeTab('options')"><i class="fas fa-wrench"></i></div>
      <div class="board-menu-item" v-tooltip.left="'About'" :class="{selected: tab === 'about'}" @click="changeTab('about')"><i class="fas fa-info"></i></div>
    </div>
    <div v-show="tab === 'factory'" class="factory">
      <div class="energize">
        <svg class="energize-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve">
          <g><path d="M917.4,459.7l72.6-42.6l-24.2-90.3l-84.2-0.6c-11.3-24.8-24.8-48.2-40.2-69.8l41.5-73.1l-66.2-66.1l-73.1,41.5c-21.9-15.6-45.3-29.1-69.8-40.3l-0.6-84.1L582.9,10l-42.6,72.5c-26.5-2.6-53.4-2.6-80.6,0.1L417.1,10l-90.3,24.2l-0.6,84.2c-24.8,11.3-48.2,24.8-69.8,40.2l-73.1-41.5l-66.1,66.1l41.5,73.1c-15.6,21.9-29.1,45.3-40.3,69.8l-84.1,0.6L10,417.1l72.5,42.6c-2.6,26.5-2.6,53.4,0.1,80.6L10,582.9l24.2,90.3l84.2,0.6c11.3,24.8,24.8,48.2,40.2,69.8l-41.5,73.1l66.1,66.1l73.1-41.5c21.9,15.6,45.3,29.1,69.8,40.3l0.6,84.1l90.3,24.2l42.6-72.5c26.5,2.6,53.4,2.6,80.6-0.1l42.6,72.6l90.3-24.2l0.6-84.2c24.8-11.3,48.2-24.8,69.8-40.2l73.1,41.5l66.2-66.1l-41.5-73.2c15.6-21.9,29.1-45.3,40.3-69.8l84.1-0.6l24.2-90.3l-72.5-42.6C920.1,513.8,920.1,486.9,917.4,459.7z M559.8,723.3c-123.3,33-250.1-40.1-283.2-163.5c-33-123.3,40.1-250.1,163.5-283.2c123.3-33,250.1,40.1,283.2,163.5C756.3,563.5,683.2,690.3,559.8,723.3z"/></g>
        </svg>
        <div class="energize-btn" @click="clickEnergize"><i class="fas fa-bolt"></i></div>
      </div>
      <div class="generate">
        <svg class="generate-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve">
          <g><path d="M917.4,459.7l72.6-42.6l-24.2-90.3l-84.2-0.6c-11.3-24.8-24.8-48.2-40.2-69.8l41.5-73.1l-66.2-66.1l-73.1,41.5c-21.9-15.6-45.3-29.1-69.8-40.3l-0.6-84.1L582.9,10l-42.6,72.5c-26.5-2.6-53.4-2.6-80.6,0.1L417.1,10l-90.3,24.2l-0.6,84.2c-24.8,11.3-48.2,24.8-69.8,40.2l-73.1-41.5l-66.1,66.1l41.5,73.1c-15.6,21.9-29.1,45.3-40.3,69.8l-84.1,0.6L10,417.1l72.5,42.6c-2.6,26.5-2.6,53.4,0.1,80.6L10,582.9l24.2,90.3l84.2,0.6c11.3,24.8,24.8,48.2,40.2,69.8l-41.5,73.1l66.1,66.1l73.1-41.5c21.9,15.6,45.3,29.1,69.8,40.3l0.6,84.1l90.3,24.2l42.6-72.5c26.5,2.6,53.4,2.6,80.6-0.1l42.6,72.6l90.3-24.2l0.6-84.2c24.8-11.3,48.2-24.8,69.8-40.2l73.1,41.5l66.2-66.1l-41.5-73.2c15.6-21.9,29.1-45.3,40.3-69.8l84.1-0.6l24.2-90.3l-72.5-42.6C920.1,513.8,920.1,486.9,917.4,459.7z M559.8,723.3c-123.3,33-250.1-40.1-283.2-163.5c-33-123.3,40.1-250.1,163.5-283.2c123.3-33,250.1,40.1,283.2,163.5C756.3,563.5,683.2,690.3,559.8,723.3z"/></g>
        </svg>
        <div class="generate-btn" @click="clickGenerate"><i class="fas fa-dollar-sign"></i></div>
      </div>
      <FloatingTexts :position="{ top: '35%', left: '50%' }" :texts="energizeTexts"></FloatingTexts>
      <FloatingTexts :position="{ top: '65%', left: '50%' }" :texts="generateTexts"></FloatingTexts>
    </div>
    <div v-show="tab === 'achievements'" class="achievements">
      <div class="achievement" v-tooltip.bottom="{content: (achievement.unlocked) ? achievement.title : null}" :class="{unlocked: achievement.unlocked}" v-for="achievement in achievements" :key="achievement.id">
        <i v-if="achievement.unlocked" class="fas" :class="achievement.icon"></i>
        <i v-if="!achievement.unlocked" class="fas fa-question"></i>
      </div>
    </div>
    <div v-show="tab === 'options'" class="options">
      Options
    </div>
    <div v-show="tab === 'about'" class="about">
      About
    </div>
  </div>
</template>

<script>
import FloatingTexts from "./FloatingTexts.vue";

export default {
  name: 'Board',
  components: {
    FloatingTexts
  },
  props: {
    achievements: Array,
    energizeTexts: Array,
    generateTexts: Array
  },
  data() {
    return {
      tab: 'factory'
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    clickEnergize() {
      this.$emit('clickEnergize')
    },
    clickGenerate() {
      this.$emit('clickGenerate')
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  flex-basis: 70%;
  width: 100%;
  height: 80vh;

  .board-menu {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 1;

    .board-menu-item {
      position: relative;
      width: 48px;
      height: 48px;
      margin: 8px 0;
      padding: 8px;
      border-radius: 4px 0 0 4px;
      color: #666;
      background-color: #222;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
      cursor: pointer;

      &:hover {
        color: #999;
        background-color: #333;
      }

      &.selected {
        color: #333;
        background-color: #20d6c7;
      }

      >i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.4em;
      }
    }
  }

  .factory {
    position: relative;
    width: 100%;
    height: 100%;

    .energize {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);

      .energize-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 72px;
        height: 72px;
        font-size: 2em;
        color: #666;
        background-color: #222;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.3);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        >i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &:hover {
          color: #ffd541;
          border: 1px solid #ffd541;
          background-color: #221;
          box-shadow: 0 0 16px rgba($color: #ffd541, $alpha: 0.6), 0 0 16px rgba($color: #ffd541, $alpha: 0.4) inset;
          transform: translate(-50%, -50%) scale(1.3);
        }
      }

      .energize-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 148px;
        height: auto;
        animation: rotator 3s linear infinite;
        fill: #191919;
      }
    }

    .generate {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);

      .generate-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 72px;
        height: 72px;
        font-size: 2em;
        color: #666;
        background-color: #222;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.3);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        >i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &:hover {
          color: #20d6c7;
          border: 1px solid #20d6c7;
          background-color: #122;
          box-shadow: 0 0 16px rgba($color: #20d6c7, $alpha: 0.6), 0 0 16px rgba($color: #20d6c7, $alpha: 0.4) inset;
          transform: translate(-50%, -50%) scale(1.3);
        }
      }

      .generate-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 148px;
        height: auto;
        animation: rotator 3s linear infinite;
        fill: #191919;
      }
    }
  }

  .achievements {
    display: flex;
    position: relative;
    width: 90%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    .achievement {
      position: relative;
      width: 32px;
      height: 32px;
      margin: 4px;
      padding: 8px;
      border-radius: 4px;
      color: #333;
      border: 1px solid #333;
      background-color: #111;

      >i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &.unlocked {
        color: #20d6c7;
        border: 1px solid #20d6c7;
        background-color: #122;
        cursor: pointer;
        transition: box-shadow 0.2s linear;

        &:hover {
          box-shadow: 0 0 16px rgba($color: #20d6c7, $alpha: 0.6), 0 0 16px rgba($color: #20d6c7, $alpha: 0.3) inset;
        }
      }
    }
  }

  .options {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .about {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
}

@keyframes rotator {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
