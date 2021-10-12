<template>
  <div class="parts">
    <div class="part" v-for="part of parts" :key="part.id" :class="{disabled: part.baseCost > credits}">
      <div class="part-infos">
        <div class="part-name"><span class="part-built" v-tooltip.bottom="humanReadable(part.built) + ' built'"><i class="fas fa-cubes fa-fw"></i> {{shorten(part.built)}}</span>{{part.name}} <span class="part-hint" v-tooltip.bottom="part.description"><i class="fas fa-info-circle"></i></span></div>
        <div class="part-cost"><i class="fas fa-dollar-sign fa-fw"></i> {{cost(part)}} Cr.</div>
        <div class="part-income-rate"><i class="fas fa-donate fa-fw"></i> {{incomeRate(part)}} Cr./s</div>
        <div class="build-btns">
          <div class="build-btn" @click="build(part, 1)" :class="{disabled: !canBuild(part.baseCost, 1)}">x1</div>
          <div class="build-btn" @click="build(part, 10)" :class="{disabled: !canBuild(part.baseCost, 10)}">x10</div>
          <div class="build-btn" @click="build(part, 100)" :class="{disabled: !canBuild(part.baseCost, 100)}">x100</div>
          <div class="build-btn" @click="build(part, max(part.baseCost))" :class="{disabled: !canBuild(part.baseCost, 1)}">max {{max(part.baseCost)}}</div>
        </div>
      </div>
      <div class="part-icon">
        <img :src="part.icon" alt="Icon">
      </div>
    </div>
  </div>
</template>

<script>
import numbro from "numbro";

export default {
  name: 'PartList',
  props: {
    parts: Array,
    credits: Number,
    energy: Number
  },
  methods: {
    humanReadable(n) {
      return numbro(n).format({ thousandSeparated: true })
    },
    shorten(n) {
      return numbro(n).format({ thousandSeparated: true, average: true, mantissa: 2, optionalMantissa: true })
    },
    cost(part) {
      return numbro(part.baseCost).format({ thousandSeparated: true, average: true, totalLength: 2 })
    },
    canBuild(baseCost, nb) {
      return this.credits >= (baseCost * nb)
    },
    max(baseCost) {
      return Math.floor(this.credits / baseCost)
    },
    incomeRate(part) {
      return part.built > 0 ? Math.round((part.baseIncomeRate * part.built * (this.energy / 100)) * 100) / 100 : Math.round(part.baseIncomeRate * (this.energy / 100) * 100) / 100
    },
    build(part, nb) {
      this.$emit('buildPart', {
        part: part,
        nb: nb
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parts {
  width: 100%;
  height: 80vh;

  .part {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    padding: 16px;
    margin-bottom: 8px;
    background-color: #222;
    border-radius: 4px;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.1s linear;

    &.disabled {
      opacity: 0.3;
      background-color: #311;

      .part-name {
        color: #c00;
      }

      .part-cost,
      .part-income-rate {
        color: #666;
      }
    }

    .part-infos {
      flex-basis: 100%;

      .part-name {
        color: #20d6c7;
        font-weight: 600;

        .part-hint {
          cursor: pointer;
        }

        .part-built {
          float: right;
          padding: 4px 6px;
          font-size: 0.8em;
          color: #20d6c7;
          background-color: #122;
          border: 1px solid #20d6c7;
          border-radius: 4px;
        }
      }

      .part-cost,
      .part-income-rate {
        margin-top: 2px;
        padding: 1px 0;
        color: #999;
        font-size: 0.8em;
      }

      .build-btns {
        margin-top: 12px;

        .build-btn {
          display: inline-block;
          padding: 2px 6px;
          margin-right: 8px;
          color: #999;
          background-color: #333;
          border-radius: 4px;
          font-size: 0.9em;
          cursor: pointer;

          &:hover {
            color: #333;
            background-color: #20d6c7;
          }

          &.disabled {
            opacity: 0.3;
            background-color: #311;
            color: #c00;
          }
        }
      }
    }

    .part-icon {
      margin-left: 16px;

      >img {
        width: 64px;
        height: auto;
        border-radius: 4px;
      }
    }
  }
}
</style>
