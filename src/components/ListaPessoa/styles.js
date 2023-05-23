import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: rgb(250 250 250);
    border-radius: 5px;
    padding: 20px 0px;
    margin-bottom: 15px;
    @media screen and (max-width: 1280px) {
     width: 90%;
     margin: auto;
     margin-bottom: 15px;
    }
   
    .content{
        display: flex;
        width: 95%;
        margin: auto;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 1080px) {
            flex-direction: column;
        }
    }
    .userName{
        display: flex;
        align-items: center;
        flex: 1;
        img{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            margin-right: 20px;
        }
        @media screen and (max-width: 1080px) {
            flex-direction: column;
            img{
                margin-right: 0px;
                margin: 1rem auto;
            }
        }
    }
    .userInfo, .cidade, .btns{
        display: flex;
        margin: auto;
        align-items: center;
        flex-direction: column;
        flex: 1;
    }

    .btns{
        .edit{
            background-color: #e6effc;
            border: 0px;
            outline: 0px;
            padding: 8px 12px;
            cursor: pointer;
            margin: 0px 8px;
            text-decoration: none;
            color: #222;
        }
        
        .delete{
            background-color: #d85888;
            color: white;
            border: 0px;
            outline: 0px;
            padding: 8px 12px;
            cursor: pointer;
        }
       
        @media screen and (max-width: 1080px) {
            .edit, .delete{
            margin: 1rem 8px;
            }
        }
        
    }

`;
