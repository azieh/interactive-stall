import React, { useState } from 'react';
import IMAGE_URL from '../img/stoisko.jpg';
import ImageMapper from 'react-image-mapper';
import useWindowDimensions from '../Hooks/useWindowDimensions.js'
//https://coldiary.github.io/react-image-mapper/
//https://github.com/coldiary/react-image-mapper
export const Stall = () => {
  let { height, width } = useWindowDimensions();
  const imgWidth = 1920
  const imgHight = 1344
  let size =  width / imgWidth
  const [hoveredArea, setHoveredArea] = useState(null);
  const enterArea = (area) => {
    setHoveredArea(area);
  }
  const leaveArea = (area) => {
    setHoveredArea(null);
  }
  const logPosition = (e) => {
    console.log('ON CLICK, clientX:', e.clientX, 'clinentY', e.clientY)
  }
  const openPage = (area) => {
    window.open(area.url, '_blank').focus();
  }
  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  }
  const imgSetup = {
    name: "my-map",
    areas: [
      { 
        name: "Daszek", 
        shape: "poly", 
        coords: [589, 272, 1432, 446, 1719, 238, 876, 102], 
        preFillColor: "rgba(255, 255, 255, .4)", 
        fillColor: "rgba(255, 255, 255, .5)",
        url: 'https://brandoncontent.pl/' 
      },
      { 
        name: "Warzywa", 
        shape: "poly", 
        coords: [500, 787, 702, 845, 751, 763, 932, 838, 909, 918, 1174, 1003, 1530, 737, 849, 562], 
        preFillColor: "rgba(255, 255, 255, .4)", 
        fillColor: "rgba(255, 255, 255, .5)",
        url: 'https://brandoncontent.pl/' 
      }
    ]
  }

  return <div onClick={logPosition}>
    <ImageMapper 
    src={IMAGE_URL} 
    map={imgSetup} 
    onClick={area => openPage(area)}
    onMouseLeave={area => leaveArea(area)} 
    onMouseEnter={area => enterArea(area)} 
    width={imgWidth*size} 
    height={imgHight*size} 
    imgWidth={imgWidth} 
    />
    {hoveredArea &&
      <span className="tooltip"
        style={{ ...getTipPosition(hoveredArea) }}>
        {hoveredArea && hoveredArea.name}
      </span>
    }
  </div>;
};
