import React, {useEffect, useState } from "react";
import * as C from "./styles";
import { ImCross } from "react-icons/im";

export const MensagemErro = ({ errors, handleClose }) => {
  return (
    <C.Container>
      <div>{errors}</div>
      <span onClick={handleClose}>
        <ImCross fontSize={12} />
      </span>
    </C.Container>
  );
};
