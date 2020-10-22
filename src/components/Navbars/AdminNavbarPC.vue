<template>
  <!-- -------------computer admin navbar------------- -->
  <v-navigation-drawer
    stateless
    value="true"
    width="250px"
    class="adminNavbar d-none d-lg-flex lgAndUp"
    color="#444"
    left
    absolute
    dark
  >
    <v-list dense nav class="py-0 ma-0">
      <v-list-item class="upravy py-0 pl-9 mx-n5">
        <div class="upravyTitle">Úpravy</div>
      </v-list-item>

      <!-- <v-list-item v-for="item in items" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item v-for="item in editItems" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AdminNavbarPC",

  data() {
    return {
      model: 3,
    };
  },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },

    items: function () {
      return this.$store.getters.getAdminMenu.items;
    },

    editItems: function () {
      return this.$store.getters.getAdminMenu.editItems;
    },
  },
};
</script>

<style scoped>
.adminNavbar {
  margin-top: 64px;
  position: fixed;
  z-index: 2;
  top: 0;
}

.upravy {
  background-color: #222;
}

.upravyTitle {
  color: #ffce48;
}
</style>

