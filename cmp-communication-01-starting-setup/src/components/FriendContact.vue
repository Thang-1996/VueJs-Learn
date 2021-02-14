<template>
  <li>
    <h2>{{ name }} {{friendIsFavorite ? '(Favorite)' : ''}}</h2>
    <button @click="toggleFavorite">Toggle Favorite</button>
    <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  // props  là data từ main app // any data is name include in here
/*  props:[
    'name',
    'phoneNumber',
    'emailAddress',
      'isFavorite',
  ],*/
  props:{
    // xác định kiểu để validate props
    name: {
      type : String,
      required : true, // nên nhập hay không
    },
    phoneNumber : {
      type : String,
      required : true,
    },
    emailAddress : {
      type : String,
      required : true,
    },
    isFavorite : {
      type : Boolean,
      required : false,
      default : false, // set default value
      validator : function (value) {
        return value === true || value === false;
      }
    },
  },


  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "manuel",
        name: "Manuel Lorenz",
        phone: "0123 45678 90",
        email: "manuel@localhost.com",
      },
      // add data để change props
      friendIsFavorite : this.isFavorite, // defiend state de su dung o day tuong tu nhu state trong react
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite(){
        this.friendIsFavorite = !this.friendIsFavorite;
    }
  }
};
</script>