<script setup lang="ts">
import { reactive } from 'vue';

const cards = reactive([
  { src: 'Card 1 Front', backsrc: 'Card 1 Back', flipped: false },
  { src: 'Card 2 Front', backsrc: 'Card 2 Back', flipped: false },
  { src: 'Card 4 Front', backsrc: 'Card 3 Back', flipped: false },
  { src: 'Card 4 Front', backsrc: 'Card 4 Back', flipped: false },
  { src: 'Card 5 Front', backsrc: 'Card 5 Back', flipped: false },
  { src: 'Card 6 Front', backsrc: 'Card 6 Back', flipped: false },
  { src: 'Card 7 Front', backsrc: 'Card 7 Back', flipped: false },
  { src: 'Card 8 Front', backsrc: 'Card 8 Back', flipped: false },
  { src: 'Card 9 Front', backsrc: 'Card 9 Back', flipped: false },
  { src: 'Card 10 Front', backsrc: 'Card 10 Back', flipped: false },
]);
const flipCard = (index: any) => {
  cards[index].flipped = !cards[index].flipped;
};
const flipAllCards = () => {
  cards.forEach((card) => {
    if (!card.flipped) {
      card.flipped = true;
    }
  });
};
const flipAllToFront = () => {
  cards.forEach((card) => {
    card.flipped = false;
  });
};
</script>
<template>
  <div class="card-container">
    <div
      v-for="(card, index) in cards"
      :key="index"
      :class="{
        card: true,
        flipped: card.flipped,
      }"
      @click="flipCard(index)"
    >
      <div class="front">
        <h2>{{ card.src }}</h2>
      </div>
      <div class="back">
        <p>{{ card.backsrc }}</p>
      </div>
    </div>
  </div>
  <div class="buttongroup">
    <button @click="flipAllCards" class="button"><span>全部翻转</span></button>
    <button @click="flipAllToFront" class="button">
      <span>翻转正面 </span>
    </button>
  </div>
</template>
<style lang="less" scoped>
.card-container {
  display: flex;
  width: 1200px;
  height: 700px;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto auto;
}

.card {
  width: 200px;
  height: 300px;
  margin: 10px;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.6s;
}

.flipped .front {
  transform: rotateY(180deg);
}

.flipped .back {
  transform: rotateY(0deg);
}

.front,
.back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.front {
  background-color: #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(0deg);
  transition: transform 0.6s;
}

.back {
  background-color: #e74c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(-180deg);
  transition: transform 0.6s;
}

.buttongroup {
  margin: auto auto;
}

.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #9d9def;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  vertical-align: middle;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
