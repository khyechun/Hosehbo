<template>
    <!-- <div> -->
        <div id="snackbar" style="font-size:14px;">
            <img v-if="showImg" style="width:20px;margin-right:10px;vertical-align:text-top" src='@/assets/link.svg'>{{toastText}}</div> 
    <!-- </div> -->
</template>



<script>

export default {
  name: "Toast",
  props: {
    toastText: {
      type: String,
      default: "",
    },
    showImg:{
      type:Boolean,
      default : true
    }
  }
};
</script>

<style scoped>

#snackbar {
  visibility: hidden;
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  padding: 10px;
  position: fixed;
  z-index: 1;
  right: 20px;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>