import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

interface LottiePlayerProps {
  animationData: any;
  style?: CSSProperties;
  height?: number | string | undefined;
  width?: number | string | undefined;
}

export default function LottiePlayer(Props: LottiePlayerProps) {
  const { animationData, style, height, width } = Props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} style={style} height={height} width={width} />;
}
