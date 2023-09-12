import React from "react";
import Router from "../routes";
import { ContainerMain, ContainerPages } from "./styles";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FC = () => {
  return (
    <ContainerMain>
      <Header />
      <ContainerPages>
        <Router />
      </ContainerPages>
      <Footer />
    </ContainerMain>
  );
};

export default Layout;
