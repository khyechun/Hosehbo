<template>
  <div class="about" >
    <!-- <h1>This is the register page</h1> -->

    <!-- Navbar here -->

    <div class="container"> 
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item" style="color: #2abe6a">Sign Up</li>
            <li class="breadcrumb-item active" aria-current="page" style="font-weight: bold">Choose Interest</li>
            <li class="breadcrumb-item " aria-current="page"> Success </li>
            </ol>
        </nav>
    </div>

    <div class="container mt-5">
      <h1 class="mb-3">Hello <span style="font-style: italic;"> {{username}} </span> </h1>
      <h2 class="mb-3">Select your interest(s)</h2>
      <input
        type="text"
        placeholder="Search.."
        name="search"
        class="form-control"
        style="max-width: 600px"
        v-model="search"
      />

      <div class=" mt-5">
        <div class="row pb-5" style="overflow-y:auto;word-break:break-word;max-height:400px;">
          <div class="col-6 col-md-3 mb-4" v-for="(c,index) in interests" v-bind:key="index">
            <button class="btn interest-btn w-100" @click="select_interest(c)"  :class="{active: c.selected}">
              {{c.name}} <img v-if="c.selected" src="@/assets/check.svg">
            </button>
          </div>
          
        </div>

        <p class="mt-5" style="text-align: right">
          <router-link to="/success" class="text-black me-4">Skip for now</router-link>
            <button class="btn btn-black" @click="submitInterest()">Proceed</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: "Interest",
  data() {
    return {
      categories : [
          /* {name:"Hiking", selected:false},
          {name:"Beach", selected:false},
          {name:"Cafe-Hopping", selected:false},
          {name:"Food", selected:false},
          {name:"Museums", selected:false},
          {name:"Sports", selected:false},
          {name:"Cycling", selected:false},
          {name:"Sports", selected:false},
          {name:"Cycling", selected:false} */
      ], 

      username: "",
      selectedCat: [],
      search : ""
    };
  },

  methods: {
   select_interest(c){ 
       if(c.selected){
           c.selected = false;
           return
       }
       c.selected = true;  

/*        if(c.selected == true){
         this.selectedCat.push(c.name)
       } */

       
       
   },

   getInterests(){
     let url = "/api/getActivityTags"
     axios.get(url)
     .then(response=>{
       //console.log(response.data)
       let tags = response.data[0].Tags
       for(let i=0; i<tags.length; i++){
         let tag = tags[i]
         this.categories.push({name:tag, selected: false})
       }
     })
   },

   
   submitInterest(){
     let categorySelected = this.categories

     for(let i=0; i<categorySelected.length; i++){
       //console.log(categorySelected[i])
       let name = categorySelected[i].name
       let check = categorySelected[i].selected
       if (check == true){
         this.selectedCat.push(name)
       }
      
     }

    //console.log(this.selectedCat)

      let bearer_token = window.localStorage.getItem("jwt")
      const config = {
        headers: { authorization: `Bearer ${bearer_token}` 
        }
      };
      let data = {interests: this.selectedCat} 
      let setInterest_url = "api/setInterests"
      axios.post(setInterest_url, data,config)
      .then(response => {
        console.log(response.data)
        router.push({ name: 'Success' })
      })
      .catch(error=>{
        console.log(error.message)
      })

   },


  

   getName(){

     let bearer_token = window.localStorage.getItem("jwt")
      const config = {
        headers: { authorization: `Bearer ${bearer_token}` 
        }
      };

     let url = "api/getUserDetails"
     axios.get(url, config)
     .then(response => {
      //  console.log(response.data.username)
       this.username = response.data.username
     })
   }

  },

  mounted: function(){
    this.getName(),
    this.getInterests()
  },
  computed:{
    interests(){
      var input = this.search.trim()
      if(input != ""){
        var arr = []
        for(var category of this.categories){
          if(category.name.toLowerCase().includes(input)){
            arr.push(category)
          }
        }
        return arr

      }else{
        return this.categories
      }
    }
  }

};
</script>

<style scoped>
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

</style>