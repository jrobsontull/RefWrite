import { useState } from 'react';
import Header from '../general/Header';

const Create = () => {
  // Form states
  const [openSimpleGenerate, setOpenSimpleOpts] = useState(false);
  const [openCustomGenerate, setOpenCustomOpts] = useState(false);

  // Store for preview window
  const [preview, setPreview] = useState([]);

  // Toggle openning of prompt windows
  const toggleOptsDialog: Function = (openGen: string) => {
    if (openGen === 'simple' && !openSimpleGenerate) {
      // Open simple options
      if (openCustomGenerate) {
        setOpenCustomOpts(false);
      }
      setOpenSimpleOpts(true);
    } else if (openGen === 'custom' && !openCustomGenerate) {
      // Open custom options
      if (openSimpleGenerate) {
        setOpenSimpleOpts(false);
      }
      setOpenCustomOpts(true);
    }
  };

  return (
    <div className="create-page">
      <Header />
      <div className="content">
        <div className="left">
          <input
            type="text"
            className="title"
            placeholder="Write reference title here..."
          />
          <div className="box general-options">
            <p className="description">
              Use this section to fill out general information about the
              reference. We need the name of the person you are writing the
              reference for, the organisation they worked for and your
              relationship with them.
            </p>
            <div className="input-row">
              <input type="text" placeholder="First name" id="firstName" />
              <input type="text" placeholder="Job" id="job" />
            </div>
            <div className="input-row">
              <input type="text" placeholder="Relationship" id="relationship" />
              <input type="text" placeholder="Organisation" id="organisation" />
            </div>
          </div>
          <div className="box generation-settings">
            <h3>Which mode would you like to use?</h3>
            <div className="btn-row">
              <div
                className={
                  openSimpleGenerate ? 'btn primary selected' : 'btn primary'
                }
                id="simple"
                onClick={() => toggleOptsDialog('simple')}
              >
                Simple
              </div>
              <div
                className={
                  openCustomGenerate ? 'btn primary selected' : 'btn primary'
                }
                id="custom"
                onClick={() => toggleOptsDialog('custom')}
              >
                Custom
              </div>
            </div>
            {openSimpleGenerate ? (
              <div className="simple-opts">
                <select className="reference-type">
                  <option
                    value="default"
                    className="disabled"
                    disabled
                    selected
                    hidden
                  >
                    Select type of reference
                  </option>
                  <option value="generic">Generic reference</option>
                  <option value="character">Character reference</option>
                  <option value="academic">Academic reference</option>
                </select>
                <div className="btn primary generate">Generate</div>
              </div>
            ) : (
              ''
            )}
          </div>
          {openSimpleGenerate ? <div className="box"></div> : ''}
          {openCustomGenerate ? <div className="box"></div> : ''}
        </div>

        <div className="right">
          <div className="action-btns">
            <div className="btn primary" id="save-changes">
              Save changes
            </div>
            <div className="btn primary" id="download-pdf">
              Download PDF
            </div>
          </div>
          <div className="preview-pane">
            {preview.length > 0 ? (
              <div className="preview">
                <p>To whom it may concern,</p>
                {preview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p>Kind regards,</p>
                <p>John Doe</p>
              </div>
            ) : (
              <div className="preview">
                <h2>Preview Window</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
