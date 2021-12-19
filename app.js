new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function () {
      this.monsterHealth -= this.calculateDamage(3, 10);

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();

    },
    specialAttack: function () {
        this.monsterHealth -= this.calculateDamage(10, 20);

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function () {
        if(this.playerHealth <= 90){
            this.playerHealth += 10;
        } else {
            this.playerHealth = 100;
        }
        this.monsterAttacks();
    },
    giveUp: function () {
        this.gameIsRunning = false;
    },
    monsterAttacks: function (){
        this.playerHealth -= this.calculateDamage(5, 12);
        this.checkWin();
    },
    calculateDamage: function (minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("Vous avez gagné ! Voulez-vous rejouer ?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return;
      } else if (this.playerHealth <= 0) {
        if (confirm("Vous avez perdu ! Voulez-vous rejouer ?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
