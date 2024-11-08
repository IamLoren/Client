import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";
import FiltersBar from "../components/FiltersBar/FiltersBar";
import Catalog from "../components/Catalog/Catalog";
import useResponsive from "../hooks";
import MobileFilters from "../components/MobileFilters/MobileFilters";

const HomePage: React.FC = () => {
  const { isMobile, isSM, isTablet} = useResponsive();

  return (
    <>
      <Header />
      <main data-cy="store-provider" className="flex-1 secondary-background secondary-text p-4">
        <Container addStyles={isTablet ? "flex gap-[20px]" : ""}>
          {isTablet && <FiltersBar />}
          <Catalog />
        </Container>
      </main>
      <Footer />
      {isMobile &&  <MobileFilters/>}
      {isSM &&  <MobileFilters/>}
    </>
  );
};

export default HomePage;
