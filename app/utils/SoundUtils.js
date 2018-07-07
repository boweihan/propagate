import { Audio } from 'expo';

const flipSound = require('../assets/sounds/flipSoft.mp3');

const SoundArray = [];

class SoundUtils {
  static soundCallback(status) {
    if (status.isLoaded) {
      if (status.didJustFinish && !status.isLooping) {
        if (SoundArray.length > 0) {
          SoundArray[0].unloadAsync();
          SoundArray.shift();
        }
      }
    }
  }
  static async playFlip() {
    await Audio.setIsEnabledAsync(true);
    SoundArray.push(new Audio.Sound());
    SoundArray[SoundArray.length - 1].setOnPlaybackStatusUpdate(
      this.soundCallback,
    );
    await SoundArray[SoundArray.length - 1].loadAsync(flipSound);
    await SoundArray[SoundArray.length - 1].playAsync();
  }
}

export default SoundUtils;
