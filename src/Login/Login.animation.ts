import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

export const useAnimateHandler = () => {
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 7000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const animationProgress = useRef(new Animated.Value(0));

  const handleOnPress = async () => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return {
    animationProgress: animationProgress.current,
    handleOnPress,
  };
};
