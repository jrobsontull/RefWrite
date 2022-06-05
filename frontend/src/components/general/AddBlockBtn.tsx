import { useState } from 'react';
import { prompt } from '../../global.types';

import AddBlock from '../../assets/img/add_block_icon.svg';

const AddBlockBtn = (props: {
  availablePrompts: prompt[];
  cb: Function;
}): JSX.Element => {
  const [openPopup, setOpenPopup] = useState(false);

  function onClose(identifier: string) {
    setOpenPopup(false);
    props.cb(identifier);
  }

  return (
    <div className="add-block">
      <div
        className="btn primary add-block-btn"
        onClick={() => setOpenPopup(true)}
      >
        <img src={AddBlock} alt="Add button" />
        Add block
      </div>
      {openPopup ? (
        <div className="popup">
          <div id="arrow" />
          <div id="close-btn" onClick={() => setOpenPopup(false)}>
            X
          </div>
          <ul>
            {props.availablePrompts.length > 0
              ? props.availablePrompts.map((prompt: prompt) => (
                  <li
                    key={prompt.identifier}
                    onClick={() => onClose(prompt.identifier)}
                  >
                    {prompt.title}
                  </li>
                ))
              : ''}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AddBlockBtn;
