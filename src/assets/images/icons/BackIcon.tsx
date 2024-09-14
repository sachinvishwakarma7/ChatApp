import * as React from 'react';
import Svg, {Polyline, Line} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const BackIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 512 512"
    {...props}>
    <Polyline
      points="244 400 100 256 244 112"
      style={{
        fill: 'none',
        stroke: '#fff',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
    <Line
      x1={120}
      y1={256}
      x2={412}
      y2={256}
      style={{
        fill: 'none',
        stroke: '#fff',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 48,
      }}
    />
  </Svg>
);
export default BackIcon;
