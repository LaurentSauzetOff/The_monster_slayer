new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function () {
        let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
          isPlayer : true,
          text: 'Vous avez infligé au monstre ' + damage + ' points de dégats.'
      })

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();

    },
    specialAttack: function () {
        let damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage;
        this.turns.unshift({
            isPlayer : true,
            text: 'Vous avez infligé au monstre ' + damage + ' points de gros dégats.'
        })
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
        this.turns.unshift({
            isPlayer : true,
            text: 'Vous avez remonté vore santé de 10 points'
        })
        this.monsterAttacks();
    },
    giveUp: function () {
        this.gameIsRunning = false;
    },
    monsterAttacks: function (){
        let damage = this.calculateDamage(5, 12);
        this.playerHealth -= damage;
        this.checkWin();
        this.turns.unshift({
            isPlayer: false,
            text: 'Le monstre vous a infligé ' + damage + ' points de dégats'
        })
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
