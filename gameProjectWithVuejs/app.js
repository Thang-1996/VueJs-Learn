// tao function để dùng chung
const randomNumber = (min,max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// tạo biến app bao toàn bộ vuejs
const app = Vue.createApp({
    // truyền các data là các dữ liệu ở trang html của vue
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            // add round of game 
            currentRound : 0,
            // set winner var để biết xem ai win khi game kết thúc
            winner : null,
            logMessages : [],
        };
    },
        // add computed cho dynamic styleing để sử dụng cho các logic dễ mà không cần phải viết ở html code và thay đổi sau mỗi lân render
    computed : {
        monsterBarStyle(){
            if(this.monsterHealth < 0){
                return {width : '0%'}
            }
            return {width : this.monsterHealth + '%'}
        },
        playerBarStyle(){
            if(this.playerHealth < 0){
                return {width : '0%'}
            }
            return {width : this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                // set a draw
            }else if(value <=0){
                this.winner = 'Monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                // set a draw
            }else if(value <=0){
                this.winner = 'Player'
            }
        }
    },
    // method để handle các hành động của game 
    methods: {
        startGame(){
            // start game set heath to 100
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 0
            this.logMessages = []
        },
        // attack monster action
        attackMonster() {
            this.currentRound ++;
            // random attack health
           const attackValue =  randomNumber(5,12); // counter random attack health number
           // this keyword để tham chiếu đến tất cả data của vuejs 
           this.monsterHealth -= attackValue;
           this.addLogMessage('player','attack',attackValue);
           // call function attackplayer after player attack monster
           this.attackPlayer();
        },
        //attack player action
        attackPlayer(){
            const attackValue = randomNumber(8,15);;
            this.playerHealth -= attackValue;
            this.addLogMessage('monster','attack',attackValue);
        },
        //special Attacka action
        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = randomNumber(10,25);;
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','special attack',attackValue);
            this.attackPlayer();
            // setting special attack for anny free round
        },
        healPlayer(){
            this.currentRound ++;
            const healValue = randomNumber(8,20);
            // handle Health logic 
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100; // không bao giờ cho health quá 100

            }else{
                this.playerHealth += healValue;
            }
            // nếu sử dụng health thì monster sẽ attack lại
            this.addLogMessage('player','health',healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'Monster';
        },
        addLogMessage(attacked,action,value){
            // truyền thông tin vào log Là 1 object hành động 
            this.logMessages.unshift({
                attacked : attacked,
                action : action,
                value : value,
            });
        }
       // add watch option để xử lý các ván đề cuối cùng khi muốn render ra ví dụ như render game over scene
    

    },
});
app.mount('#game');