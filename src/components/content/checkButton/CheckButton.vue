<template>
  <div class="check-button" :class="{check:activeColor}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    activeColor: {
      type: Boolean,
      default: true
    }
  },
}

</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}

.check {
  background-color: rgba(255, 0, 0, 0.707);
  border-color: red;
}

.check-button img {
  width: 12px;
}
</style>