// REACT //
import React from "react";

// TYPES //
import { IconComponent } from "@/types/icon";

const 3dScale: IconComponent = ({
  primary_color,
  secondary_color,
  tertiary_color,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 28 28" height={28} width={28}  {...props}><g><path id="Vector 837" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M9.137514285714287 18.31141 5.3955014285714284 20.212585714285712" strokeWidth={2} /><path id="Vector 838" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="m16.862485714285715 18.31141 3.7274714285714285 1.9002471428571428" strokeWidth={2} /><path id="Vector 839" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M13 11.551447142857144V6.692697142857143" strokeWidth={2} /><path id="Vector 844" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M9.136994285714287 18.31137285714286v-4.828571428571429l3.862857142857143 -1.9314285714285715 3.862857142857143 1.9314285714285715v4.828571428571429L12.99985142857143 20.242857142857144l-3.862857142857143 -1.9314842857142858Z" strokeWidth={2} /><path id="Vector 845" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M0.9285714285714286 23.783871428571427v-3.219171428571429l2.575244285714286 -1.2875571428571428 2.5752257142857142 1.2875571428571428v3.219171428571429L3.5038157142857145 25.071428571428573 0.9285714285714286 23.783871428571427Z" strokeWidth={2} /><path id="Vector 846" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M19.920828571428572 23.783871428571427v-3.219171428571429l2.5751142857142857 -1.2875571428571428 2.5753000000000004 1.2875571428571428v3.219171428571429l-2.5753000000000004 1.2875571428571428 -2.5751142857142857 -1.2875571428571428Z" strokeWidth={2} /><path id="Vector 847" stroke={primary_color} strokeLinecap="round" strokeLinejoin="round" d="M10.426482857142856 5.435244285714286V2.2161842857142857L13.001708571428571 0.9285714285714286l2.575244285714286 1.2876128571428571v3.2190600000000003L13.001708571428571 6.722857142857143l-2.5752257142857142 -1.2876128571428571Z" strokeWidth={2} /></g></svg>
);

export default 3dScale;