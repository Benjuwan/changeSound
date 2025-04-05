import { memo } from 'react';

export const PartFooter = memo(() => {
    return (
        <footer>
            <p className='text-[10px] text-center'><small><a href="https://ondoku3.com/ja/" target="_blank">Voice By ondoku3.com</a></small></p>
            <p className='text-[10px] text-center'><small><a href="https://github.com/Benjuwan/changeSound" target="_blank">Created By benjuwan</a></small></p>
        </footer>
    );
});