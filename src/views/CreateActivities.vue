<template>
  <div>
    <!-- step 0: create an activity, start planning page -->
    <transition name="fade">
    <div
      v-if="step == 0"
      class="d-flex justify-content-center align-items-center text-center"
      style="min-height: 70vh; "
    >
      <div>
        <div>
          <h1 class="fw-bold">
            Create An Activity
          </h1>
        </div>
        <div>
          <h5 class="mt-3">
            Start creating and planning your own activities with 3 simple
            steps.<br />
            Enjoy yourself and don't forget to have fun!
          </h5>
        </div>
        <div class="mt-4">
          <button @click="next_step()" class="btn btn-black rounded-pill">
            Start Planning
          </button>
        </div>
      </div>
    </div>
    </transition>

    <!-- step 1: Choose your activity type  -->
    <transition name="fade">
    <div
      v-if="step == 1"
      class="d-flex justify-content-center align-items-center text-center mt-5 pb-3"
      style="min-height: 40vh; "
    >
      <div style="max-width:800px;">
        <div class="mt-4">
          <h4>
            Step 1: Choose your activity type
          </h4>

          <h1 class="fw-bold mt-4 mb-3">
            Type of Activity
          </h1>

          <h5 class="mb-4 text-secondary fs-6">
            Will your activity be online?
          </h5>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 mt-4 px-5">
              <div
                class="row border border-3 rounded p-2"
                style="cursor:pointer;transition:0.2s;"
                @click="online = true"
                :style="[
                  online
                    ? {
                        color: 'black',
                        'border-color': 'black!important',
                        'background-color': '#F3F4F8',
                      }
                    : { color: 'grey', 'border-color': 'grey' },
                ]"
              >
                <div
                  class="col-3 d-flex align-items-center justify-content-center"
                >
                  <span style="font-size: 45px;">
                    <i class="fas fa-globe"></i
                  ></span>
                </div>
                <div class="col">
                  <h3 class="text-start">Online</h3>
                  <p class="text-start" style="font-size:14px">
                    Your activity will be held online and others can participate
                    remotely.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-4 px-5">
              <div
                class="row border border-3 rounded p-2"
                style="cursor:pointer;transition:0.2s;"
                @click="online = false"
                :style="[
                  online === false
                    ? {
                        color: 'black',
                        'border-color': 'black!important',
                        'background-color': '#F3F4F8',
                      }
                    : { color: 'grey', 'border-color': 'grey' },
                ]"
              >
                <div
                  class="col-3 d-flex align-items-center justify-content-center"
                >
                  <span style="font-size: 45px;">
                    <i class="fas fa-map-marker-alt"></i
                  ></span>
                </div>
                <div class="col">
                  <h3 class="text-start">In-Person</h3>
                  <p class="text-start" style="font-size:14px">
                    Your activity will be at a designated location where
                    participants will meet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div>
              <button
                :disabled="online === null"
                @click="next_step()"
                class="btn btn-black rounded-pill px-5"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <!-- step 2-->
    <transition name="fade" >
    <div
      v-if="step == 2"
      class="container px-4 text-center"
      style="min-height: 10vh; max-width:720px; "
    >
      <div class="row">
        <div class="col">
          <div class="mt-4">
            <h4>
              Step 2: Fill in activity details
            </h4>
            <h2 class="fw-bold">
              Give your activity a name
            </h2>
            <input
              placeholder="Insert Name Here"
              maxlength="30"
              v-model="title"
              style="border: 0px; border-bottom: solid 1px; width: 100%; margin-top: 30px; font-size: 30px; text-align: center"
              id="title"
            />
            <p
              v-html="title_error_msg"
              class="text-danger text-start mt-2 fw-bold"
            ></p>
          </div>
        </div>
      </div>

      <div style="margin-top:60px;">
        <div class="row">
          <div class="col">
            <h2 class="fw-bold">When Is Your Activity?</h2>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <p class="text-start fw-bold mb-2">Choose a Date</p>

        <div class="col-md-5">
          <input
            type="date"
            :min="date_today"
            class="form-control w-100"
            placeholder="Start Date"
            v-model="start_date"
            id="start_date"
          />
        </div>

        <div class="col-md-2">
          <h4 class="fw-bold d-flex justify-content-center align-items-center">
            to
          </h4>
        </div>

        <div class="col-md-5">
          <input
            type="date"
            :min="start_date"
            class="form-control w-100"
            placeholder="End Date"
            v-model="end_date"
            :disabled="!no_end_date"
          />
        </div>

        <div class="col-12 text-start mt-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="activityFullDate"
              v-model="no_end_date"
            />
            <label
              class="form-check-label text-secondary"
              for="activityFullDate"
            >
              My Activity lasts more than 1 day
            </label>
          </div>
        </div>
      </div>

      <p
        v-html="start_date_error_msg"
        class="text-danger fw-bold text-start"
      ></p>

      <div class="row mt-4">
        <p class="text-start fw-bold mb-2">Choose a Time</p>
        <div class="col-md-5">
          <input
            type="time"
            class="form-control w-100"
            placeholder="Start Time"
            v-model="start_time"
            id="start_time"
          />
        </div>

        <div class="col-md-2">
          <h4 class="fw-bold d-flex justify-content-center align-items-center">
            to
          </h4>
        </div>

        <div class="col-md-5">
          <input
            type="time"
            class="form-control w-100"
            placeholder="End Time"
            v-model="end_time"
            :disabled="!no_end_time"
          />
        </div>

        <div class="col-12 text-start mt-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="activityTime"
              v-model="no_end_time"
            />
            <label class="form-check-label text-secondary" for="activityTime">
              I want to set an end time
            </label>
          </div>
        </div>
      </div>

      <p
        v-html="start_time_error_msg"
        class="text-danger fw-bold text-start"
      ></p>

      <!-- WHERE IS YOUR ACTIVITY -->

      <div style="margin-top:60px;">
        <div class="row">
          <div class="col">
            <h2 class="fw-bold" id="activity">Where Is Your Activity?</h2>
            <div v-if="online">
              <p class="text-secondary">
                You can attach the links for discord servers, zoom meetings etc
              </p>

              <p class="text-start fw-bold mb-2">Insert Link</p>
              <input
                type="text"
                class="form-control"
                v-model="online_url"
                placeholder="example.com"
              />

              <p
                v-html="location_error_msg" 
                class="text-danger fw-bold text-start"
              ></p>
            </div>

            <div v-else>
              <p class="text-secondary">
                Pro Tip: Make sure the address is correct for your activity
              </p>

              <p class="text-start fw-bold mb-2">Location</p>
              <input
                class="form-control"
                placeholder="Insert Postal Code eg: 189699"
                @keyup="getLocation"
                v-model="postalCode"
                list="addressList"
              />
              <datalist id="addressList" v-if="address != null">
                <option> {{ address }} </option>
              </datalist>

              <p class="text-start text-danger mt-2" v-html="addressError"></p>
              <p
                v-html="location_error_msg"
                class="text-danger fw-bold text-start"
              ></p>
            </div>
          </div>
        </div>
      </div>

      <!--NUMBER OF PARTICIPANTS -->

      <div style="margin-top:60px">
        <div class="row">
          <div class="col">
            <h2 class="fw-bold">Number of Participants</h2>
            <p class="text-secondary">
              Including yourself, select a number of participants desired for
              your activity
            </p>

            <div class="d-flex justify-content-center">
              <input
                type="number"
                min="2"
                class="form-control w-25"
                v-model="num_participants"
                value="2"
                :disabled="no_limit"
              />
            </div>

            <div class="form-check text-start mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="participantLimit"
                v-model="no_limit"
              />
              <label
                class="form-check-label text-secondary"
                for="participantLimit"
              >
                My activity has no limit of participants
              </label>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 80px">
        <div class="row">
          <div class="col">
            <h2 class="fw-bold">Describe Your Activity</h2>
            <p class="text-secondary">
              Use a maximum of 2500 characters to tell others more about your
              activity
            </p>

            <div style="position:relative;">
              <textarea
                maxlength="2500"
                class="form-control pb-3"
                rows="5"
                id="activityDescription"
                placeholder="This activity is..."
                v-model="activityDescription"
              ></textarea>
              <span
                style="position:absolute; bottom:5px; right:25px;"
                class="text-secondary"
              >
                {{ checkDescription }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD SOME IMAGES -->

      <div style="margin-top: 80px">
        <div>
          <h2 class="fw-bold">Add Some Images</h2>

          <div class="text-start">
            <p class="fw-bold" id="cover_image">Cover Image</p>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search Images..."
                v-model="image_api_search"
                v-on:keyup.enter="searchImages(0)"
              />
              <button
                class="btn btn-black"
                type="button"
                @click="searchImages(0)"
              >
                Search
              </button>
            </div>
            <p
              v-html="cover_image_error_msg"
              class="mt-2 fw-bold text-danger"
            ></p>
            <div class="mb-3" v-if="cover_image !== ''">
              <h2>Selected Image</h2>
              <div class="card">
                <img class="card-img " :src="cover_image" />
                <div class="card-img-overlay">
                  <button
                    type="button"
                    class="btn-close"
                    @click="selectCover('')"
                  ></button>
                </div>
              </div>
            </div>

            <Loader v-if="loader_1" />
            <div
              class="image-div"
              v-if="cover_image === '' && !loader_1 && image_api_1 != ''"
            >
              <div class="container-fluid">
                <div class="row">
                  <div
                    class="col-12 col-md-4 mt-3"
                    v-for="(image, index) of image_api_1"
                    :key="index"
                  >
                    <img
                      :src="image.original"
                      class="img-fluid"
                      @click="selectCover(image.original)"
                      style="cursor:pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <label for="image_input" class="btn btn-black rounded-pill"
              >Upload My Own</label
            >
            <input
              style="display:none;"
              @change="fileChangeEvent($event)"
              id="image_input"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <p class="text-danger mt-2">{{imgLarge1}}</p>
            <!-- <img class='img-fluid' :src='cover_image'> -->
          </div>

          <div class="text-start mt-5">
            <hr />
            <p class="fw-bold">Additional Images (optional)</p>
            <p>You can select up to 4 images.</p>
            <p class="text-secondary">
              Pro Tip: Adding images help others understand your activity
              better!
            </p>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search Images..."
                v-model="image_api_search_2"
                v-on:keyup.enter="searchImages(1)"
              />
              <button
                class="btn btn-black"
                type="button"
                @click="searchImages(1)"
              >
                Search
              </button>
            </div>
            <Loader v-if="loader_2" />
            <div class="image-div" v-if="!loader_2 && image_api_2 != ''">
              <div class="container-fluid">
                <div class="row">
                  <div
                    class="col-12 col-md-4 mt-3"
                    v-for="(image, index) of image_api_2"
                    :key="index"
                  >
                    <img
                      :src="image.original"
                      class="img-fluid"
                      @click="selectAdditionalImage(image.original)"
                      style="cursor:pointer"
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <div class="container-fluid ">
              <div class="row">
                <div
                  class="col-6 col-md-3 mb-3"
                  v-for="(image, index) of custom_images"
                  :key="index"
                >
                  <div class="card">
                    <img class="card-img " :src="image" />
                    <div class="card-img-overlay">
                      <button
                        type="button"
                        class="btn-close"
                        @click="removeCustomImage(index)"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <label for="image_input_2" class="btn btn-black rounded-pill"
              >Upload My Own</label
            >
            <input
              style="display:none;"
              @change="fileChangeEventMultiple($event)"
              id="image_input_2"
              multiple
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <p class="text-danger mt-2">{{imgLarge2}}</p>
          </div>
        </div>
      </div>

      <!-- Accessibility -->

      <div class="row  mt-4">
        <h2 class="fw-bold mb-4" style="margin-top: 80px">Accessibility</h2>

        <div class="col-md-6 px-4">
          <div
            class="row border border-3 rounded p-3 mb-3"
            style="cursor:pointer;transition:0.2s;"
            @click="accessibility = false"
            :style="[
              !accessibility
                ? {
                    color: 'black',
                    'border-color': 'black!important',
                    'background-color': '#F3F4F8',
                  }
                : { color: 'grey', 'border-color': 'grey' },
            ]"
          >
            <div class="col-2  d-flex  align-items-center">
              <i class="fas fa-user-friends " style="font-size:20px"></i>
            </div>
            <div class="col-10 ">
              <h5 class="text-start">Free For All</h5>
              <p class="text-start mb-0">
                Anyone that is interested can join your activity
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6 px-4">
          <div
            class="row border border-3 rounded p-3 mb-3"
            style="cursor:pointer;transition:0.2s;"
            @click="accessibility = true"
            :style="[
              accessibility
                ? {
                    color: 'black',
                    'border-color': 'black!important',
                    'background-color': '#F3F4F8',
                  }
                : { color: 'grey', 'border-color': 'grey' },
            ]"
          >
            <div class="col-2 d-flex align-items-center">
              <i class="fas fa-lock " style="font-size:20px"></i>
            </div>
            <div class="col-10">
              <h5 class="text-start">Private</h5>
              <p class="text-start mb-0">
                Users must request for access to join your activity
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 80px">
        <h2 class="fw-bold">Add Some Tags</h2>
        <p class="text-secondary">
          Help like-minded people find your activity with some relevant
          keywords
        </p>

        <div style="position:relative; ">
          <input
            type="text"
            class="form-control ps-5"
            placeholder="Search Keywords"
            v-model="tag_input"
            @keyup.enter="getKeywords"
          />
          <span style="position:absolute; top: 7px; left: 23px; color:grey;"
            ><i class="fas fa-search"></i
          ></span>
        </div>
        <div class="text-start mb-3">
          <small>You may add up to 5 tags</small>
        </div>

        <div v-if="tag_input.length > 1" class="text-start">
          <span v-for="(tag, index) of filtered_tags" :key="index">
            <button
              class="btn btn-inactive rounded-pill m-1"
              @click="addTag(tag)"
            >
              {{ tag }}
            </button>
          </span>
        </div>
        <p
          class="fw-bold text-start text-secondary mt-2"
          v-if="all_keywords.length > 0"
        >
          Tags Added:
        </p>
        <p class="fw-bold text-start text-secondary mt-2" v-else>
          No Tags Added
        </p>
        <div class="mb-5 text-start">   
          <transition-group name="fade" >
            <span 
            v-for="(keyword, index) of all_keywords"
            :key="index"
            class="mx-2 "
          >
        
            <button class="btn btn-inactive rounded-pill mb-2 pe-3">{{ keyword }}
              <i class="far fa-times-circle fa-md ms-1" @click="deleteInterest(index)"></i>
            </button>
          </span>
           </transition-group>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6 offset-md-2 col-md-4">
          <button
            class="btn btn-outline-black rounded-pill w-100"
            @click="prev_step()"
          >
            Back
          </button>
        </div>
        <div class="col-6 col-md-4">
          <button
            class="btn btn-black rounded-pill w-100"
            @click="confirmPage()"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="step == 3">
      <div class="container px-4 text-center" style="max-width:800px;">
        <div class="row">
          <div class="col">
            <div class="mt-5 mb-3">
              <h4 class="mb-4">
                Step 3: Confirm Activity Details
              </h4>
              <h2 class="fw-bold mb-3">
                Activity Preview
              </h2>
              <h5 class="mb-4 text-secondary fs-6">
                Here’s how your activity will look like! Make sure all details
                are correct! <br />
                Note: Activity details cannot be changed after created to
                prevent unpleasant participant experiences.
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="mx-auto shadow rounded" style="width:90%;max-width:1000px;">
          <ActivityPreview :detailsObj="final_details" />
        </div>
      </div>
      <div
        class="container px-4 text-center"
        style="max-width:800px;">
        
         
          <div class="row mb-4 mt-5">
            <div class="col-6 offset-md-2 col-md-4"><button class="btn btn-outline-black rounded-pill w-100" @click="prev_step()">Back</button></div>
            <div class="col-6 col-md-4"><button class="btn btn-black rounded-pill w-100" @click="submit()" :disabled="disabledBtn">
              Create Activity
              <div v-if="disabledBtn" class="spinner-border text-light" style="width:15px;height:15px;margin-left:5px;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
            </div>
          </div>
        </div>




    </div>
    </transition>
      <!-- Step 4  -->
    <transition name="fade">
     <div
      v-if="step == 4"
      class="container px-4 text-center"
      style="min-height: 10vh; max-width:720px;"
    >
      <img
        src="https://www.svgrepo.com/show/98634/tick.svg"
        style="width:150px;"
        class="mt-5 mb-4"
      />
      <h1 class="fw-bold">Awesome!</h1>
      <h2 class="fw-bold">{{ title }} has been created!</h2>
      <div class="mt-5">
        <button
          class="btn btn-black rounded-pill"
          style="width:200px;" :data-clipboard-text="url_share"
          @click="shareActivity()"
        >
          Copy Event Link
        </button>
      </div>
      <div class="mt-3">
        <button
          class="btn btn-outline-black rounded-pill"
          style="width:200px;"
          @click="goToProfile()"
        >
          Go To Profile
        </button>
      </div>
    </div>
    </transition>
    
    <Toast toastText="Invite Link copied to clipboard"/>
  </div>
  <!--  -->
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import router from "@/router";
import ActivityPreview from "@/components/ActivityPreview.vue";
import ClipboardJS from "clipboard/dist/clipboard.js"
import Toast from "@/components/Toast.vue"

export default {
  name: "createactivities",
  components: {
    Loader,
    ActivityPreview,
    Toast
  },
  props:["checked"],
  data() {
    return {
      step: Number(this.$route.params.step.split("-")[1]),
      tag_input: "",
      all_keywords: [],
      image_api_search: "",
      image_api_search_2: "",
      image_api_1: "",
      image_api_2: "",
      loader_1: false,
      loader_2: false,
      tags: [],

      title: "",
      online: null,
      online_url: "",
      accessibility: true,
      no_end_date: false,
      no_end_time: false,
      start_date: this.date_today,
      end_date: "",
      start_time: "",
      end_time: "",
      num_participants: 1,
      no_limit: false,
      activityDescription: "",
      cover_image: "",
      custom_images: [],

      postalCode: "",
      addressError: "",
      address: null,

      final_details: "",
      created_id: "",

      title_error_msg: "",
      start_date_error_msg: "",
      start_time_error_msg: "",
      location_error_msg: "",
      cover_image_error_msg: "",

      disabledBtn :false,
      url_share : "",

      imgLarge1: "",
      imgLarge2:""
    };
  },
  watch: {
    $route(to,from) {
      // react to route changes...
      this.step = Number(to.params.step.split("-")[1]);
      var previous_step = from.params.step.split("-")[1]
      if(previous_step == 4){
        this.$router.push({ name: "Home" });
      }
    },
    checked: function(){
      // console.log(this.checked)
      if(this.checked){
        if(!this.$parent.loggedIn){
          this.$router.push({ name: "Login", query:{ redirect : "Create_Activities",activity:"step-0", msg : "Oops! You must be logged in to begin creating activities!"} });
        }
      }
    }
  },

  methods: {
    prev_step: function() {
      var new_step = this.step - 1;
      router.push({ params: { step: "step-" + new_step } });
    },
    next_step: function() {
      var new_step = this.step + 1;
      router.push({ params: { step: "step-" + new_step } });
    },

    getKeywords: function() {
      if (
        this.tag_input.trim().length > 0 &&
        !this.all_keywords.includes(this.tag_input) &&
        this.all_keywords.length < 5
      ) {
        this.all_keywords.push(this.tag_input);
        this.tag_input = "";
      }
    },
    addTag(tag) {
      if (
        !this.all_keywords.includes(tag.trim()) &&
        this.all_keywords.length < 5
      ) {
        this.all_keywords.push(tag);
        this.tag_input = "";
      }
    },

    deleteInterest(index){
      this.all_keywords.splice(index, 1)
    },
    getLocation: function() {
      if (this.postalCode.length != 6) {
        return;
      }
      if (this.postalCode.length != 6 || isNaN(Number(this.postalCode))) {
        this.addressError = "Please enter a valid postal code.";
      } else {
        this.addressError = "";
        let location_api = `https://geocode.search.hereapi.com/v1/geocode?qq=postalCode=${this.postalCode};country=Singapore`;
        axios
          .get(location_api, {
            params: {
              apiKey: "DpaNTKG-YTK3ykoABHkMEdn_CGKcekS0gXfM9EZSx-0",
            },
          })
          .then((response) => {
            this.address = response.data.items[0].title;
            
          })
          .catch((error) => {
            console.log(error)
            this.addressError = "No valid address found.";
          });
      }
    },

    searchImages(num) {
      if (num == 0) {
        var search_input = this.image_api_search;
      } else {
        search_input = this.image_api_search_2;
      }

      if (search_input.trim() != "") {
        num == 0 ? (this.loader_1 = true) : (this.loader_2 = true);

        let url = "../api/getImages/" + search_input;
        axios.get(url).then((response) => {
          var filtered_arr = []
          for(var i = 0; i < response.data.images_results.length; i++){
            if((response.data.images_results[i].original.includes("facebook")||response.data.images_results[i].original.includes("lookaside") || response.data.images_results[i].original.includes("twitter")) == false){
              if(response.data.images_results[i].original.includes("https")){
                filtered_arr.push(response.data.images_results[i])
              }
            }
          }
          if (num == 0) {
            this.image_api_1 = filtered_arr.slice(0, 20);
            this.loader_1 = false;
          } else {
            this.image_api_2 = filtered_arr.slice(0, 20);
            this.loader_2 = false;
          }
        });
      }
    },

    selectAdditionalImage(img_url) {
      if (this.custom_images.length < 4) {
        this.custom_images.push(img_url);
      }
    },

    selectCover(img_url) {
      this.cover_image = img_url;
    },

    fileChangeEvent(fileInput) {
      let files = fileInput.target.files;

      if(files[0].size > 10485760){
        this.imgLarge1 = "File size too big. Max image size 10mb."
        return
      }
      this.imgLarge1 = ""
      const fileReader = new FileReader();
      for (var file of files) {
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
          this.cover_image = event.target.result;
        };
      }
    },

    fileChangeEventMultiple(fileInput) {
      let files = fileInput.target.files;
      let tooLarge = false
      let curr_length = this.custom_images.length;
      for (var file of files) {
        curr_length++;
        if (curr_length > 4) {
          break;
        }
        if(file.size > 10485760){
          tooLarge = true;
          this.imgLarge2 = "One or more images have not been uploaded as they were too large in size. Max image size 10mb."
          continue
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
          this.custom_images.push(event.target.result);
        };

      }
      if(!tooLarge){
        this.imgLarge2 = ""
      }
    },

    removeCustomImage(index) {
      this.custom_images.splice(index, 1);
    },

    getTags() {
      let url = "./api/getActivityTags";

      axios.get(url).then((response) => {
          this.tags = response.data[0].Tags;
        }).catch((err) => {
          console.log(err);
        });
    },
    confirmPage() {
      var activity_details = {
        Title: this.title,
        Image: this.cover_image,
        Custom_Images: this.custom_images,
        Description: this.activityDescription,
        Email: "",
        Online: this.online,
        Address: this.address,
        Online_url: this.online_url,
        Participant_Limit: Number(this.num_participants),
        Request: this.accessibility,
        Tags: this.all_keywords,
        Participants: [],
        StartTime: this.start_time,
        EndTime: this.end_time,
        StartDate: this.start_date,
        EndDate: this.end_date,
        Username: "",
        Participant_Requests : []
      };

      if (!this.no_end_date) {
        activity_details.EndDate = "";
      }
      if (!this.no_end_time) {
        activity_details.EndTime = "";
      }
      if (this.no_limit) {
        activity_details.Participant_Limit = -1;
      }
      this.final_details = activity_details;

      // form validation :
      // 1. Title
      // 2. Start Date/ Start Time
      // 3. Location / Link
      // 4. Cover Image

      let error_href = "";

      this.cover_image_error_msg=''
      this.location_error_msg=''
      this.start_date_error_msg=''
      this.start_time_error_msg=''
      this.title_error_msg=''

      if (!this.cover_image) {
        this.cover_image_error_msg = "Please include a cover image.";
        error_href = "#cover_image";
      }

      if (this.online == true) {
        if (this.online_url == "") {
          this.location_error_msg = "Please include your meeting url.";
          error_href = "#activity";
        }
      }
      else if(this.online==false){
        // console.log("hi")
        if (this.address == null) {
        // console.log("hi")
          this.location_error_msg = "Please indicate your location.";
          error_href = "#activity";
        }
      }

        if (!this.start_time) {
          this.start_time_error_msg = "Please indicate a starting time.";
          error_href = "#start_time";
        }

        if (!this.start_date) {
          this.start_date_error_msg = "Please indicate a starting date.";
          error_href = "#start_date";
        }

        if (this.title == "") {
          this.title_error_msg = "Please include an activity name.";
          error_href = "#title";
        }


      if (error_href == "") {
        this.next_step();
      } else {
        window.location.href=error_href
        
        setTimeout(function(){
            window.location.href=error_href
         }, 100);
      }
    },
    
    submit(){
      let url = "/api/createActivity"
      let bearer_token = window.localStorage.getItem("jwt")
      this.disabledBtn = true
      axios.post(url, {
        activityObj : this.final_details
      },{
        headers: { Authorization: `Bearer ${bearer_token}` }
      }).then(response =>{
        this.created_id = response.data.id
        this.url_share = window.location.protocol + "//" + window.location.host +  "/view/" +response.data.id
        // this.step++
        this.next_step();
      })
    },

    goToProfile() {
      this.$router.push({ name: "Profile" });
    },
    copyEventLink() {
      var link =
        location.protocol + "//" + location.host + "/view/" + this.created_id;
      alert(link);
    },
    shareActivity(){
      new ClipboardJS('.btn');
      var toast = document.getElementById("snackbar");
      toast.className = "show";
      setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
    }

  },

  computed: {
    checkDescription() {
      return `${this.activityDescription.length}/2500`;
    },
    checkTitle() {
      return `${this.title.length}/30`;
    },
    filtered_tags() {
      var tags_filtered = [];
      for (var tag of this.tags) {
        if (tag.toLowerCase().includes(this.tag_input.toLowerCase())) {
          tags_filtered.push(tag);
        }
      }
      return tags_filtered;
    },

    date_today() {
      let today = new Date().toISOString().slice(0, 10);
      return today;
    },

    time_now() {
      const d = new Date();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      return hour + ":" + minutes;
    },
  },
  mounted() {
    this.tags = require("@/assets/sample_api_tags.json");
    if(this.checked){
      if(!this.$parent.loggedIn){
        this.$router.push({ name: "Login", query:{ redirect : "Create_Activities",activity:"step-0", msg : "Oops! You must be logged in to begin creating activities!"} });
       }
    }



    if(this.online == null && (this.step == 2 || this.step==3 || this.step==4)){
      router.push({ params: { step: "step-0" } });
    }
  },
};
</script>

<style scoped>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */


.fade-enter-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}


.image-div {
  height: 300px;
  overflow-y: scroll;
  white-space: nowrap;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 6.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.image-active {
  box-shadow: 0 0 10px black;
}

.btn-close {
  display: inherit;
  margin-left: auto;
  background-color: white;
  opacity: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) z;
}


</style>
