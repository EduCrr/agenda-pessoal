import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../fundo.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
 .loginContainer{
    max-width: 1200px;
    padding: 30px;
    height: 45%;
    width: 40%;
    background-color: white;
    border-radius: 25px;
    @media screen and (max-width: 1280px) {
        width: 70%;
        height: 55%;
    }
    form{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      flex-direction: column;
      
      input{
        width: 100%;
        padding: 10px 12px;
        outline: none;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #c1c1c1;
      }
      button{
        background-color: #e6effc;
        border: 0px;
        outline: 0px;
        padding: 8px 12px;
        cursor: pointer;
        margin-top: 10px;
        text-decoration: none;
        color: #222;
      }
    }
  }
`;
