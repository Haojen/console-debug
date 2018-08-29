<template>
    <div class="fps-widget">

    </div>
</template>

<script>
  export default {
    name: "fps",
    data(){
      return {
        frame: 0,
        allFrameCount: 0,
        lastTime: Date.now(),
        lastFameTime: Date.now()
      }
    },
    methods: {
      getFPS() {
        const now = Date.now();
        const fs = now - this.lastFameTime;
        const fps = Math.round(1000 / fs);

        this.lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        this.allFrameCount++;
        this.frame++;

        if (now > 1000 + this.lastTime) {
          const fps = Math.round((this.frame * 1000) / (now - this.lastTime));
          console.log(`${new Date()} 1S内 FPS：`, fps);
          this.frame = 0;
          this.lastTime = now;
        }
        window.requestAnimationFrame(this.getFPS)
      }
    },
    created() {
      this.getFPS()
    }
  }
</script>

<style scoped>

</style>