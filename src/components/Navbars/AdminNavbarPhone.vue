<template>
  <div>
      <div dark class="upravyTitle mx-n5">Úpravy</div>
      <div class="d-lg-none" v-for="item in editItems" :key="item.title">
        <v-btn depressed color="#fff" router :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          <strong>{{item.title}}</strong>
        </v-btn>
      </div>
  </div>
</template>

<script>
export default {
  name: "AdminNavbarPhone",

  data() {
    return {      
    };
  },

  computed: {
    items:  function() {
      return this.$store.getters.getAdminMenu.items;
    },

    editItems:  function() {
      return this.$store.getters.getAdminMenu.editItems;
    }
  },

};
</script>

<style scoped>
.upravyTitle  {
  background-color: #174085;
  color:white;
  padding: 3px 30px
}
</style>

