import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  .featuredVertical {
    background: linear-gradient(to top, #0e0e10 5%, transparent 95%);
    height: inherit;
    .merge {
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      max-width: 1200px;
      height: 100vh;
      .content {
        color: white;
        display: flex;
        flex-direction: column;
        width: 600px;
        p {
          color: #8c8c8c;
        }
        h2 {
          margin-bottom: 10px;
          color: white;
          &::first-letter {
            text-transform: uppercase;
          }
        }
        button {
          cursor: pointer;
          padding: 10px 20px;
          margin-top: 20px;
          max-width: 90px;
          border: 0;
          font-weight: bold;
          color: white;
          background-color: #e52864;
        }
      }
    }
  }
`;
