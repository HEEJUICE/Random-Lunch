import React from "react";
import PropTypes from "prop-types";

export const Person = ({ person }) => {
  return <div>{person}</div>;
};

Person.propTypes = {
  person: PropTypes.node.isRequired
};
