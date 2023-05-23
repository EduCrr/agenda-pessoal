import styled from "styled-components";

export const Container = styled.div`
   background-color: red;
   color: white;
   padding: 10px;
   margin: 1rem 0px;
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   span{
    cursor: pointer;
   }
   
   @media screen and (max-width: 1280px) {
      width: 90%;
      margin: 1rem auto;
   }
`;
