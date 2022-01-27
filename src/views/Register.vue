<template>
  <div class="about">
    <!-- <h1>This is the register page</h1> -->
    
    <!-- Navbar here -->

    <div class="container mb-4 mt-5 pt-4">

      <div style="max-width: 500px;" class="mx-auto"> 



          <h1 style="text-align: left;" class="fw-bold" > Hello Friend!</h1>
          <h2 style="text-align: left;" class="fw-bold" > Sign Up Here</h2>



          <div class="row"> 
            <div class="col-12">
              <div class="form__group field mt-4"> 
                <input type="input" class="form__field" placeholder="input_1" name="input_1" id='input_1' required  v-model="username"/> 
                <label for="input_1" class="form__label">Username</label> 
                <p v-if="userName_error != '' " class="text-danger mb-0">
                  {{userName_error}}
                </p> 
              </div>
            </div>

          </div>



          <div class="row">

            <div class="col-12">
              <div class="form__group field mt-4"> 
                <input type="input" class="form__field" placeholder="input_2" name="input_2" id='input_2' required v-model="email" /> 
                <label for="input_2" class="form__label">Email</label>  
                <p v-if="email_error != '' " class="text-danger mb-0"> 
                  {{email_error}}
                </p>   
              </div>
            </div> 
          </div>

          <div class="row"> 
            <div class="col-12"> 
              <div class="form__group field mt-4"> 
                <input type="password" class="form__field" placeholder="input_3" name="input_3" id='input_3' required v-model="pw"  v-bind:class="{password1: validate_password}" /> 
                <label for="input_3" class="form__label">Password</label> 
                <p v-if="password_error != '' " class="text-danger mb-0">
                  {{password_error}}
                </p>
              </div>
            </div> 


          </div>

          <div class="row"> 
            <div class="col-12"> 
              <div class="form__group field mt-4 mb-4"> 
                <input type="password" class="form__field" placeholder="input_4" name="input_4" id='input_4' required  v-model="pw2" v-bind:class="{password1: validate_confirm_password}" v-on:keyup.enter="registerUser"/> 
                <label for="input_4" class="form__label">Confirm Password</label> 

                <p v-if="confirm_password_error != '' " class="text-danger mb-0"> 
                  {{confirm_password_error}}
                </p>
              </div>
            </div> 

          </div>


          

    
          <button :disabled="load" class="btn btn-black rounded-pill center mt-3 mb-2" v-on:click="registerUser">Create Account</button> <br>
          <!-- <button class="btn btn-black rounded-pill center mb-3"> <a> <router-link to="/interest" style="color:white;">Create Account  </router-link></a> </button> <br>   -->

          <div v-if='error != "" ' class="text-danger mb-0"> 
            {{error}}
          </div>
          
          <a> <router-link to="/login" style="color:black;">Have an account? Sign in here </router-link></a>

        
      </div>

    </div>


  </div>



</template>

<style> 
  .password1 {
    background-color: mistyrose;
  }

</style> 


<script>

    import axios from 'axios'

    import router from '@/router'

    export default{
      name: "Register",
      props:["checked"],
      data(){
        return{
          error: '', 
          form_error: [],
          username: "", 
          pw: "",
          pw2: "",
          email: "",
          status: false,
          color: "red",
          userName_error: "",
          email_error: "", 
          password_error: "", 
          confirm_password_error: "",
          load : false
        }
      }, 

      methods: {
      
        registerUser(){
          this.form_error.length = []
          if(this.username.length < 5){
            this.form_error.push("Username must be more than 5 characters")
            this.userName_error = "Username must be more than 5 characters"
          } else {
            this.userName_error = ""
          }

          

          if ( this.email.includes("@") == false ){
            this.form_error.push("Email Address must include '@' ")
            this.email_error = "Email address must contain '@' "
          } else {
            this.email_error = ""
          }

          if(this.pw.length < 5){
            this.password_error = "Password Length must be more than 5"
          } else {
            this.password_error = ""
          }





          if (this.pw != this.pw2){
            this.form_error.push("Password and confirm password does not match")
            this.confirm_password_error = "Password and confirm password does not match"
          } else {
            this.confirm_password_error = ""
          }

          if(this.form_error.length > 0 ){
            this.status = true
            return 
          }

          let url = "/api/register"

          
          this.load=true
          axios.post(url, {
            email: this.email,
            pw: this.pw,
            username: this.username
          }).then(response => {
            // console.log(response.data)
            if(response.data['error'] == true){
              // console.log(response.data['message'])
              this.error = response.data['message']
              this.load = false
            }
            else{
              this.error = ""
              window.localStorage["jwt"] = response.data["accessToken"]
              // this.$parent.loggedIn = true
              this.$parent.checkLoggedIn()
              router.push({ name: 'Register_Interest' })
            }
          })


        }
      },

      computed: {
        validate_password(){
          if(this.pw.length < 5 && !this.pw == ""){
            return true 
          } return false
        }, 

        validate_confirm_password(){
          if(this.pw != this.pw2){
            return true
          } return false
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
      },
      mounted(){
        if(this.checked){
          if(this.$parent.loggedIn){
              this.$router.push({ name: "Home"});
          }
        }
      }
}






</script>

