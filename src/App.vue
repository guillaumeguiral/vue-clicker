<template>
  <div id="app">
    <vue-particles
      class="particles"
      color="#777"
      linesColor="#555"
      shapeType="polygon"
      :particleSize="2"
      :clickEffect="false"
    ></vue-particles>
    <div class="wrapper">
      <div class="header">
        <ClickValue :value="game.clickValue"></ClickValue>
        <Credits :value="game.credits"></Credits>
        <IncomeRate :value="game.incomeRate"></IncomeRate>
        <Energy :value="game.energy"></Energy>
      </div>
      <div class="ui">
        <Sidebar
          :parts="config.parts"
          :credits="game.credits"
          :energy="game.energy"
          v-on:buildPart="buildPart"
        ></Sidebar>
        <Board
          v-on:clickEnergize="clickEnergize"
          v-on:clickGenerate="clickGenerate"
          :achievements="config.achievements"
          :energizeTexts="energizeTexts"
          :generateTexts="generateTexts"
        ></Board>
      </div>
      <Alerts :alerts="alerts"></Alerts>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Howl } from 'howler';

import Alerts from './components/UI/Alerts.vue';
import Credits from './components/UI/Credits.vue';
import IncomeRate from './components/UI/IncomeRate.vue';
import ClickValue from './components/UI/ClickValue.vue';
import Energy from './components/UI/Energy.vue';
import Sidebar from './components/UI/Sidebar.vue';
import Board from './components/UI/Board.vue';

const sounds = {
  achievement: new Howl({
    src: ['./sounds/beep.mp3'],
  }),
};

function toFixed2(n) {
  return Math.floor(n * 100) / 100;
}

function findPartBuiltByID(parts, id) {
  let part = parts.find((part) => part.id === id);
  return part ? part.built : 0;
}

function pushToStats(arr, data) {
  arr.unshift(data);
  if (arr.length > 10) arr.length = 10;
}

export default {
  name: 'app',
  components: {
    Alerts,
    Credits,
    IncomeRate,
    ClickValue,
    Energy,
    Sidebar,
    Board,
  },
  data() {
    return {
      gameTick: 100,
      mainLoopHandler: null,
      achievementLoopHandler: null,
      energyDrainLoopHandler: null,
      config: {},
      game: {
        credits: 0,
        incomeRate: 0,
        shards: 0,
        clickValue: 1,
        energy: 100,
        energyCapacitor: 100,
        energyConsumption: 1,
        energyClickValue: 2,
      },
      energizeTexts: [],
      generateTexts: [],
      alerts: [],
      stats: {
        credits: [],
        energy: [],
      },
    };
  },
  methods: {
    loadConfig() {
      return axios
        .get('./data.json')
        .then((res) => {
          this.config = res.data;
          this.start();
        })
        .catch((err) => console.error(err));
    },
    computeCredits() {
      let ir = 0;
      // Get the incoming rate per part
      this.config.parts.forEach((part) => {
        // Multiply the final incoming rate of this tick with the energy coef
        ir += part.baseIncomeRate * part.built * (this.game.energy / 100);
      });
      //  Assign current incoming rate to the incomeRate var
      this.game.incomeRate = ir;
      // Return the income rate
      return ir;
    },
    clickEnergize() {
      this.game.energy += this.game.energyClickValue;
      if (this.game.energy > this.game.energyCapacitor) {
        this.game.energy = this.game.energyCapacitor;
      }
      let randomRotation = Math.floor(Math.random() * 360);
      let randomDistance = Math.floor(Math.random() * 50) + 90;
      this.energizeTexts.push({
        id: Math.random(),
        icon: 'fa-bolt',
        text: this.game.energyClickValue,
        style: {
          color: '#ffd541',
          transform:
            'rotate(' +
            randomRotation +
            'deg) translate(' +
            randomDistance +
            'px) rotate(-' +
            randomRotation +
            'deg) scale(1.4)',
        },
      });
    },
    clickGenerate() {
      this.game.credits += this.game.clickValue;
      let randomRotation = Math.floor(Math.random() * 360);
      let randomDistance = Math.floor(Math.random() * 50) + 90;
      this.generateTexts.push({
        id: Math.random(),
        icon: 'fa-dollar-sign',
        text: this.game.clickValue,
        style: {
          color: '#20d6c7',
          transform:
            'rotate(' +
            randomRotation +
            'deg) translate(' +
            randomDistance +
            'px) rotate(-' +
            randomRotation +
            'deg) scale(1.4)',
        },
      });
    },
    buildPart(data) {
      this.config.parts.forEach((part) => {
        if (part.id === data.part.id) {
          if (data.nb * part.baseCost <= this.game.credits) {
            part.built += data.nb;
            this.game.credits -= data.nb * part.baseCost;
          }
        }
      });
    },
    mainLoop() {
      this.game.credits += toFixed2(this.computeCredits());
    },
    achievementLoop() {
      this.config.achievements
        .filter((achievement) => {
          return !achievement.unlocked;
        })
        .forEach((achievement) => {
          if (
            (achievement.condition.type === 'credits' &&
              this.game.credits >= achievement.condition.value) ||
            (achievement.condition.type === 'part' &&
              findPartBuiltByID(
                this.config.parts,
                achievement.condition.part
              ) >= achievement.condition.value) ||
            (achievement.condition.type === 'generation' &&
              this.game.incomeRate >= achievement.condition.value) ||
            (achievement.condition.type === 'energy' &&
              this.game.energy <= achievement.condition.value)
          ) {
            // Play sound
            sounds.achievement.play();
            // Popup an alert
            this.alerts.push({
              id: Math.random(),
              type: 'info',
              icon: achievement.icon,
              title: achievement.title,
              text: achievement.text,
            });
            // Set the unlocked property with current date
            achievement.unlocked = new Date().getTime();
          }
        });
    },
    energyDrainLoop() {
      let previousMeasure = this.game.energy;
      this.game.energy -= this.game.energyConsumption;
      if (this.game.energy <= 0) {
        this.game.energy = 0;
        // If we are runing out of power, alert the player
        if (previousMeasure > 0) {
          this.alerts.push({
            id: Math.random(),
            type: 'danger',
            icon: 'fa-bolt',
            title: 'Out of power',
            text: "You're running out of power... production is shut down",
          });
        }
      }
      pushToStats(this.stats.credits, toFixed2(this.game.credits));
      pushToStats(this.stats.energy, toFixed2(this.game.energy));
    },
    start() {
      // Main loop handler (compute credits, etc.)
      this.mainLoopHandler = setInterval(() => this.mainLoop(), this.gameTick);
      // Achievement loop handler with a lower check rate
      this.achievementLoopHandler = setInterval(
        () => this.achievementLoop(),
        1000
      );
      // Energy drain loop handler with a lower check rate
      this.energyDrainLoopHandler = setInterval(
        () => this.energyDrainLoop(),
        1000
      );
    },
    stop() {
      clearInterval(this.mainLoopHandler);
      clearInterval(this.achievementLoopHandler);
      clearInterval(this.energyDrainLoopHandler);
    },
  },
  mounted() {
    this.loadConfig();
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  color: #999;
  background-color: #111;
  font-family: 'Orbitron', arial, sans-serif;
  font-weight: 300;
  user-select: none;
}

.app {
  position: relative;
  width: 100%;
  height: 100%;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.particles {
  position: absolute;
  background: transparent;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: radial-gradient(lighten(#111, 10%), #111);
}

.header {
  position: relative;
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.ui {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  .tooltip-inner {
    padding: 8px 16px;
    font-size: 0.8em;
    color: #999;
    background-color: #333;
    border-radius: 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #333;
    z-index: 3;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #999;

    .popover-inner {
      background: $color;
      color: #222;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
