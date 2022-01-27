<template>
  <div class="text-center">
    <DisplayPicture :initial="username"/>

    <div class="container mb-4" id="profilePage">
      <div class="row">
        <div class="col-12 mt-4">
          <h3>{{ username }}</h3>
        </div>

        <div class="col-4 col-md-12">
          <p class="mt-2"  @click="profile_activities_page()">Activities</p>
        </div>

        <div class="col-4 col-md-12">
          <p class="mt-2" @click="interest_page()">Interest</p>
        </div>

        <!-- <div class="col-4 col-md-12">
          <p class="mt-2">Edit Profile</p>
        </div> -->
        <div class="col-4 col-md-12">
          <p class="mt-2" @click="logout()">Logout</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #profilePage {
    p:hover{
      font-weight: 600;
      color: #42b983;
      cursor: pointer;
  }
  }
</style>
<script>

import DisplayPicture from "@/components/DisplayPicture.vue";


export default {
  name: "SideProfile",
  components: {DisplayPicture},
  props:{
      username:{
        type: String,
      }
  },

  methods:{
      interest_page(){
          this.$router.push({'name': 'myInterest' })
      },

      profile_activities_page(){
        this.$router.push({'name':'Profile'})
      },
      logout(){
        this.$parent.$parent.logout()
      }
      

  }
};
</script>
