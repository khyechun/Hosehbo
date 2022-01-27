<template>
  <div class="mt-4 mb-4 container-fluid">
    <Toast toastText="Changes Saved" :showImg="false"/>
    <div class="row">
      <div class="col-md-3">
        <SideProfile :username="this.$parent.username"/>
      </div>

      <div class="col-md-9 col-lg-7">
        <h3 class="fw-bold">My Interests</h3>

        <div>
          <button
            class="btn interest-btn pe-1 ps-2 m-2"
            v-for="(interest, index) in my_interests"
            :key="index"
          >
            {{ interest }}
            <i
              class="far fa-times-circle fa-md ms-1"
              @click="deleteInterest(interest)"
            ></i>
          </button>
        </div>
        <hr>

        <div class="text-end">
          <button
            class="btn btn-black rounded-pill"
            @click="saveNewInterests()"
          >

            Save Changes
          </button>
        </div>

        <div class="row mt-3">
          <div class="col">
            <h3 class="fw-bold">Add New Interests</h3>
            <div style="position:relative;">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                class="form-control ps-5 mt-3"
                
                v-model="tag_input"
              />
              <span style="position:absolute; top:7px; left: 10px; color:grey;"
                ><i class="fas fa-search"></i
              ></span>
            </div>

            <div v-if="tag_input.length >= 0" class="text-start mt-3" style="max-height:50vh;overflow-y:auto;word-break:break-word;">
              <span v-for="(tag, index) of filtered_tags" :key="index">
                <button class="btn interest-btn m-1" @click="addTag(tag)">
                  {{ tag.name }}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideProfile from "@/components/SideProfile.vue";
import Toast from "@/components/Toast.vue";
import axios from "axios";

export default {
  components: { SideProfile, Toast },
  data() {
    return {
      my_interests: [],
      all_tags: [],
      tag_input: "",
      loader: false
    };
  },

  methods: {
    myInterests() {
      let bearer_token = window.localStorage.getItem("jwt");
      const config = {
        headers: { authorization: `Bearer ${bearer_token}` },
      };
      let url = "/api/getUserDetails";
      axios.get(url, config).then((response) => {
        this.my_interests = response.data.interests;
      });
    },

    deleteInterest(interest) {
      let bearer_token = window.localStorage.getItem("jwt");
      this.config = {
        headers: { authorization: `Bearer ${bearer_token}` },
      };
      let url = "/api/setInterests";

      this.my_interests.splice(this.my_interests.indexOf(interest), 1);

      this.all_tags.push({name: interest, selected: false})


      axios
        .post(url, { interests: this.my_interests }, this.config)
        .then((response) => {
          console.log(response);
        });
    },

    getTags() {
      let url = "/api/getActivityTags";
      axios.get(url).then((response) => {
        let tags = response.data[0].Tags;
        for (let i = 0; i < tags.length; i++) {
          let tag = tags[i];
          this.all_tags.push({ name: tag, selected: false });
        }
      });
    },

    addTag(tag) {
      if (this.my_interests.includes(tag.name)) {
        tag.selected = false;
        return;
      }
      if (tag.selected) {
        tag.selected = false;
      } else {
        tag.selected = true;
        if (!this.my_interests.includes(tag.name)) {
          this.my_interests.push(tag.name);
          for (let i = 0; i < this.all_tags.length; i++) {
            let interest_tag_name = this.all_tags[i].name;
            if (interest_tag_name.toLowerCase() == tag.name.toLowerCase()) {
              this.all_tags.splice(i, 1);
              break;
            }
          }
        }
      }
    },

    saveNewInterests() {
      this.loader = true;
      let bearer_token = window.localStorage.getItem("jwt");
      this.config = {
        headers: { authorization: `Bearer ${bearer_token}` },
      };
      let url = "/api/setInterests";
      axios
        .post(url, { interests: this.my_interests }, this.config)
        .then((response) => {
          var toast = document.getElementById("snackbar");
          toast.className = "show";
          setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
          console.log(response);
          this.loader=false

        });
    },
  },

  computed: {
    filtered_tags() {

      if(this.tag_input.trim() == ""){
        return this.all_tags
      }
      var tags_filtered = [];
      for (let tag of this.all_tags) {
        if (this.tag_input != "") {
          if (tag.name.toLowerCase().includes(this.tag_input.toLowerCase())) {
            tags_filtered.push({ name: tag.name, selected: false });
          }
        }
      }
      return tags_filtered;
    },
  },

  mounted() {
    if(!this.$parent.loggedIn){
      this.$router.push({ name: "Login", query:{ redirect : "myInterest", msg : "Oops! You must be logged in to access your interests page"} });
      return
    }
    this.myInterests();
    this.getTags();
    
  },
};
</script>

<style lang="scss" scoped>
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