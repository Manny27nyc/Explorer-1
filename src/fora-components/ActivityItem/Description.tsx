/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Box, Text } from "@theme-ui/components";

const AuthorName = props => (
  <Text {...props} sx={{ fontWeight: "medium", color: "black" }}></Text>
);

const Description = props => (
  <Box
    {...props}
    sx={{
      color: "brandGray.400",
      fontSize: "base",
      lineHeight: "standard",

      "> *": {
        display: "inline"
      }
    }}
  >
    <AuthorName>{props.authorName || "--"}</AuthorName>
    {props.children}
  </Box>
);

export default Description;