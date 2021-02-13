Vue.createApp({
    // data là giá trị của tất cả các dữ liệu ở html code
    data (){
        return {
            goals : [],
            enteredValue : '',
        };
    },
    // method là tất cả các function để handle các hành động
    methods: {
        addGoal(){
            this.goals.push(this.enteredValue)
            this.enteredValue = ''
        }
    }

}).mount('#app'); 

// mount để mount và render vue app