import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useAnimateIn = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px', ...options });
  return { ref, isInView };
};