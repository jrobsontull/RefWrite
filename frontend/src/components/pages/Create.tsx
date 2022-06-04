import { useState, useEffect } from 'react';
import Header from '../general/Header';
import GenerateAPI from '../../utils/generate.api';

import AddBlock from '../../assets/img/add_block_icon.svg';
import { AxiosResponse } from 'axios';
import { prompt } from '../../global.types';

const Create = () => {
  // Available prompts
  const [prompts, setPrompts] = useState([]);

  // Form states
  const [openSimpleOpts, setOpenSimpleOpts] = useState(false);
  const [openCustomGenerate, setOpenCustomGenerate] = useState(false);
  const [openSimpleGenerate, setOpenSimpleGenerate] = useState(false);
  const [openAddBlockMenu, setOpenAddBlockMenu] = useState(false);
  const [promptsInUse, setPromptsInUse] = useState([]);

  // Store for preview panel
  const [preview, setPreview] = useState([]);

  // Toggle openning of prompt panels
  const toggleOptsDialog: Function = (openGen: string) => {
    if (openGen === 'simple' && !openSimpleOpts) {
      // Open simple options
      if (openCustomGenerate) {
        setOpenCustomGenerate(false);
      }
      setOpenSimpleOpts(true);
    } else if (openGen === 'custom' && !openCustomGenerate) {
      // Open custom options
      if (openSimpleOpts) {
        setOpenSimpleOpts(false);
        setOpenSimpleGenerate(false);
      }
      setOpenCustomGenerate(true);
    }
  };

  // For generating a reference from the simple options
  function generateSimple() {
    openSimplePrompts();
  }

  // For opening the simple generate panel
  function openSimplePrompts() {
    setOpenSimpleGenerate(true);
  }

  // Add custom block
  function addCustomBlock(identifier: string) {
    setOpenAddBlockMenu(false);
    const selectedPrompt: prompt | undefined = prompts.find(
      (prompt: prompt) => prompt.identifier === identifier
    );
    if (selectedPrompt) {
      setPromptsInUse((current) => [...current, selectedPrompt]);
    }
  }

  useEffect(() => {
    GenerateAPI.getCurrentPrompts().then((response) => {
      if (
        Object.prototype.hasOwnProperty.call(response, "'error'") ||
        Object.prototype.hasOwnProperty.call(response, 'error')
      ) {
        console.log('An error occurred: ' + response.error);
      } else {
        setPrompts(response.prompts);
      }
    });
  }, []);

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
                  openSimpleOpts ? 'btn primary selected' : 'btn primary'
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
            {openSimpleOpts ? (
              <div className="simple-opts">
                <select className="reference-type" defaultValue="default">
                  <option value="default" className="disabled" disabled hidden>
                    Select type of reference
                  </option>
                  <option value="generic">Generic reference</option>
                  <option value="character">Character reference</option>
                  <option value="academic">Academic reference</option>
                </select>
                <div
                  className="btn primary generate"
                  onClick={() => generateSimple()}
                >
                  Generate
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          {openSimpleGenerate ? <div className="box"></div> : ''}
          {openCustomGenerate ? (
            <div className="box custom-prompts">
              {promptsInUse.length > 0 ? (
                <ul className="current-prompts">
                  {promptsInUse.map((prompt: prompt) => (
                    <li key={prompt.identifier}>
                      <h3 className="title">{prompt.title}</h3>
                      {!prompt.auto ? (
                        <p className="description">{prompt.description}</p>
                      ) : (
                        ''
                      )}
                      {!prompt.auto ? (
                        <textarea className="prompt-params"></textarea>
                      ) : (
                        ''
                      )}
                      {!prompt.auto ? (
                        <p className="output-title">Output:</p>
                      ) : (
                        ''
                      )}
                      <textarea className="output"></textarea>
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}

              <div className="add-block-and-menu">
                <div
                  className="btn primary add-block"
                  onClick={() => setOpenAddBlockMenu(true)}
                >
                  <img src={AddBlock} alt="Add button" />
                  Add block
                </div>
                {openAddBlockMenu ? (
                  <div className="popup">
                    <ul>
                      {prompts.length > 0
                        ? prompts.map((prompt: prompt) => (
                            <li
                              key={prompt.identifier}
                              onClick={() => addCustomBlock(prompt.identifier)}
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
            </div>
          ) : (
            ''
          )}
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
