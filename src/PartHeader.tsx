import styled from 'styled-components';
import logo from '../src/assets/logo.svg';

export const PartHeader = () => {
    return(
        <HeaderWrapper>
            <h1><img src={logo} alt="ゲーム：「聞いて見て」のロゴマーク" /></h1>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
padding-top: 5em;
margin-bottom: 2.5em;

& h1{
    margin: 0;
    text-align: center;

    & img{
        width: 10em;
    }
}
`;