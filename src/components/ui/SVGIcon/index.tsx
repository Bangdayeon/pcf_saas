import { cn } from '@/lib/utils';
import React from 'react';

import { IconMap, IconMapTypes, IconSizeTypes } from './icons';

export interface SVGIconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'viewBox'
> {
  icon: IconMapTypes;
  size?: IconSizeTypes;
}

type IconModule =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | {
      default: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    };

const SizeClassMap: Record<IconSizeTypes, string> = {
  xs: 'size-3.5',
  sm: 'size-4',
  md: 'size-4.5',
  lg: 'size-5',
  xl: 'size-6',
};
const SVGIcon: React.FC<SVGIconProps> = ({ icon, size = 'lg', className, ...props }) => {
  const iconModule = IconMap[icon] as IconModule | unknown;

  if (!iconModule) return null;

  const Icon =
    typeof iconModule === 'object' && 'default' in iconModule ? iconModule.default : iconModule;

  if (typeof Icon !== 'function') {
    console.error(`Icon ${icon} is not a valid component:`, Icon);
    return null;
  }

  const IconComponent = Icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  return <IconComponent {...props} className={cn(SizeClassMap[size], className)} />;
};

export default SVGIcon;
