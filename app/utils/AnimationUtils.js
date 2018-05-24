import { Animated } from 'react-native';

class AnimationUtils {
  static startAnimation(elem) {
    Animated.timing(elem, {
      toValue: 1,
      duration: 1000,
    }).start(animation => {
      if (animation.finished) {
        this.endAnimation(elem);
      }
    });
  }

  static endAnimation(elem) {
    Animated.timing(elem, {
      toValue: 0,
      duration: 1000,
    }).start(animation => {
      if (animation.finished) {
        this.startAnimation(elem);
      }
    });
  }

  static scale(elem) {
    elem.setValue(0);
    Animated.timing(elem, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack,
    }).start();
  }
}

export default AnimationUtils;
