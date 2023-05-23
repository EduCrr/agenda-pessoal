import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;

  .initial{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
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
    @media screen and (max-width: 480px) {
      flex-direction: column;
    }
  }
`;
