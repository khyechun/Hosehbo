<template>

  <div class="container px-4" id="home">
    <div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
    <div class="row d-flex align-items-center" style="min-height:76vh">
      <div class="col-lg-6 mt-5 order-1 order-lg-0">
        <p>Welcome to Hosehbo!</p>

        <h2 class="fw-bold">What Are You Up For Today?</h2>

        <div class="input-group mt-5" style="max-width:450px;">
          <input
            type="text"
            class="form-control"
            placeholder="Start exploring..."
            v-model="search" @keyup.enter="applyFilters(false); scrollToContainer()" 
          />
          <button class="btn btn-black" type="button" @click="applyFilters(false); scrollToContainer()">Search</button>
        </div>

        <p class="mt-4" id="feelingAdventurous"><a href="#activities-container" class="text-dark">I'm feeling adventurous</a></p>
      </div>

      <div class="col-lg-6 mt-5 order-0 order-lg-1">
        <div class="wrapper" style="min-height:30vh;">
          <div class="carousel">
            <div class="carousel__item" v-for="(category, index) in categories" :key="index"  >
              <!-- <div class="carousel__item-body shadow" :style="{backgroundImage: `url(${category.Image})`}">
                <p class="title"> {{category.Title}}</p>
              </div> -->
               <!-- @click="displayCategories(category.Title)" -->
              <div class="card shadow-lg" style="border:0;border-radius:10px;">
                <img class="card-img" style="border-radius:10px;" :src=category.Image>
                <div class="card-img-overlay d-flex align-items-center" style="color:white;background:rgba(0,0,0,0.2);border-radius:10px!important;">{{category.Title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Search Activities Section -->
    <div class="row mt-5 pt-5 pb-5" id="activities-container">
      <div class="col-12 col-md-6 col-lg-7 col-xl-8 mb-4"><h3 class="fw-bold">Recommended Activities</h3></div>
      <div class="col-12 col-md-6 col-lg-5 col-xl-4 mb-3" align="right">
         <div class="input-group">
          <input
            type="text"
            class="form-control py-1"
            placeholder="Search activites or categories"
            v-model="search"  @keyup.enter="applyFilters(true)"
          />
          <button class="btn btn-black" type="button" style="padding: 0 10px;border-top-right-radius:5px;border-bottom-right-radius:5px;" @click="applyFilters(true)">
           <img src="@/assets/search.svg" class="icon" style="vertical-align:sub"/>
          </button>
          <img style="width:30px;margin-left:20px;cursor:pointer" src="@/assets/options.svg" alt="Options SVG" data-bs-toggle="collapse" href="#filter_collapse" role="button"/>
        </div>
        
         </div>
      <!-- <div class="col-4 col-md-1 col-lg-1" style="cursor:pointer " align="right" data-bs-toggle="collapse" href="#filter_collapse" role="button"></div> -->
      <div class="collapse my-3" id="filter_collapse">
        <div>
          <h5 class="fw-bold">Advanced Filter Options</h5>
          <hr>
          <div class="row">
            <div class="col-6 col-md-3">
              <h6 class="fw-bold">Activity Type</h6>
              <div v-for="(online,index) of online_filter" :key="index">
                <label class="btn interest-btn my-2" style="width:85%;" :for="online"  :class="{active: online == online_selected}">{{online}}</label>
                <input class="d-none" type="radio" :value="online" v-model="online_selected" :name="online" :id="online">
              </div>
            </div>
            <div class="col-6 col-md-3" v-if="online_selected == '' || online_selected == 'Offline' ">
              <h6 class="fw-bold">Location</h6>
              <div  v-for="(location,index) of location_filter" :key="index">
                <label class="btn interest-btn my-2" style="width:85%;" :for="location"  :class="{active: location == location_selected}">{{location}}</label>
                <input class="d-none" type="radio" :value="location" v-model="location_selected" :name="location" :id="location">
              </div>
            </div>
            <div class="col-6 col-md-3">
              <h6 class="fw-bold">Date</h6>
              <div v-for="(date,index) of date_filter" :key="index">
                <label class="btn interest-btn my-2" style="width:85%;" :for="date"  :class="{active: date == date_selected}">{{date}}</label>
                <input class="d-none" type="radio" :value="date" v-model="date_selected" :name="date" :id="date">
              </div>
            </div>
            <div class="col-6 col-md-3"></div>
            <div class="col-6 col-md-3"></div>
            <div class="col-12 mt-3" align="right">
              <button class="btn btn-outline-black me-3" @click="clearFilters()">Clear Filters</button>
              <button class="btn btn-black" data-bs-toggle="collapse" href="#filter_collapse" role="button"  @click="applyFilters(false)">Apply</button> 
              <hr>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div style="position:relative">
        <div class="vert_scroll" style="position:relative;">
          <span  v-for="(filter, index) of all_pills" :key="index">
            <label class="my-1 mx-2 btn btn-black rounded-pill"  :class="{'btn-inactive': filter_selected != filter}" :for="filter">{{filter}}</label> 
            <input style="display:none" name="filter" type="radio" v-model="filter_selected" @change="applyFilters(false)" :value="filter" :id="filter">
          </span>  
        
        </div>
          <button v-if="scrollLeft" class="btn btn-black scroll-left-btn" @click="horizontalScroll(-250)">&lt;</button>
          <button class="btn btn-black scroll-right-btn" @click="horizontalScroll(250)">></button>
        </div>
      </div>
      <!-- V-FOR ACTIVITIES -->
      <div  style="min-height:50vh;">
        <div class="masonry-container mt-4">
          <div class="masonry-item" v-for="(item, index) of activities_display" :key="index" >
            <ActivityCard 
              :title="item.Title" 
              :image="item.Image"
              :participantLimit="item.Participant_Limit" 
              :itemId="item._id" 
              :startDate="item.StartDate"/>
          </div>
        </div>
        <div v-if="activities_display.length == 0" class="mt-3" >
          <h2>Sorry! There are no activities for your search.</h2>
          <p class="text-secondary">Please try searching for something else!</p>
          <button class="btn btn-outline-black mt-1 rounded-pill" @click="search = '';applyFilters(true) ">Click to reset search</button>
        </div>
      </div>
      <!-- <div class="col-12 col-sm-6 col-lg-4 mt-4" v-for="(item, index) of activities" :key="index">
        <ActivityCard 
          :title="item.Title" 
          :image="item.Image"
          :participantLimit="item.Participant_Limit" 
          :itemId="item._id" 
          :startDate="item.StartDate"/>
      </div> -->
    </div>
  </div>
</template>



<script>
    import axios from 'axios'
    import AOS from 'aos';
    import ActivityCard from '@/components/ActivityCard.vue'


    AOS.init();
// require("@/assets/sample_api_activities.json")
    export default{
      name: "home",
      data() {
        return{
          categories: [],
          filter_selected:"All",
          location_filter:["Central", "East", "North-East", "West", "North"],
          location_selected : "",
          date_filter :["Any Day", "Today", "Tomorrow", "This Week"],
          date_selected : "",
          online_filter : ["Online", "Offline"],
          online_selected : "",
          search:"",
          activities_data: [], 
          activities_display: [],
          my_interests_pills:[],
          all_pills : ["All"],
          
          regions: require("@/assets/region.json"),
          scrollLeft:false
          
      }
      },
      
      methods: {
        getCategories(){
          let url = "/api/getCategories"

          axios.get(url)
          .then(response => {
            this.categories=response.data
          })
          .catch(error => {
              console.log(error.message)
          })
        },
        getActivities(){
          var url = "./api/getActivities"
          axios.get(url).then(result=>{
            // this.activities = result.data
            this.activities_data = result.data
            this.activities_data = this.activities_data.slice().sort((a,b) => new Date(b.StartDate) - new Date(a.StartDate));
            //ENABLE WHEN NOT TESTING
            this.applyFilters(false)
            // console.log(this.activities)
          }).catch(err=>{
            console.log(err)
          })
        },

        displayCategories(selectedCategory){
          let title= selectedCategory
          this.search= title
          window.location.href="#activities-container"
          this.applyFilters(false)
        },

        clearFilters(){
          this.location_selected = "";
          this.date_selected = "";
          this.online_selected = "";
        },

        applyFilters(reset){

          var input = this.search.trim().toLowerCase()
          
          if(this.filter_selected == "All" && this.date_selected == "" && this.online_selected == "" && this.location_selected == "" && input == ""){
            this.activities_display = this.activities_data
            return
          }
          if(input != ""){
            this.filter_selected = input
            this.all_pills = [input]
          }else{
            this.all_pills = ["All"]
            if(reset && input == ""){
              this.filter_selected = "All"
              this.location_selected = ""
              this.online_selected = ""
              this.date_selected = ""
            }
            if(this.my_interests_pills.length > 0){
              this.all_pills.push("Recommended")
              this.all_pills = this.all_pills.concat(this.my_interests_pills)
            }
          }

          var curr_date = new Date();
          var activities_arr = this.activities_data.slice()
          // Loop filter
          for(var i = activities_arr.length - 1; i > -1; i-- ){
            
            var activity = activities_arr[i]

            //SEARCH
            var tag_includes = activity.Tags.some(item => item.toLowerCase().trim() == input)
            let title_includes = activity.Title.toLowerCase().includes(input)
            if(!title_includes && !tag_includes ){
              activities_arr.splice(i,1)
              continue
            }

            // MAIN FILTER (INTERESTS POGGERS) SELECTED
            if(this.filter_selected != "All" && input == ""){
              if(this.filter_selected == "Recommended"){
                var exists = false
                for(var e = 2; e < this.all_pills.length; e++){
                  var interest = this.all_pills[e]
                  let interest_includes = activity.Tags.some(item => item.toLowerCase().trim() == interest.toLowerCase().trim())
                  let title_includes = activity.Title.toLowerCase().includes(interest.toLowerCase().trim())
                  if(interest_includes || title_includes){    
                    exists = true;
                    break
                  }
                }
                if(!exists){    
                  activities_arr.splice(i,1)
                  continue
                }
              }
              else{
                let interest_includes = activity.Tags.some(item => item.toLowerCase().trim() == this.filter_selected.toLowerCase().trim())
                let title_includes = activity.Title.toLowerCase().includes(this.filter_selected.toLowerCase().trim())
                if(!interest_includes && !title_includes){
                  activities_arr.splice(i,1)
                  continue
                }
              }
            }

                        
            // FILTER ONLINE/OFFLINE ACTIVITY
            if(this.online_selected == "Online" && !activity.Online){
              activities_arr.splice(i,1)
              continue
            }else if (this.online_selected == "Offline" && activity.Online){
              activities_arr.splice(i,1)
              continue
            }

            // FILTER LOCATION
            if(this.location_selected != "" && this.online_selected != "Online"){
              if(activity.Online){
                activities_arr.splice(i,1)
                continue
              }else{
                var postal_code = activity.Address.split(',')[1].split(" ")[2]
                var first_2_letters = postal_code.substring(0,2)
                if(!this.regions[this.location_selected].includes(first_2_letters)){
                  activities_arr.splice(i,1)
                  continue
                } 
              }
            }

            // FILTER DATE
            if(this.date_selected != "" && this.date_selected != "Any Day"){
              var start_date = new Date(activity.StartDate)
              var date_diff = Math.floor(( start_date - curr_date) / (1000*60*60*24))
              if(this.date_selected == "Today" && date_diff != -1){
                activities_arr.splice(i,1)
                continue
              }else if(this.date_selected == "Tomorrow" && date_diff != 0){
                activities_arr.splice(i,1)
                continue
              }else if(this.date_selected == "This Week" && date_diff > 7 || date_diff < -1){
                activities_arr.splice(i,1)
                continue
              }
            }
          }

          this.activities_display = activities_arr
        },
        getInterest(){
          setTimeout(() => {
            let bearer_token = window.localStorage.getItem("jwt")
            const config = {
            headers: { authorization: `Bearer ${bearer_token}` 
                }
            };
            let url = "api/getUserDetails"
            axios.get(url, config)
            .then(response => {
                if(response.data.interests.length > 0){
                  this.all_pills.push("Recommended")
                }
                this.my_interests_pills = response.data.interests
                this.all_pills = this.all_pills.concat(response.data.interests)
            })
          }, 1500);
          

        },
        initScrollEvent(){
          var self = this

          document.getElementsByClassName("vert_scroll")[0].addEventListener("scroll", function(){
            if(this.scrollLeft > 80){
              self.scrollLeft = true
            }else{
              self.scrollLeft = false
            }
          })
        },
        scrollToContainer(){
          setTimeout(function(){
            window.location.href = "#activities-container"
          }, 100);
        },
        horizontalScroll(distance){
          var elem = document.getElementsByClassName("vert_scroll")[0]
            elem.scrollLeft += distance

        }
      },


      mounted(){
        this.getCategories()
        this.getActivities()
        this.applyFilters(false)
        this.getInterest()
        this.initScrollEvent()

      },
      components:{
        ActivityCard
      },
      computed:{
        activities(){
          return []
          
        }
      }
    }


</script>



<style lang="scss">
@use 'sass:math';
$animation-timing: 27s;
$carousel-items: 9;
$animation-delay-fraction: math.div($animation-timing , $carousel-items); 
$animation-steps-fraction: math.div(100 , $carousel-items);
$slide-change-timing: 3; 
*,
*::before,
*::after {
  box-sizing: border-box;
}

#feelingAdventurous{
  animation-duration: 3s;
}

.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.carousel__item {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  padding: 0 12px;
  opacity: 0;
  will-change: transform, opacity;
  -webkit-animation: carousel-animate-vertical 27s linear infinite;
          animation: carousel-animate-vertical 27s linear infinite;
}

@for $i from 1 through ($carousel-items - 1) {
  .carousel__item:nth-child(#{$i}) {
    animation-delay: calc(#{$animation-delay-fraction} * #{$i - 2});
  }
}

.carousel__item:last-child {
  animation-delay: calc(-#{$animation-delay-fraction} * 2);
}


.carousel__item-body {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 20px 16px 70px;
}

.title {
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 10px;
}

@-webkit-keyframes carousel-animate-vertical {
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
  3%, 11.1111111111% {
    transform: translateY(100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  14.1111111111%, 22.2222222222% {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
  25.2222222222%, 33.3333333333% {
    transform: translateY(-100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  36.3333333333% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: visible;
  }
  100% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes carousel-animate-vertical {
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
  3%, 11.1111111111% {
    transform: translateY(100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  14.1111111111%, 22.2222222222% {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
  25.2222222222%, 33.3333333333% {
    transform: translateY(-100%) scale(0.7);
    opacity: 0.4;
    visibility: visible;
  }
  36.3333333333% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: visible;
  }
  100% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
    visibility: hidden;
  }
}

.vert_scroll{
  overflow: auto;
  white-space: nowrap;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll; 
  scroll-behavior: smooth;
  padding-right: 30px;
}

.vert_scroll::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}


.masonry-container {
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
    
  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
  
  
}

.masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom:15px;
  box-shadow:0 0 5px rgba(0,0,0,0.6)
}

@media only screen and (max-width: 992px) {
  .masonry-container {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
      
    -webkit-column-gap: 15px;
    -moz-column-gap: 15px;
    column-gap: 15px;
  } 
}

@media only screen and (max-width: 576px) {
  .masonry-container {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
      
    -webkit-column-gap: 15px;
    -moz-column-gap: 15px;
    column-gap: 15px;
  }
}



.masonry-item .card{
  border-radius: 0;
  border: 0;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}




@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
.bg {
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, rgb(255, 255, 255) 50%, rgb(250, 250, 250) 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:4s;
}

.bg3 {
  animation-duration:5s;
}


.scroll-right-btn{
  position: absolute;
    right: -5px;
    top: 4px;
    z-index: 100;
    border-radius:20px;
    border: 0;
    background: rgba(0,0,0,0.7);
    padding-left:14px;
    padding-right:14px;
}

.scroll-left-btn{
    position: absolute;
    left: -5px;
    top: 4px;
    z-index: 100;
    border-radius:20px;
    border: 0;
    background: rgba(0,0,0,0.7);
    padding-left:14px;
    padding-right:14px;
}
</style>
