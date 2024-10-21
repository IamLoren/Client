import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import useResponsive from "../../hooks";

const Footer: React.FC = () => {
  const { isTablet, isWideTablet, isDesktop } = useResponsive();
  return (
    <footer className="primary-background p-4">
      <Container addStyles="flex flex-col md:flex-row md:justify-between">
        <div>
          <a href="/" className="block p-[15px] pl-[0] accent-text font-bold">LOGO</a>
          {(isTablet || isWideTablet || isDesktop) && (
            <p>
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          )}
        </div>
        <div className="flex justify-between md:gap-[50px]">
          <div className="flex flex-col w-[100px]">
            <p className="mb-[10px]">About</p>
            <Link to="">How it works</Link>
            <Link to="">Featured</Link>
            <Link to="">Partnership</Link>
            <Link to="">Bussiness Relation</Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-[10px]">Community</p>
            <Link to="">Events</Link>
            <Link to="">Blog</Link>
            <Link to="">Podcast</Link>
            <Link to="">Invite a friend</Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-[10px]">Socials</p>
            <Link to="">Discord</Link>
            <Link to="">Instagram</Link>
            <Link to="">Twitter</Link>
            <Link to="">Facebook</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
