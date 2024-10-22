import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import useResponsive from "../../hooks";

const Footer: React.FC = () => {
  const { isTablet, isWideTablet, isDesktop } = useResponsive();
  return (
    <footer className="primary-background p-4 box-shadow">
      <Container addStyles="flex flex-col md:flex-row md:justify-between">
        <div>
          <a href="/" className="block p-[15px] pl-[0] accent-text font-bold">LOGO</a>
          {(isTablet || isWideTablet || isDesktop) && (
            <p className="w-[250px]">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          )}
        </div>
        <div className="flex justify-between md:gap-[50px]  secondary-text">
          <div className="flex flex-col w-[100px]">
            <p className="mb-[10px]">About</p>
            <Link to="" className="filters-color">How it works</Link>
            <Link to="" className="filters-color">Featured</Link>
            <Link to="" className="filters-color">Partnership</Link>
            <Link to="" className="filters-color">Bussiness Relation</Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-[10px]">Community</p>
            <Link to="" className="filters-color">Events</Link>
            <Link to="" className="filters-color">Blog</Link>
            <Link to="" className="filters-color">Podcast</Link>
            <Link to="" className="filters-color">Invite a friend</Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-[10px]">Socials</p>
            <Link to="" className="filters-color">Discord</Link>
            <Link to="" className="filters-color">Instagram</Link>
            <Link to="" className="filters-color">Twitter</Link>
            <Link to="" className="filters-color">Facebook</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
