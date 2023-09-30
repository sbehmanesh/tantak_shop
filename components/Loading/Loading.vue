<template>
    <div id="landing-parent1">
      <div style="width:200px">
        <img src="/logo.png" width="200px" />
        <div class="loader-landing">
          <div class="bar"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>
<style>
    #landing-parent1 {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1003;
      display: flex;
      position: fixed;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
    @keyframes loader-animation {
      0% {
        left: -100%;
      }
      49% {
        left: 100%;
      }
      50% {
        left: 100%;
      }
      100% {
        left: -100%;
      }
    }
    .loader-landing {
      height: 5px;
      width: 100%;
      overflow: hidden;
      margin-top: 30px;
      border-radius: 10px;
    }
    .loader-landing .bar {
      height: 5px;
      width: 100%;
      position: relative;
      border-radius: 10px;
      animation-duration: 3s;
      background-color: #f77fbe;
      animation-name: loader-animation;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  </style>