import {
  // useLayoutEffect,
  // useCallback,
  useEffect,
  useState,
  // useMemo,
  useRef,
} from "react";

import {
  Button,
  Flex,
  Box,
  Image,
  Container,
  AspectRatio,
  HStack,
  keyframes,
  IconButton,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "font-awesome-animation/css/font-awesome-animation.min.css";

const Carousel = ({ data }) => {
  const [position, setPosition] = useState(0);
  const slideLength = data.length;

  const autoNext = true;
  let slideInterval;
  const intervalTime = 5000;

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

  const leftArrow = (
    <FontAwesomeIcon
      text-shadow="-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000"
      all={"unset"}
      display={"block"}
      position={"absolute"}
      icon={faChevronLeft}
      onClick={prevSlide}
    />
  );
  const rightArrow = (
    <FontAwesomeIcon
      text-shadow="0 0 3px #000"
      all={"unset"}
      display={"block"}
      position={"absolute"}
      icon={faChevronRight}
      onClick={prevSlide}
    />
  );
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
          aspectRatio={10 / 4}
          _before={{
            bgGradient: "linear(to-r, base.d400, transparent)",
            position: "absolute",

            content: "''",
            zIndex: 1,
            h: "100%",
            left: 0,
            top: 0,
          }}
          _after={{
            bgGradient: "linear(to-l, base.d400, transparent)",
            position: "absolute",

            content: "''",
            zIndex: 1,
            h: "100%",
            right: 0,
            top: 0,
          }}
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
                transition={"translate 1000ms ease-in-out"}
              />
            );
          })}
        </Box>
        <IconButton
          text-shadow="0 0 3px #000"
          icon={leftArrow}
          outline={"white"}
          all={"unset"}
          display={"block"}
          position={"absolute"}
          variant="ghost"
          top={"50%"}
          transform={"translateY(-50%)"}
          left={0}
          onClick={prevSlide}
          zIndex={50}
        />
        <IconButton
          text-shadow="0 0 3px #000"
          icon={rightArrow}
          outline={"white"}
          all={"unset"}
          display={"block"}
          position={"absolute"}
          variant="ghost"
          top={"50%"}
          transform={"translateY(-50%)"}
          right={0}
          onClick={nextSlide}
          zIndex={50}
        />
      </Flex>
    </>
  );
};

export default Carousel;
