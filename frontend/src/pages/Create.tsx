import { useState, useEffect, ChangeEvent } from 'react';
import Header from '../components/Header';
import GenerateAPI from '../utils/generate.api';
import { v4 as uuid } from 'uuid';

// Types
import { prompt, generalOpts } from '../global.types';

// Components
import AddBlockBtn from '../components/AddBlockBtn';
import GenerationBlock from '../components/GenerationBlock';

const Create = (): JSX.Element => {
  // Available prompts
  const [prompts, setPrompts] = useState<prompt[]>([]);

  // Reference general settings
  const [generalOpts, setGeneralOpts] = useState<generalOpts>({
    firstName: '',
    job: '',
    relationship: '',
    organisation: '',
  });

  // Form states
  const [openSimpleOpts, setOpenSimpleOpts] = useState<boolean>(false);
  const [openCustomGenerate, setOpenCustomGenerate] = useState<boolean>(false);
  const [openSimpleGenerate, setOpenSimpleGenerate] = useState<boolean>(false);
  const [promptsInUse, setPromptsInUse] = useState<any[]>([]);

  // Set general reference options
  const updateGeneralOpts: Function = (
    type: string,
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const newValue: string = event.target.value;
    setGeneralOpts((prevOpts) => ({ ...prevOpts, [type]: newValue }));
  };

  // Toggle openning of prompt panels
  const toggleOptsDialog: Function = (openGen: string): void => {
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
  const generateSimple = (): void => {
    openSimplePrompts();
  };

  // For opening the simple generate panel
  const openSimplePrompts = (): void => {
    setOpenSimpleGenerate(true);
  };

  // Add custom block
  const addCustomBlock = (identifier: string): void => {
    let selectedPrompt: prompt | undefined = prompts.find(
      (prompt: prompt) => prompt.identifier === identifier
    );

    if (selectedPrompt) {
      selectedPrompt.uniqueId = uuid();
      setPromptsInUse((current) => [...current, selectedPrompt]);
    }
  };

  // On custom block ouput update
  const updateOutput = (promptId: string, newOuput: string) => {
    let foundIndex: number | null = null;
    promptsInUse.forEach(function (prompt: prompt, i: number) {
      if (prompt.uniqueId === promptId) {
        foundIndex = i;
        return;
      }
    });

    if (foundIndex || foundIndex === 0) {
      let updatedPromptsInUse: prompt[] = [...promptsInUse]; // shallow copy
      let updatedPrompt: prompt = { ...updatedPromptsInUse[foundIndex] }; // get element for mutation
      updatedPrompt.output = newOuput; // update output text
      updatedPromptsInUse[foundIndex] = updatedPrompt;
      setPromptsInUse(updatedPromptsInUse);
    }
  };

  useEffect(() => {
    GenerateAPI.getCurrentPrompts().then((response) => {
      if (!response) {
        console.log('Do some error handling here.');
      } else if (
        Object.prototype.hasOwnProperty.call(response, "'error'") ||
        Object.prototype.hasOwnProperty.call(response, 'error')
      ) {
        console.log('An error occurred: ' + response.error);
      } else if (response.prompts) {
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
              <input
                type="text"
                placeholder="First name"
                id="firstName"
                onChange={(e) => updateGeneralOpts('firstName', e)}
              />
              <input
                type="text"
                placeholder="Job"
                id="job"
                onChange={(e) => updateGeneralOpts('job', e)}
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                placeholder="Relationship"
                id="relationship"
                onChange={(e) => updateGeneralOpts('relationship', e)}
              />
              <input
                type="text"
                placeholder="Organisation"
                id="organisation"
                onChange={(e) => updateGeneralOpts('organisation', e)}
              />
            </div>
          </div>
          <div className="box generation-settings">
            <h3>Which mode would you like to use?</h3>
            <div className="btn-row">
              <div
                className={
                  openSimpleOpts
                    ? 'btn primary selected noselect'
                    : 'btn primary noselect'
                }
                id="simple"
                onClick={() => toggleOptsDialog('simple')}
              >
                Simple
              </div>
              <div
                className={
                  openCustomGenerate
                    ? 'btn primary selected noselect'
                    : 'btn primary noselect'
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
                  className="btn primary generate noselect"
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
            <div className="box prompts">
              {promptsInUse.length > 0 ? (
                <ul className="current-prompts">
                  {promptsInUse.map((prompt: prompt) => (
                    <GenerationBlock
                      key={prompt.uniqueId}
                      prompt={prompt}
                      updateOutput={updateOutput}
                      generalOpts={generalOpts}
                    />
                  ))}
                </ul>
              ) : (
                ''
              )}

              <AddBlockBtn availablePrompts={prompts} cb={addCustomBlock} />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="right">
          <div className="action-btns">
            <div className="btn primary noselect" id="save-changes">
              Save changes
            </div>
            <div className="btn primary noselect" id="download-pdf">
              Download PDF
            </div>
          </div>
          <div className="preview-pane">
            {promptsInUse.length > 0 ? (
              <div className="preview">
                <p>To whom it may concern,</p>
                {promptsInUse.map((prompt) =>
                  prompt.output ? (
                    <p key={prompt.uniqueId}>{prompt.output}</p>
                  ) : (
                    <p className="placeholder" key={prompt.uniqueId}>
                      {prompt.title} output...
                    </p>
                  )
                )}
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
