import React, {FC, Dispatch, SetStateAction} from 'react';
import './PrevBtn.scss'

const PrevBtn: FC<{decPage: Dispatch<SetStateAction<number>>, disable: boolean}> = ({decPage, disable}) => {
  return (
    <button disabled={disable} className='prevBtn' onClick={() => decPage((prev) => {
      return prev - 1 < 1 ? 1 : prev - 1
    })}>Prev</button>
  );
};

export default PrevBtn;