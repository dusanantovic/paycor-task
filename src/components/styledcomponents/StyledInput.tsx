import { styled } from "styled-components";

export const StyledInput = styled.input`
    border: none;
    width: 300px;
    height: 24px;
    padding: 8px 16px;
    font-weight: 300;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #FF0000;
    &:focus {
        outline: none;
    };
    &::placeholder {
        color: #CCCCCC;
    };
`;