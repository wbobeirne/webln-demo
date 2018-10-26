import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';

const AdPose = posed.div({
  enter: { opacity: 1, transform: 'scale(1)' },
  exit: { opacity: 0, transform: 'scale(0)' },
});

interface IAdProps {
  hasAds?: boolean;
  className: string;
  children: React.ReactNode;
}

const Ad: React.SFC<IAdProps> = ({ hasAds, className, children }) => (
  <PoseGroup>
    {hasAds &&
      <AdPose key="ad" className={`Ad ${className}`}>
        <span>{children}</span>
      </AdPose>
    }
  </PoseGroup>
);

export default Ad;