import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;

  .initial{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    @media screen and (max-width: 1280px) {
        margin: 1rem auto;
        width: 90%;
    }
    form {
      input{
        border: 0px;
        outline: 0px;
        background-color: #f6f6f6;
        padding: 15px 18px;
        width: 250px;
        border-radius: 50px;
      }
    }
    .addUser{
      text-decoration: none;
      background-color: #000;
      color: white;
      padding: 5px 8px;
      border-radius: 5px;
    }
    @media screen and (max-width: 480px) {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 1280px) {
        .addUser{
          margin: 1rem 0px;
        }
    }
`;
