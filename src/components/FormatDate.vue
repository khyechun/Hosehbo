<template>
    <span>{{formatDate}}</span>
</template>


<script>
export default {
  name: "FormatDate",
  data(){
      return{
          months : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
  },
  props: {
    dateStr: {
      type: String,
      default: "",
    }
  },
  computed:{
      formatDate(){
          var split = this.dateStr.split("-")
          var month = this.months[Number(split[1]) - 1]
          var formattedDate =  month + ` ${split[2].trim()}` + ", " + split[0]
          return formattedDate.trim()
      }
  }
};
</script>
