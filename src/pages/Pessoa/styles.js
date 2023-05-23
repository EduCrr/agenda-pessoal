import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  .formUser{
    width: 100%;
  }
 .custom-file-button{
    cursor: pointer;
    width: fit-content;
    padding: 8px 12px;
    outline: none;
    border: 0px;
    background-color: rgb(230, 239, 252);
    color: rgb(34, 34, 34);
  }
  @media screen and (max-width: 1080px) {
    .formPhoto{
        width: 90%;
        margin: auto;
    }
  }
  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;
