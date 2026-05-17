import { Animated, View } from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -6, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();

    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  return (
    <View className="flex-row gap-1 items-center h-5">
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400"
          style={{ transform: [{ translateY: dot }] }}
        />
      ))}
    </View>
  )
}