import React from "react";
import { Flex } from "rebass";
import emotionStyled from "lib/emotion-styled";
import css from "@styled-system/css";

const CenterContainer = emotionStyled(Flex)(() => css({}));

const LoadingIcon = () => (
  <CenterContainer justifyContent={"center"} alignItems={"center"} width="100%" height="100%">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="11"
        cy="11"
        r="8.5"
        stroke="#111618"
        stroke-opacity="0.3"
        stroke-width="3"
        style={{ mixBlendMode: "multiply" }}
      />
      <path
        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20"
        stroke="white"
        stroke-width="3"
      />
    </svg>
  </CenterContainer>
);

export default LoadingIcon;
