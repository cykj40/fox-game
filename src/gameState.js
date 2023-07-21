import { modFox, modScene } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }
    return this.clock;
  },

  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
  },

  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },

  sleep() {
    this.state = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.sleepTime = this.clock + NIGHT_LENGTH;
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },

  die() {
    console.log("die");
  },

  handleUserAction: function (icon) {
    const currentState = this.current;
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(currentState)
    ) {
      // do nothing
      return;
    }
    if (currentState === "INIT" || currentState === "DEAD") {
      this.startGame();
      return;
    }
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },

  changeWeather() {
    console.log("changeWeather");
  },

  cleanUpPoop() {
    console.log("cleanUpPoop");
  },

  feed() {
    console.log("feed");
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);

export default gameState;
