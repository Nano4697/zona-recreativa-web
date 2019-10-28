import Carousel from 'react-multi-carousel';
import "../style/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


const CarouselCard = props => {
    return <Carousel swipeable={true}
        draggable={false}
        showDots={props.showDots == "undefined" ? false : props.showDots}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={props.infinite}
        autoPlay={props.autoPlay}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        transitionDuration={50}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        className="pb-3"
    >
        {props.children}
    </Carousel>;
}

export default CarouselCard;
