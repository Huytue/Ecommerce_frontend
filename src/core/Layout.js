import React from "react";
import Menu from "./Menu";
import "../styles.css";
import SliderCarousel from "../components/SliderCarousel";
import Footer from "../components/Footer";

import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <>
        <Menu />
      
        <BannerAnim prefixCls="banner-user" autoPlay>
        <Element 
          prefixCls="banner-user-elem"
          key="0"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              background: '#364D79',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            <h3>{title}</h3>
          </TweenOne>
          <TweenOne className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
             {description}
          </TweenOne>
        </Element>
        <Element 
          prefixCls="banner-user-elem"
          key="1" 
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              background: '#64CBCC',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
          <h3>{title}</h3>
          </TweenOne>
          <TweenOne className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            {description}
          </TweenOne>
        </Element>
      </BannerAnim>


      
        <SliderCarousel/>
        <div className={className}>{children}</div>
       
        <Footer/>
    </>
);

export default Layout;
