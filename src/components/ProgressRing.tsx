import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useThemeColor } from '../hooks/useThemeColor';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number; // 0 to 1
  color?: string;
  backgroundColor?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressRing: React.FC<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
}) => {
  const textColor = useThemeColor({}, 'text');
  const color = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = useRef(new Animated.Value(circumference)).current;

  useEffect(() => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const offset = circumference - verifiedProgress(clampedProgress) * circumference;
    
    Animated.timing(strokeDashoffset, {
      toValue: offset,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress, circumference]);

  const verifiedProgress = (p: number) => (isNaN(p) ? 0 : p);

  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <Circle
          stroke={backgroundColor}
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <AnimatedCircle
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.content]}>
        <Text style={[styles.percentage, { color: textColor }]}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold', 
  },
});
