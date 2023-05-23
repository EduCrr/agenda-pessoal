import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto;

  @media screen and (max-width: 1280px) {
      width: 90%;
  }
  @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  .menuLeft{
    display: flex;
    flex: 1;
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
    }
  }
  .menuRight{
    display: flex;
    flex: 2;
    justify-content: flex-end;
    a, p{
      color: #77767c;
      text-decoration: none;
      margin: 0px;
      margin-left: 25px;
      cursor: pointer;
    }
    .active{
      color: #222;
      font-weight: bold;
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      margin-top: 5px;
      a, p{
        margin-left: 0px;
        margin: 5px 0px;
      }
    }
  }
`;
