import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

// const currentDpr = window.devicePixelRatio;
// const defaultDpr = 2; // sketch 里用的是 iphone 6 尺寸;
const dpr = 0.5;// currentDpr / defaultDpr;

class Carousel3d extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    tilt: PropTypes.string,
    duration: PropTypes.string,
    ease: PropTypes.string,
    blurIncrease: PropTypes.number,
    opacityDecline: PropTypes.number,
    opacityBasics: PropTypes.number,
    moveRange: PropTypes.number,
    childMaxLength: PropTypes.number,
    perspective: PropTypes.number,
    z: PropTypes.number,
    current: PropTypes.number,
  }

  static defaultProps = {
    onChange: () => { },
    tilt: '5rem',
    duration: '.45s',
    ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    blurIncrease: 8,
    opacityDecline: 0.1,
    opacityBasics: 0.5,
    moveRange: 2,
    childMaxLength: 6,
    perspective: 2800,
    z: 800,
    current: 0,
  };

  constructor(props) {
    super(props);
    this.setLengthAndAngle(props);
    this.state = {
      rotate: -props.current * this.angle,
      current: props.current,
      transition: 'none',
    };
  }

  componentDidMount() {
    this.w = document.body.clientWidth;
    window.addEventListener('mouseup', this.onTouchEnd);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { current, children } = this.props;
      if (
        (current !== this.state.current && current !== prevProps.current)
        || (React.Children.toArray(children).length !== React.Children
          .toArray(prevProps.children).length)
      ) {
        this.setLengthAndAngle(this.props);
        // eslint-disable-next-line
        this.setState({
          current: this.props.current,
          rotate: -this.props.current * this.angle,
          transition: `transform ${this.props.duration} ${this.props.ease}`,
        });
      }
    }
  }

  onTouchStart = (e) => {
    if (e.touches && e.touches.length > 1 || this.length <= 1) {
      return;
    }
    this.startX = e.pageX || e.touches[0].pageX;
    this.startRotate = Math.round(this.state.rotate / this.angle) * this.angle; 
  }

  onTouchMove = (e) => {
    if (e.touches && e.touches.length > 1 || this.length <= 1 || !this.startX) {
      return;
    }
    const x = e.pageX || e.touches[0].pageX;
    const differ = (x - this.startX) * this.props.moveRange; 
    const rotate = this.startRotate + differ / this.w * this.angle;
    const r = (Math.abs(Math.ceil(this.state.rotate / 360)) * 360 - rotate) % 360;
    const current = Math.round(r / this.angle) % this.length;
    this.setState({
      rotate,
      current,
      transition: 'none',
    }, () => {
      this.props.onChange({
        current,
        rotate,
        eventType: 'move',
      });
    });
  }

  onTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 1 || this.length <= 1 || !this.startX) {
      return;
    }
    const x = e.pageX || e.changedTouches[0].pageX;
    const differ = x - this.startX;
    const { current, rotate } = this.state;
    const n = differ > 0 ? 1 : -1;
    const newRotate = this.startRotate + n * this.angle
      * Math.round(Math.abs((rotate - this.startRotate) / this.angle));
    this.setState({
      rotate: newRotate,
      transition: `transform ${this.props.duration} ${this.props.ease}`,
    }, () => {
      this.startX = null;
      this.props.onChange({
        current,
        rotate: newRotate,
        eventType: 'end',
      });
    });
  }

  setLengthAndAngle = (props) => {
    this.length = React.Children.toArray(props.children).length;
    this.length = this.length > props.childMaxLength ? props.childMaxLength : this.length;
    this.angle = 360 / this.length;
  }

  getAnimStyle = (n, length) => {
    const { opacityBasics, opacityDecline, blurIncrease } = this.props;
    const center = length / 2;
    const i = n > center ? center * 2 - n : n;
    let opacity = 1 - ((i - 1) * opacityDecline + opacityBasics * (n ? 1 : 0));
    opacity = opacity < 0.1 ? 0.1 : opacity;
    const d = {
      opacity,
    };
    if (blurIncrease) {
      d.filter = `blur(${i * blurIncrease}px)`;
    }
    return d;
  }

  getChildrenToRender = (children) => {
    const { childMaxLength, z } = this.props;
    const newChildren = React.Children.toArray(children);
    const length = newChildren.length;
    const zDpr = z * dpr;
    return newChildren.map((item, i) => {
      if (i >= childMaxLength) {
        return null;
      }
      const transform = `rotateY(${this.angle * i}deg) translateZ(${zDpr}px) rotateY(-${this.angle * i}deg) `;
      const animStyle = this.getAnimStyle(
        Math.abs(this.state.current - i),
        length > childMaxLength ? childMaxLength : length
      );
      const style = {
        transform,
         opacity: animStyle.opacity
      };
      return (
        <div
          className="itemWrapper"
          key={item.key}
          style={style}
        >
          <div
            className="rotateLayer"
            style={{
              transform: `rotateY(${-this.state.rotate}deg)`,
              transition: this.state.transition,
            }}
          >
            <div
              className="bgAndBlurLayer"
              style={{ ...animStyle }}
            >
              {/* transform 与 filter 的距阵冲突，图层分离 */}
              <div className="contentLayer" style={{ opacity: this.state.current === i ? 1 : 0 }}>
                {item}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { onChange, ...props } = this.props;
    const {
      children, tilt, style, z, perspective,
    } = props;
    const zDpr = z * dpr;
    const perspectiveDpr = perspective * dpr;
    const childrenToRender = this.getChildrenToRender(children, perspective);
    [
      'tilt',
      'duration',
      'ease',
      'blurIncrease',
      'opacityDecline',
      'opacityBasics',
      'moveRange',
      'childMaxLength',
      'perspective',
      'z',
      'current',
    ].forEach((k) => delete props[k]);
    return (
      <div
        {...props}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onMouseMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onMouseUp={this.onTouchEnd}
      >
        <div className="carousel-wrapper">
          <div
            className="carousel"
            style={{
              ...style,
              perspective: perspectiveDpr,
              transform: `translateY(-${tilt}) scale(${(perspectiveDpr - zDpr) / perspectiveDpr})`,
            }}
          >
            <div
              className="carouselContent"
              style={{
                transform: `translateY(${tilt}) rotateY(${this.state.rotate}deg)`,
                transition: this.state.transition,
              }}
            >
              {childrenToRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const imgWrapper = [
  'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2019/10/danh-gia-galaxy-tab-s6.jpg',
  'https://vuhoangtelecom.vn/wp-content/uploads/2019/05/hikvision-ds-2cv1021g0-idw1-1-600x600.jpg',
  'https://cdn.tgdd.vn/Products/Images/44/215941/macbook-pro-16-201926-macbookprotouch16inch-1-600x600.jpg',
  'https://mobiledailoan.vn/wp-content/uploads/2020/06/iphone-12-dai-loan-180x180.jpg',
  'https://media.dautuvakinhdoanh.vn/2020/03/30/9882/1585537863-image003.jpg',
  
];

export default function Carousel() {
  const children = imgWrapper.map((src, i) => (
    <div
      key={i.toString()}
      className="img-wrapper"
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  ));
  return (
    <div className="carousel-demo-wrapper">
      <Carousel3d className="carousel-demo" childMaxLength={6}>
        {children}
      </Carousel3d>
    </div>
  );
}