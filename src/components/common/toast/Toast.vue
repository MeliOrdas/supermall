<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  // massage: {
  //   type: String,
  //   default: ''
  // },
  // show: {
  //   type: Boolean,
  //   default: false
  // }
  // },
  data () {
    return {
      message: '',
      isShow: false
    };
  }
  ,
  methods: {
    show (message, duration) {
      console.log(this);

      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  height: 120px;
  width: 120px;
  text-align: center;
  line-height: 100px;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  border-radius: 10px;
  animation: 2.5s opacity2 0s 1;
  z-index: 88;
}
@keyframes opacity2 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>