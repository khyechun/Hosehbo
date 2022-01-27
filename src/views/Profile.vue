<template>
<div>
  <transition name="fade">
    <Loader v-if="loader" style="    position: absolute;top: 40%;left: 50%;margin-left: -40px;" />
  </transition>
  <transition name="fade">
  <div v-if="!loader" class="mt-4 mb-4 container-fluid">
    <div class="row">
      <div class="col-md-3">
        <SideProfile :username="username"/>

      </div>

      <div class="col-md-9">
        <!-- UPCOMING ACTIVITIES -->

        <div>
          <h3 class="fw-bold">Upcoming Activities</h3>

          <div class="row" v-if="getUpcomingActivities.length > 0">
            <div
              class="col-12 col-sm-6 mt-3"
              v-for="(activity, index) in getUpcomingActivities"
              :key="index" style="position:relative;"
            >
              <span v-if="activity.createdByMe" class="badge rounded-pill created-by-me-badge">Created by me</span>
              <ActivityCard
                :image="activity.bgImage"
                :title="activity.title"
                :startDate="activity.startDate"
                :itemId="activity.id"
                :participantLimit="activity.limit"
              />
            </div>
          </div>

          <div v-else class="mb-4">
            <p class="text-secondary mt-3"><a href="./create-activity/step-1" style="text-decoration:none; color: black; ">
              Oops, looks like you don't have any upcoming activities yet. 
              Create one now! </a>
            </p>
          </div>
        </div>

        <!-- show past activities -->
        <div>
          <h3 class="fw-bold mt-5">Past Activities</h3>

          <div class="row" v-if="getPastActivities.length > 0">
            <div
              class="col-12 col-sm-6 mt-3"
              v-for="(activity, index) in getPastActivities"
              :key="index" style="position:relative;"
            >
              <span v-if="activity.createdByMe" class="badge rounded-pill created-by-me-badge">Created by me</span>
              <ActivityCard
                :image="activity.bgImage"
                :title="activity.title"
                :startDate="activity.startDate"
                :itemId="activity.id"
                :participantLimit="activity.limit"
              />
            </div>
          </div>
          <div v-else>
            <div class="col">
              <p class="text-secondary">No past activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>


<script>
// @ is an alias to /src
import axios from "axios";
import SideProfile from "@/components/SideProfile.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: { ActivityCard , SideProfile,Loader},
  name: "Profile",
  props:["loggedIn","checked"],
  data() {
    return {
      interestList: [],
      username: ".",
      activities_data: [],
      loader :true
    };
  },

  methods: {
    getInterest() {
      let bearer_token = window.localStorage.getItem("jwt");
      const config = {
        headers: { authorization: `Bearer ${bearer_token}` },
      };
      let url = "api/getUserDetails";
      axios.get(url, config).then((response) => {
        // console.log(response.data);
        this.interestList = response.data.interests;
        this.username = response.data.username;
      });
    },

    getActivity() {
      let bearer_token = window.localStorage.getItem("jwt");
      const config = {
        headers: { authorization: `Bearer ${bearer_token}` },
      };
      let activity_url = "api/myActivities";
      axios.get(activity_url, config).then((response) => {
        this.activities_data = response.data;
        this.loader=false
      });
    },
  },

  computed: {
    getUpcomingActivities() {
      let upcoming_activities_arr = [];
      for (let activity of this.activities_data) {
        let start_date = new Date(activity.StartDate);
        let curr_date = new Date();

        let date_diff = Math.floor(
          (start_date - curr_date) / (1000 * 60 * 60 * 24)
        );

        if (date_diff >= 0) {
          upcoming_activities_arr.push({
            startDate: activity.StartDate,
            startTime: activity.StartTime,
            bgImage: activity.Image,
            title: activity.Title,
            id: activity._id,
            limit: activity.Participant_Limit,
            createdByMe : activity.Email.toLowerCase() == this.$parent.email
          });
        }
      }
      upcoming_activities_arr = upcoming_activities_arr.slice().sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
      if (upcoming_activities_arr) {
        return upcoming_activities_arr;
      } else {
        return null;
      }
    },

    getPastActivities() {
      let past_activities_arr = [];
      for (let activity of this.activities_data) {
        let start_date = new Date(activity.StartDate);
        let curr_date = new Date();

        let date_diff = Math.floor(
          (start_date - curr_date) / (1000 * 60 * 60 * 24)
        );
        
        if (date_diff < 0) {
          past_activities_arr.push({
            startDate: activity.StartDate,
            startTime: activity.StartTime,
            bgImage: activity.Image,
            title: activity.Title,
            id: activity._id,
            limit: activity.Participant_Limit,
            createdByMe : activity.Email.toLowerCase() == this.$parent.email
          });
        }
      }
      past_activities_arr = past_activities_arr.slice().sort((a,b) => new Date(b.startDate) - new Date(a.startDate));

      if (past_activities_arr) {
        return past_activities_arr;
      } else {
        return null;
      }
    },

    

  },
  watch:{
    checked: function(){
      if(this.checked){
        if(!this.$parent.loggedIn){
          this.$router.push({ name: "Login", query:{ redirect : "Profile", msg : "Oops! You must be logged in to access your profile page"} });
        }else{
          this.getInterest();
          this.getActivity()
        }
      }
    }
  },

  mounted: function() {
    
    if(this.checked){
      if(!this.$parent.loggedIn){
        this.$router.push({ name: "Login", query:{ redirect : "Profile", msg : "Oops! You must be logged in to access your profile page"} });
      }else{
        this.getInterest();
        this.getActivity()
      }
    }
  },
};
</script>


<style scoped>
.fade-enter-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.created-by-me-badge{
  position:absolute;top:10px;right:20px;z-index:999;background-image: linear-gradient(to right, #16b3a5, #2abe63)
}
</style>