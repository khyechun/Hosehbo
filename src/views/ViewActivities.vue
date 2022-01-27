<template>
  <div>
  <transition name="fade">
  <Loader v-if="load" style="    position: absolute;top: 40%;left: 50%;margin-left: -40px;" />
  </transition>
  <transition name="fade">
  <div v-if="!load" id="view_activity">
    <!-- to match uploaded image to activity here -->
        <!-- <div style="background-color:black">
      <img
        v-bind:src="activity_details.Image"
        class="img-fluid mb-4 shadow activity-image"
      />
    </div> -->
    <div class="bg-img" v-bind:style="{ backgroundImage: 'url(' + activity_details.Image + ')' }">
      <img
        v-bind:src="activity_details.Image"  style="display:none" id="mobile-img"
        class="img-fluid mb-4 shadow activity-image"
      />
    </div>
    <div class="container-fluid mt-3" style="max-width:1100px;">
      <div class="row mb-3 mx-auto" style="max-width:1200px;">
        <div class="col-12">
          <h1 class="mb-3" style="font-weight:600">{{ activity_details.Title }}</h1>
          <!-- <img src="@/assets/heart.svg" class="icon" /> -->
        </div>
        <!--location-->
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-8 col-lg-9">
              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2">
                      <img src="@/assets/geo-alt.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0">
                      <a
                        v-if="activity_details.Online"
                        v-bind:href="online_url"
                        class="break"
                        target="_blank"
                        >{{ activity_details.Online_url }}</a
                      >
                      <a
                        v-if="!activity_details.Online"
                        target="_blank"
                        v-bind:href="google_maps_url"
                        >{{ activity_details.Address }}</a
                      >
                    </div>
                  </div>
                </div>
                <!--usercat-->
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2">
                      <img src="@/assets/person.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0" style="font-size:17px;">
                      Created by {{ activity_details.Username }}
                    </div>
                  </div>
                </div>
                <!--number of participants-->
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2">
                      <img src="@/assets/people.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0" style="font-size:17px;">
                      <span v-if="activity_details.Participant_Limit != -1 ">{{ activity_details.Participant_Limit }} pax</span><span v-else>No limit</span>
                    </div>
                  </div>
                </div>
                <!--date/time-->
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2 d-flex align-items-center">
                      <img src="@/assets/clock.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0">
                        <span class="badge bg-dark"><FormatDate :dateStr="activity_details.StartDate"/></span>
                      <span  v-if="activity_details.EndDate != ''">
                        to <span class="badge bg-dark"><FormatDate :dateStr="activity_details.EndDate"/></span>
                      </span>
                      <br />
                      <span class="badge bg-dark">{{ format_StartTime }}</span>
                      <span  v-if="activity_details.EndTime != ''">
                        to <span class="badge bg-dark">{{ format_EndTime }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
                
            </div>
            <div class="col-12 col-md-4 col-lg-3 text-end mt-2" >
                  <div>
                    <!--  -->
                    <button v-if="this.$parent.loggedIn && activity_details.Email == this.$parent.email && activity_details.Request" class="btn-black btn rounded-pill" style="max-width:200px;width:100%;" data-bs-toggle="modal" data-bs-target="#request-modal" >
                      View Requests
                    </button>
                    <!--  -->
                    <button v-else class="btn btn-black rounded-pill" style="max-width:200px;width:100%;" :disabled="expired || disable_btn || requested || (participant_limit_reached && !joined)"  @click="joinActivity()">
                      <span v-if="expired">Activity Expired</span>
                      <span v-else-if="joined">Leave Activity</span>
                      <span v-else-if="participant_limit_reached">Participant Limit Reached</span>
                      
                      <span v-else-if="!joined && !requested">Join Now</span>
                      <span v-else-if="activity_details.Request && requested">Join Request Submitted</span>
                      <div v-if="disable_btn" class="spinner-border text-light" style="width:15px;height:15px;margin-left:5px;" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-black rounded-pill mt-3" style="max-width:200px;width:100%;" :data-clipboard-text="url_share" @click="shareActivity()">Share this Activity</button>
                  </div>
                </div>
          </div>
        </div>
      </div>

      <div class="row mb-5 mx-auto" v-if="activity_details.Description.trim().length != 0" style="max-width:1200px;">
        <div class="col-12" style="font-size:17px;">
          <!--activity description-->
          {{ this.activity_details.Description }}
        </div>
      </div>

      <div class="row mb-3 mx-auto" style="max-width:1200px;">
        <div class="col-12">
          <div class="row mb-3">
            <div class="col-12 fw-bold mb-1">
              <h2 style="font-weight:600">
                Participants ({{ this.activity_details.Participants.length }})
              </h2>
            </div>
            <!--v-for loop through participants that have registered for this activity and display them-->
            <div class="col-12">
              <div style="overflow-x:auto;white-space: nowrap;">
                <span style="display:inline-block" class="mb-2 px-2" v-for="(participant, index) of activity_details.Participants" :key="index">
                  <!-- <img style="display:block" v-bind:src="participant.img" class="icon-participant rounded-circle mx-auto" /> -->
                  <DisplayPicture :initial="participant.username" width="90px"/>
                  <div class="text-center">{{ participant.username }}</div>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        class="row mb-3 mx-auto"
        v-if="activity_details.Custom_Images.length > 0"
        style="max-width:1200px;"
      >
        <div class="col-12 fw-bold mb-1"><h2 style="font-weight:600">Photos</h2></div>
        <!--v-for loop through image src-->
        <div
          v-for="(image, index) in activity_details.Custom_Images"
          :key="index"
          class="col-lg-3 col-md-6 col-6 mb-3 p-1 text-center"
        >
          <img v-bind:src="image" class="rounded-1 img-fluid" />
        </div>
      </div>

      <div class="row mb-3 mx-auto" style="max-width:1200px;">
        <div class="col-12 mb-3" v-if="activity_details.Tags.length > 0">
          <!--To retrieve tags and loop through to display all tags attached to this activity-->
          <!--When tag is clicked, redirect to search page with results related to tag-->
          Tags Used:
          <a
            v-for="(tag, index) in activity_details.Tags"
            :key="index"
            class="btn btn-light rounded-pill m-2"
            >{{ tag }}</a
          >
        </div>
      </div>
    </div>
    <Toast toastText="Invite Link copied to clipboard"/>
    <!-- Modal -->
    <div class="modal fade" id="request-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 700px;">
        <div class="modal-content" style="min-height:140px;">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">Applications</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="max-height:60vh;overflow-x:auto;white-space: nowrap">
            <div class="row" >
              <div class="col-12 my-3" v-if="requestLoad">
                Loading<span class="one">.</span><span class="two">.</span><span class="three">.</span>
              </div>
            </div>
            <div class="row" v-if="activity_details.Participant_Requests.length == 0">
              <div class="col-12">
                There are currently no participant requests... <br>
                Check again later!
              </div>
            </div>
            <div class="row mb-3" v-for="(participant ,index) of activity_details.Participant_Requests" :key="index">
              <div class=" col-md-1 px-2">
                <!-- <img src=""> -->
              </div>
              <div class=" col-12 col-md-5 px-2">
                <h5>{{participant.username}}</h5>
              </div>
              <div class=" col-6 col-md-3 px-2">
                <button :disabled="requestLoad" class="btn btn-black w-100 pill-rounded px-1" @click="acceptRequest(participant, true)">Accept</button>
              </div>
              <div class=" col-6 col-md-3 px-2">
                <button :disabled="requestLoad" class="btn btn-black btn-outline-black w-100 pill-rounded px-1" @click="acceptRequest(participant, false)">Decline</button>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  </transition>
  </div>
</template>

<style scoped>
.break {
  word-break: break-all;
}

.activity-image {
  max-height: 65vh;
  max-width: 100%;
  display: block;
  margin: auto;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.icon-participant {
  max-width: 100%;
  width: 75px;
  margin-bottom:5px;
}


@media only screen and (max-width: 767px) {
  .btn{
    max-width:100%!important;
  }
}

/* SCROLLBAR */
/* width */
::-webkit-scrollbar {
  width: 5px;
  height:5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius:10px
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


.one {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.0s;
    animation: dot 1.3s infinite;
    animation-delay: 0.0s;
}

.two {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.2s;
      animation: dot 1.3s infinite;
      animation-delay: 0.2s;
}

.three {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.3s;
     animation: dot 1.3s infinite;
     animation-delay: 0.3s;
}

@-webkit-keyframes dot {
      0% { opacity: 0; }
     50% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes dot {
      0% { opacity: 0; }
     50% { opacity: 0; }
    100% { opacity: 1; }
}

.fade-enter-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.bg-img{
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  height:70vh;
}


@media only screen and (max-width: 600px) {
.bg-img{
  background:black!important;
  height:auto!important;

}

#mobile-img{
    display:block!important;
}


}
</style>

<script>
import axios from 'axios'
// import { request } from 'express';
import Toast from "@/components/Toast.vue"
import FormatDate from "@/components/FormatDate.vue"
import ClipboardJS from "clipboard/dist/clipboard.js"
import DisplayPicture from "@/components/DisplayPicture.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "view_activity",
  components:{
    Toast,
    FormatDate,
    DisplayPicture,
    Loader
  },
  data() {
    return {
      activity_details: 
        {"_id":{"$oid":"616a8cf2b143aab9c366a6c0"},"Title":"Valorant Scrims","Image":"https://cdn.discordapp.com/attachments/898849796155133973/901356160492396564/valorant.jpeg","Custom_Images":[],"Description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Email":"khyechun@gmail.com","Online":true,"Participant_Limit":{"$numberLong":"100"},"Tags":["Valorant","Gaming"],"Activity_url":"","Participants":[{"username":"ngly","email":"ngly@gmail.com","img":"https://cdn.discordapp.com/attachments/898849796155133973/901325860928372756/cat.png"}, {"username":"khye_chun","email":"khyechun@gmail.com","img":"https://cdn.discordapp.com/attachments/898849796155133973/901325860928372756/cat.png"}],"EndTime":"15:00","StartTime":"12:00","Request":true,"EndDate":"2021-11-01","StartDate":"2021-11-01","Username":"khye_chun","Address":"","Online_url":"https://discord.gg/Ds5Tt9wVgz", "Participant_Requests":[]},
      
      a_participant_arr: [],
      a_img_arr: [],
      email: "",
      config:{},
      disable_btn : false,
      url_share : window.location.href,
      requestLoad : false,
      load :true
    };
  },
  mounted(){

  },
  created() {
    // a_participant_arr: this.populate_participant_arr(),
    // a_img_arr: this.populate_img_arr()
    this.activity_id = this.$route.params.activity
    this.return_activity_details();
    this.getUserDetails();
  },

  methods: {
    // call api to return details of this activity. each activity will have an activity id?
    // return object that contains:
    // 1) activity name 2) user that created activity 3) participant_list 4) date & time 5) images 6)
    return_activity_details() {
      let url = "/api/getActivity/"+ this.activity_id
      axios.get(url).then(response=>{
        this.activity_details = response.data.data

        setTimeout(()=>{ this.load = false; }, 800);

      }).catch(error=>{
        console.log(error + "hehe xd sads")
      })
    },
    getUserDetails(){
      if(this.$parent.loggedIn){
        let bearer_token = window.localStorage.getItem("jwt")
        this.config = {
          headers: { authorization: `Bearer ${bearer_token}`}
        };
        let url = "../api/getUserDetails"
        axios.get(url, this.config).then(response => {
            this.email = response.data.email
        })
      }
    },

    // populate img arr from activity details
    populate_img_arr() {},

    // populate participant arr from activity details
    populate_participant_arr() {},

    joinActivity(){
      let url = "../api/joinActivity/" + this.activity_id
      this.disable_btn = true
      if(this.$parent.loggedIn){
        axios.post(url, {}, this.config).then(response =>{
          console.log(response)
          this.disable_btn = false
          this.return_activity_details()
        })
      }else{
        this.$router.push({ name: "Login", query:{ redirect : "View Activities", msg : "Oops! You must be logged in to join an activity!", activity:this.activity_id} });
      }
    },

    // leaveActivity(){
    //   let url = "../api/leaveActivity/" + this.activity_id
    //   this.disable_btn = true
    //   if(this.$parent.loggedIn){
    //     axios.post(url, {}, this.config).then(response =>{
    //       console.log(response)
    //       this.disable_btn = false
    //       this.return_activity_details()
    //     })
    //   }else{
    //     alert("Not logged in :(")
    //   }
    // },

    shareActivity(){
      new ClipboardJS('.btn');

      var toast = document.getElementById("snackbar");
      toast.className = "show";
      setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
    },
    acceptRequest(userObj, accept){
      this.requestLoad = true
      let url = "/api/acceptRequest/" + accept + "/" + this.activity_id 
      var req = {
        userObj : userObj
      }
      axios.post(url, req, this.config).then(() => {
        let activity_url = "/api/getActivity/"+ this.activity_id
        axios.get(activity_url).then(res_2=>{
          console.log(res_2.data.data)
          this.activity_details = res_2.data.data
          this.requestLoad = false;
        }).catch(error=>{
          console.log(error + "hehe xd sads")
        })
      })
    }
  },
  computed: {
    google_maps_url() {
      return "http://maps.google.com/?q=" + this.activity_details.Address;
    },

    format_StartTime() {
      let time = this.activity_details.StartTime.split(":"); // get the first half whether its 12/24 hour
      if (time[0] < 13) {
        return time[0] + ":" + time[1] + " am";
      } else {
        return Number(time[0])-12 + ":" + time[1] + " pm";
      }
    },

    format_EndTime() {
      let time = this.activity_details.EndTime.split(":"); // get the first half whether its 12/24 hour
      if (time[0] < 13) {
        return time[0] + ":" + time[1] + " am";
      } else {
        return Number(time[0])-12 + ":" + time[1] + " pm";
      }
    },
    joined(){
      if (this.activity_details.Participants.some(obj => obj.email == this.email ) ) {
        return true
      }
      return false
    },
    requested(){
      if(this.activity_details.Participant_Requests.some(obj => obj.email == this.email) ){
        return true
      }
      return false
    },
    participant_limit_reached(){
      if(this.activity_details.Participant_Limit == -1){
        return false
      }else{
        if(this.activity_details.Participants.length  >= this.activity_details.Participant_Limit){
          return true
        }else{
          return false
        }
      }
    },
    online_url(){
      var url = this.activity_details.Online_url
      if(url.includes("http")){
        return url
      }else{
        return "https://"+ url
      }
    },
    expired(){
      var startDate = new Date(this.activity_details.StartDate)
      // console.log(startTime)
      let curr_date = new Date();
      let date_diff = Math.floor(
          (startDate - curr_date) / (1000 * 60 * 60 * 24)
      );

      if(date_diff< 0){
        return true
      }
      return false
    }
  },
};
</script>
