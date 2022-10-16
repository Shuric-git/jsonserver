import React, {Dispatch, FC, SetStateAction} from 'react';
import './NextBtn.scss'

const NextBtn: FC<{incPage: Dispatch<SetStateAction<number>>, disable: boolean}> = ({incPage, disable}) => {
  return (
    <button disabled={disable} id='nextBtn' onClick={() => incPage(prev => prev + 1)}>Next</button>
  );
};

export default NextBtn;