<template>
  <div
    class="card w-100 text-white"
    style="cursor: pointer"
    @click="goToActivity(itemId)" 
  >
    <img :src="image" class="card-img"/>
    <div class="card-img-overlay" style="background-color: #00000045" >
      <div class="row d-flex align-items-end h-100">
        <div class="col-7">
          <h5 class="fw-bold">{{ title }}</h5>
        </div>
        <div class="col-5" align="right">
          <small>
            <FormatDate :dateStr="startDate"/><br />
            <span v-if="participantLimit != -1"
              >{{ participantLimit }} pax</span
            >
            <span v-else>No Limit</span>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/router'
import FormatDate from "@/components/FormatDate.vue"

export default {
  name: "ActivityCard",
  components:{
    FormatDate
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    participantLimit: {
      type: Number,
      default: 1,
    },
    itemId: {
      type: String,
      default: "",
    },
    startDate:{
      type:String,
      default:""
    }
  },
  methods: {
    goToActivity(param) {
      router.push({ name: "View Activities", params: { activity: param } });
    },
  },
};
</script>

<style>
.card-img-overlay{
  transition:1s;
  border-radius:0!important;
}

.card-img-overlay:hover{
  background-color: rgba(0, 0, 0,0)!important;
}

</style>