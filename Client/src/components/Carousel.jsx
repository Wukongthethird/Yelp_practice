import {
  // useLayoutEffect,
  // useCallback,
  useEffect,
  useState,
  // useMemo,
  useRef,
} from "react";

import {
  // useMediaQuery,
  // useTheme,
  // Progress,
  // VStack,
  Button,
  Flex,
  Box,
  Image,
  Container,
  AspectRatio,
  HStack,
  keyframes,
  Fade, ScaleFade, Slide, SlideFade, Collapse
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ data }) => {
  const [position, setPosition] = useState(0);
  const slideLength = data.length;

  const autoNext = true;
  let slideInterval;
  let intervalTime = 5000;

  const containerStyle = {
    // width: `100%`,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  };
  const sliderStyle = {
    position: "relative",
    overflow: "hidden",
    objectFit: "cover",
  };

  const imageStyle = {
    objectFit: "cover",
    width: " 100%",
    height: "100%",
    display: "block",
    flexShrink: 0,
    flexGrow: 0,
    translate: `${-100 * position}%`,
  
  };



  //button onclick
  const nextSlide = () => {

    setPosition(position === slideLength - 1 ? 0 : position + 1);

  };
  const prevSlide = () => {
    setPosition(position === 0 ? slideLength - 1 : position - 1);
  };

  const autoScroll = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    autoScroll();
    // clean up function
    return () => clearInterval(slideInterval);
  }, [position]);

  console.log("running", position)
  return (
    <>
      <Flex
        width="100%"
        height="100%"
        position={"relative"}
        objectFit={"cover"}
   
      >
        <Box
          width={`100%`}
          display={"flex"}
          objectFit={"cover"}
          overflow={"hidden"}
          flexShrink={0}
          flexGrow={0}
          // transition={"translate 300ms ease-in-out"}
          // _before={{
          //   bgGradient: "linear(to-r, base.d400, transparent)",
          //   position: "absolute",
          //   // w: `${gap / 2}px`,
          //   content: "''",
          //   zIndex: 1,
          //   h: "100%",
          //   left: 0,
          //   top: 0
          // }}
          // _after={{
          //   bgGradient: "linear(to-l, base.d400, transparent)",
          //   position: "absolute",
          //   // w: `${gap / 2}px`,
          //   content: "''",
          //   zIndex: 1,
          //   h: "100%",
          //   right: 0,
          //   top: 0
          // }}
        >
          {data.map((val, ind) => {
            return (
              <Image
                key={val + ind}
                src={val}
                alt="error"
                style={imageStyle}
                width={"100%"}
                height={"100%"}
                flexShrink={0}
                flexGrow={0}
                transition={"translate 500ms ease-in-out"}
              />
            );
          })}
          {/* <Image
             
              src={data[position]}
              alt="error"
             
              style={imageStyle}
              width={"100%"}
              height={"100%"}
              flexShrink={0}
              flexGrow={0}
              
            /> */}
        </Box>
      </Flex>
      <Box>
        <FontAwesomeIcon icon={faChevronLeft} onClick={prevSlide} />
        <FontAwesomeIcon icon={faChevronRight} onClick={nextSlide} />
      </Box>
    </>
  );
};

export default Carousel;
