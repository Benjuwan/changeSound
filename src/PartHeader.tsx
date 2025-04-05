import { memo } from 'react';
import logo from '../src/assets/logo.svg';

export const PartHeader = memo(() => {
    return (
        <header className='pt-[5em] mb-[2.5em]'>
            <h1 className='text-center'><img className='w-[15em] drop-shadow-[2px_2px_4px_#8c8c8c] m-auto' src={logo} alt="ゲーム：「聞いて見て」のロゴマーク" /></h1>
        </header>
    );
});