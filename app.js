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

      this.playerHealth -= this.calculateDamage(5, 12);

      if (this.playerHealth <= 0) {
        alert("Vous avez perdu !");
        this.gameIsRunning = false;
      }
      this.checkWin();
    },
    specialAttack: function () {},
    heal: function () {},
    giveUp: function () {},
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
