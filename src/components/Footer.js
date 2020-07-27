import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
   
      <>
          <FooterWrapper>
            <div className="container py-3">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-capitalize">
                    copyright &copy; tech store {new Date().getFullYear()}. all
                    rights reserved{" "}
                  </p>
                </div>
                <div className="col-md-6 d-flex justify-content-around">
              
				<a href='https://www.facebook.com/TueCoder'>  <FaFacebook className="icon" />  </a>
				<a href='https://twitter.com/'>  <FaTwitter className="icon" />  </a>
				<a href='https://www.linkedin.com/in/tuecoder/'>  <FaLinkedin className="icon" />  </a>
                </div>
              </div>
            </div>
          </FooterWrapper>
          </>
        );
}

const FooterWrapper = styled.footer`
margin-top: 200px;
    margin-block-end: auto;
	padding: 20px;
	padding-top: 40px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  color: var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .icon:hover {
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
