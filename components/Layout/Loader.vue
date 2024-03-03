<template>
  <v-overlay opacity="0.15" color="beauty" :value="value">
    <div id="page-loader">
      <div>
        <div st>
          <div style="margin-top: 16px" class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <strong id="strong" style="margin-left: 30px; margin-right: 30px">
            <img src="/logo.png" width="100" />
          </strong>
          <div style="margin-top: 16px" class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </v-overlay>
</template>


<script>
export default {
  props: {
    value: {
      default: false,
      required: false,
    },
  },
};
</script>


  <style>
#page-loader {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10000;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

/* @media only screen and (min-width: 600px) { */
#page-loader > div > div {
  display: flex;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: rgb(20 42 80);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 15px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 50px;
  animation-delay: 0;
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }

  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
/* } */

@media only screen and (max-width: 600px) {
  #page-loader > div > .items {
    display: flex;
  }
  #strong {
    margin-left: 23px;
    margin-right: 0;
  }
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
  }

  /* .lds-facebook {
    display: none;
  } */

  #page-loader > div > div > strong {
    /* border: 2px solid white; */
    padding: 5px;
  }

  @keyframes spin {
    50% {
      box-shadow: 12px 0 15px -4px white, -12px 0 8px -4px white;
    }
  }
}

#page-loader > div > .items {
  justify-content: end;
}

#page-loader > div > div > strong {
  /* margin-bottom: -80px; */
  height: auto;
  color: white;
  display: block;
  font-size: 65px;
  font-weight: bold;
  text-align: center;
  border-radius: 7px;
  font-family: "Archivo Black", "Archivo", sans-serif;
}
</style>
  
