import React from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Text, Image } from "native-base";

const TitleBar = ({ image }) => (
  <Header>
    <Body>
      <Left />
      <Title>{image}</Title>
      <Right></Right>
    </Body>
  </Header>
);

export default TitleBar;

TitleBar.propTypes = {
  title: PropTypes.string
};
