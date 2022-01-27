<template>
  <div id="app" >
  <nav class="navbar navbar-expand-sm navbar-light mt-3 px-4 pb-3">
    <div class="container-fluid">
      <router-link  class="navbar-brand fw-bold" to="/"><img src="@/assets/logo.png" style="height:45px;"></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto ">
          <li class="nav-item me-4">
            <a class="nav-link active" href="/#activities-container" aria-current="page" >
              Activities 
            </a>
          </li>
          <li class="nav-item me-4">
            <a class="nav-link">
              <router-link to="/create-activity/step-0" style="text-decoration:none; color:black;"> Create </router-link>
            </a>
          </li>

          <li class="nav-item" v-if="loggedIn">
              <router-link  to="/profile" style="text-decoration:none; " id="profile" class="btn btn-black rounded-pill mobile-a-btn"> Profile </router-link>
          </li>
          <!-- <li class="nav-item me-4" v-if="loggedIn">
            <a class="nav-link" style="color:black;cursor:pointer" @click="logout()">
              Logout 
            </a>
          </li> -->
           <li class="nav-item" v-if="!loggedIn">
              <router-link  to="/login" style="text-decoration:none; " class="btn btn-black rounded-pill mobile-a-btn"> Login </router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>

    <transition name="component-fade" mode="out-in">
      <router-view :loggedIn="loggedIn" :checked="checked" />
    </transition>
    <Toast toastText="Successfully logged out" :showImg="false"/>
  </div>

</template>

<script>

  import axios from 'axios'
  import Toast from "@/components/Toast.vue"


  export default{
    name: "main",
    components:{
      Toast
    },
      data() {
        return{
          loggedIn : false,
          username : "",
          email : "",
          checked:false
        }
      },


      
      methods: {
        checkLoggedIn(){
          let bearer_token = window.localStorage.getItem("jwt")
          if(bearer_token !== null){
            const config = {
               headers: { Authorization: `Bearer ${bearer_token}` }
            };



            axios.get("/api/getUserDetails", config).then(res=>{
              this.username = res.data.username
              this.email = res.data.email
              this.loggedIn = true
              this.checked= true
            }).catch(()=>{
              this.checked= true
              this.logout()
            })


          }else{
            this.checked=true
          }
        },
        logout(){
          window.localStorage.removeItem("jwt")
          this.loggedIn=false;
          this.username = "";
          this.email = "";
          this.toastMsg()
          if(this.$route.name != "Home"){
            this.$router.push({ name: "Home" })
          }
          
        },

        
        toastMsg(){
          var toast = document.getElementById("snackbar");
          toast.className = "show";
          setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        },

      },
      mounted(){
        this.checkLoggedIn()
      }

    }
</script>


<style lang="scss">

$primary: #16b3a5;
$secondary: #2abe63;
$white: #fff;
$gray: #858585;

a:hover{
  background: -webkit-linear-gradient($primary,$secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn:hover{
  background: -webkit-linear-gradient($primary,$secondary);
  -webkit-text-fill-color: white;
  color:white;
  transition:1s;
}

a.btn.btn-black.rounded-pill:hover{
  background: -webkit-linear-gradient($primary,$secondary);
  // -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  color:white;
  transition:1s;
}


#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  font-family: "Open Sans", sans-serif;
}

// custom CSS

$gray-text:#262626;
.font-grey{
  color:$gray-text;
}
.btn-black {
  background-color: #262626;
  color: white !important;
}

.btn-outline-black{
  background-color: white;
  color: #262626!important;
  border: 2px solid #262626;
}
.btn:focus {
  // box-shadow: 0 0 0 0.25rem rgb(0 0 0 / 25%);
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}


.btn {
  padding: 0.375rem 1.5rem;
}

.form-control {
  border-color: #858585!important;
  border-width:2px;
}

.form-control:focus {
  // box-shadow: 0 0 0 0.25rem rgb(0 0 0 / 25%);
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}

.btn-inactive {
  background-color: #edebeb;
  color: #858585 !important;
}




// INPUT Base code used: https://codepen.io/lucasyem/pen/ZEEYKdj


.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}

.form__field {
  width: 100%;
  border: 2px solid $gray;
  outline: 0;
  font-size: 1rem;
  color: $gray;
  padding: 7px 10px;
  background: transparent;
  transition: border-color 0.2s;
  border-radius:0.25rem;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 25px;
  }
}

.form__label {
  position: absolute;
  top: -10px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
  left:10px;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: -10px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $gray;  
  }
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}


// Active/inactive button
.interest-btn{
  background-color:white;
  border: 1px solid $gray;
  color:$gray;
  border-radius:30px;

}

.interest-btn.active{
  background-color:black;
  color:white;
}


//disabled forms
.form-control:disabled, .form-control[readonly] {
    background-color: #e9ecef;
    border: #c9c9c9 solid 2px!important;
    color: #c9c9c9;
}


//animation
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

html { 
  overflow-y: scroll; 
}


// Scrollbar
/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: gray; 
  border-radius:10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


@media only screen and (max-width: 576px) {
  .mobile-a-btn{
    padding:0;
    background:transparent;
    color:black!important;
    padding-top:0.5rem;
    
  }

  a.btn.btn-black.rounded-pill:hover{
  background: transparent;
  // -webkit-background-clip: text;
  -webkit-text-fill-color: black;
    color:black;
    transition:1s;
    box-shadow:0;
  }

  a.btn.btn-black.rounded-pill:focus{
    box-shadow:none!important;
  }

}
</style>
