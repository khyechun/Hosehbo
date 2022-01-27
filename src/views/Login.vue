<template>
  <div class="container pt-5" id="login">
    <h1 class="fw-bold mt-5">Welcome Back !</h1>
    <h2 class="fw-bold">Sign In Here</h2>
    <div v-if="msg != undefined" class="mt-4 alert alert-light" style="background:#edebeb">
      {{msg}}
    </div>
    <div class="form__group field mt-4">
        <input type="input" class="form__field" placeholder="input_1" name="input_1" id='input_1' required v-model="email"/>
        <label for="input_1" class="form__label">Email</label>
    </div>

    <div class="form__group field mt-4">
        <input type="password" class="form__field" placeholder="input_2" name="input_2" id='input_2' required v-model="password" v-on:keyup.enter="verify_login" />
        <label for="input_2" class="form__label">Password</label>
    </div>
    <!-- <div class="input-group mt-4 w-100 mx-auto">
      <input type="password" class="form-control" placeholder="Password" v-model="password">
    </div> -->

    <br>
    <p v-if="error.length>0" class="text-danger" id="error-msg" > {{ error }} </p>

     <button class="btn btn-black rounded-pill mt-4" @click="verify_login" :disabled="disabledBtn">
       Let's Go!
      <div v-if="disabledBtn" class="spinner-border text-light" style="width:15px;height:15px;margin-left:5px;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      </button> 

     <p class="mt-5"><router-link to="/register" style="color: black;"> New here? Create an account now </router-link></p>
  </div>
</template>

<style scoped>
  #login{
    max-width: 500px;
  }

  h1, h2 , button, .input-group{
    text-align: left;
  }

  #error-msg{
    margin-bottom: 0;
  }
</style>

<script>
    import axios from 'axios'
    import router from '@/router'



    export default{
      name: "login",
      props:["checked"],
      data() {
        return{
        email: '',
        password: '',
        error: '',
        msg : "",
        redirect : "",
        activity: "",
        disabledBtn:false
      }
      },
      
      methods: {
        verify_login(){
          this.disabledBtn=true
          let url = "/api/login"

          axios.post(url, {
            email: this.email, 
            pw: this.password
          })

          .then(response => {
            if(response.data['errorMessage']){
              this.error= response.data['errorMessage']
              this.disabledBtn=false;
            }
            else{
              this.error=''
              window.localStorage["jwt"] = response.data["accessToken"]
              this.$parent.checkLoggedIn()
              const config = {
               headers: { Authorization: `Bearer ${response.data["accessToken"]}` }
              };



              axios.get("/api/getUserDetails", config).then(res=>{
                this.$parent.username = res.data.username
                this.$parent.email = res.data.email
                this.loggedIn = true
                if(this.redirect != undefined){
                if(this.activity == undefined){
                  router.push({ name: this.redirect })
                }
                else{
                  if(this.redirect == "Create_Activities"){
                    router.push({ name: this.redirect , params: { step: this.activity } });
                  }else{
                    router.push({ name: this.redirect , params: { activity: this.activity } });
                  }
                }
                }else{
                  router.push({ name: 'Home' })
                }
              }).catch(()=>{
                this.logout()
              })
              
              
            }

          })
          .catch(error => {
              console.log(error.message)
          })
        }
      },
      mounted(){
        this.msg = this.$route.query.msg
        this.redirect = this.$route.query.redirect
        this.activity = this.$route.query.activity

        if(this.checked){
          if(this.$parent.loggedIn){
              this.$router.push({ name: "Home"});
          }
        }
      },
      watch:{
        checked: function(){
          if(this.checked){
            if(this.$parent.loggedIn){
              this.$router.push({ name: "Home"});
            }
          }
        }
      }
    }


</script>
