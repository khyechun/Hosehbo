<template>
<div  id="view_activity">
    <!-- to match uploaded image to activity here -->
    <div >
      <img
        v-bind:src="activity_details.Image"
        class="img-fluid mb-4 shadow activity-image"
      />
    </div>
    <div class="container-fluid">
      <div class="row mb-3 mx-auto" style="max-width:1200px;">
        <div class="col-12">
          <h1 class="mb-3">{{ activity_details.Title }}</h1>
          <!-- <img src="@/assets/heart.svg" class="icon" /> -->
        </div>
        <!--location-->
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-8">
              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2">
                      <img src="@/assets/geo-alt.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0">
                      <a
                        v-if="activity_details.Online"
                        v-bind:href="activity_details.Online_url"
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
                    <div class="col-10 ps-0">
                      Created by {{ this.$parent.$parent.username }}
                    </div>
                  </div>
                </div>
                <!--number of participants-->
                <div class="col-12 col-md-6 mb-3">
                  <div class="row">
                    <div class="col-2 col-sm-1 col-md-2">
                      <img src="@/assets/people.svg" class="icon" />
                    </div>
                    <div class="col-10 ps-0">
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
            <div class="col-12 col-md-4 text-end mt-2" >
                  <div>
                    <!--  -->
                    <!-- <button v-if="this.$parent.loggedIn && activity_details.Email == this.$parent.email && activity_details.Request" class="btn-black btn rounded-pill" style="max-width:200px;width:100%;" data-bs-toggle="modal" data-bs-target="#request-modal" >
                      View Requests
                    </button> -->
                    <!--  -->
                    <button class="btn btn-black rounded-pill" style="max-width:200px;width:100%;" >
                      Join Activity
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-black rounded-pill mt-3" style="max-width:200px;width:100%;" >Share this Activity</button>
                  </div>
                </div>
          </div>
        </div>
      </div>

      <div class="row mb-5 mx-auto" v-if="activity_details.Description.trim().length != 0" style="max-width:1200px;">
        <div class="col-12">
          <!--activity description-->
          {{ this.activity_details.Description }}
        </div>
      </div>

      <div class="row mb-3 mx-auto" style="max-width:1200px;">
        <div class="col-12">
          <div class="row mb-3">
            <div class="col-12 fw-bold mb-3">
              <h2>
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
        <div class="col-12 fw-bold mb-3"><h2>Photos</h2></div>
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
              <div class=" col-6 col-md-2 px-2">
                <!-- <img src=""> -->
              </div>
              <div class=" col-6 col-md-4 px-2">
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
</template>

<style scoped>

.break {
  word-break: break-all;
}

.activity-image {
  max-height: 600px;
  max-width: 100%;
  display:block;
  margin:auto;
}

.icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.icon-participant {
  max-width: 100%;
  width: 75px;
  margin-bottom: 10px;
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
  height:400px!important;

}

#mobile-img{
    display:inline-block!important;
}


}

</style>


<script>
import FormatDate from "@/components/FormatDate.vue"

export default {
  name: "activity-preview",
  props:["detailsObj"],
  components:{
    FormatDate
  },
  data() {
    return {
      activity_details: this.detailsObj
    }
  },

  created() {
    // a_participant_arr: this.populate_participant_arr(),
    // a_img_arr: this.populate_img_arr()
    // this.return_activity_details();
    // console.log(this.detailsObj)
  },
  computed:{
    google_maps_url(){
      return "http://maps.google.com/?q=" + this.activity_details.Address
    },
    format_StartTime() {
      let time = this.activity_details.StartTime.split(":"); // get the first half whether its 12/24 hour
      if (time[0] < 12) {
        return time[0] + ":" + time[1] + " am";
      } else {
        return Number(time[0])-12 + ":" + time[1] + " pm";
      }
    },

    format_EndTime() {
      let time = this.activity_details.EndTime.split(":"); // get the first half whether its 12/24 hour
      if (time[0] < 12) {
        return time[0] + ":" + time[1] + " am";
      } else {
        return Number(time[0])-12 + ":" + time[1] + " pm";
      }
    },

  }

};
</script>
