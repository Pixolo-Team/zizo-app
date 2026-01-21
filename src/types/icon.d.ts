import { FunctionComponent, SVGProps } from "react";

export interface IconProps {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  className?: string;
}

export type IconComponent = FunctionComponent<
  IconProps & SVGProps<SVGSVGElement>
>;
