<template>
  <div class="home">
    <p>Coordonnées X: {{ coordinates.x }} Y: {{ coordinates.y }}</p>
    <p>Bullets: {{ bulletsRemaining }}</p>
    <p>Max X: {{ maxX }} Y: {{ maxY }}</p>
    <p>Touche: {{ touchePressee }}</p>

    <div
      ref="square"
      class="player"
      :style="{ 
        top: coordinates.y + 'px',
        left: coordinates.x + 'px',
        transform: 'rotate(' + rotation + 'deg)'
      }"
    >
      <p style="color: white;">=></p>
    </div>

    <div
      v-for="(bullet, index) in bulletsOnScreen"
      :key="index"
      class="bullet"
      :style="{
        top: bullet.y + 'px',
        left: bullet.x + 'px',
        transform: 'rotate(' + bullet.rotation + 'deg)'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      touchePressee: "",
      coordinates: {
        y: 100,
        x: 100
      },
      rotation: 0,
      bulletsRemaining: 9,
      bulletsOnScreen: [],
      maxX: window.innerWidth - 100,
      maxY: window.innerHeight - 50,
    };
  },
  created() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      this.touchePressee = e.key;

      switch (e.key) {
        case "ArrowUp":
          if (this.coordinates.y > 0) this.coordinates.y -= 20;
          break;
        case "ArrowRight":
          if (this.coordinates.x < this.maxX) this.coordinates.x += 20;
          break;
        case "ArrowDown":
          if (this.coordinates.y < this.maxY) this.coordinates.y += 20;
          break;
        case "ArrowLeft":
          if (this.coordinates.x > 0) this.coordinates.x -= 20;
          break;
        case "r":
        case "R":
          this.bulletsRemaining = 9;
          break;case "t":
        case "T":
          this.rotation = (this.rotation + 90) % 360;
          break;
        case " ":
          this.fireBullet();
          break;
        default:
          break;
      }
    },
    fireBullet() {
      this.bulletsRemaining -= 1;
      if (this.bulletsRemaining >= 0) {
        const bullet = {
        x: this.coordinates.x + 25,
        y: this.coordinates.y + 25,
        rotation: this.rotation
      };
      this.bulletsOnScreen.push(bullet);

      const interval = setInterval(() => {
        const speed = 10;
        switch (bullet.rotation % 360) {
          case 0:
            bullet.x += speed;
            break;
          case 90:
            bullet.y += speed;
            break;
          case 180:
            bullet.x -= speed;
            break;
          case 270:
            bullet.y -= speed;
            break;
        }

        // Remove bullet if it leaves the screen
        if (
          bullet.x < 0 || bullet.x > window.innerWidth ||
          bullet.y < 0 || bullet.y > window.innerHeight
        ) {
          clearInterval(interval);
          this.bulletsOnScreen = this.bulletsOnScreen.filter(b => b !== bullet);
        }
      }, 20);
      }
    }
  }
};
</script>

<style scoped>
.player {
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: blue;
  display: flex;
  justify-content: end;
  align-items: center;
}

.bullet {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  transition: top 0.02s, left 0.02s;
}
</style>
