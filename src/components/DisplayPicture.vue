<template> 
<div class="circle_container ">
	<div class="circle_main mx-auto" :style="{backgroundColor:getRandomColor(), width:width, height:width}">
		<div class="circle_text_container">
			<div class = "circle_text text-white">
                {{ initial[0].toUpperCase()}}
				<!-- Z -->
			</div>
		</div>
	</div>
</div>	


</template>

<style scoped lang="scss">
.circle_container
{
	// width : 128px;
	// height : 128px;
	margin : 0;
	padding : 0;
}

.circle_main
{
	width : 100%;
	height : 100%;
	border-radius : 50%;
	margin : 0;
	padding : 0;
}

.circle_text_container
{
	width : 70%;
	height : 70%;
	max-width : 70%;
	max-height : 70%;
	margin : 0;
	padding : 0;

	position : relative;
	left : 15%;
	top : 15%;
	transform-style : preserve-3d;
	
}

.circle_text
{
	text-align : center;
	font-size: 60px;
	position : relative;
	top : 50%;
	transform : translateY(-50%);
}

</style>

<script>
export default {
  name: "DisplayPicture",
  props: {
    initial: {
      type: String,
    },
	width:{
		type:String,
		default:"128px"
	}
  },


  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;

    },
  },
};
</script>
