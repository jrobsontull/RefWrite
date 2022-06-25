import { prompt, generalOpts } from '../../global.types';
import { useState } from 'react';

import { TextareaUL } from 'react-textarea-list';
import TextareaAutosize from 'react-textarea-autosize';
import GenerateAPI from '../../utils/generate.api';

function GenerationBlock(props: {
  prompt: prompt;
  updateOutput: Function;
  generalOpts: generalOpts;
}): JSX.Element {
  const [outputText, setOutputText] = useState('');

  // Generate text with generate API
  const generateRequest = async (): Promise<string | null> => {
    return GenerateAPI.generate(
      props.prompt.identifier,
      props.generalOpts
    ).then((response) => {
      if (!response) {
        // Error handling
        return null;
      } else if (
        Object.prototype.hasOwnProperty.call(response, "'error'") ||
        Object.prototype.hasOwnProperty.call(response, 'error')
      ) {
        console.log('An error occurred: ' + response.error);
        return null;
      } else {
        return response.result;
      }
    });
  };

  // Handle output textarea change events
  const updateOutputTextarea = (newVal: string) => {
    setOutputText(newVal); // set state
    props.updateOutput(props.prompt.uniqueId, newVal); // bubble this up
  };

  // Handle submit button
  const aiGenerateSubmit = async () => {
    const generatedText = await generateRequest();
    if (generatedText) {
      updateOutputTextarea(generatedText);
    } else {
      console.log('An error occurred.');
    }
  };

  return (
    <li key={props.prompt.uniqueId}>
      <h3 className="title">{props.prompt.title}</h3>
      {!props.prompt.auto ? (
        <p className="description">{props.prompt.description}</p>
      ) : (
        <div className="auto-output">
          <p>Text is generated automatically with the generate button.</p>
          <div className="btns">
            <div
              className="generate-btn noselect"
              onClick={() => aiGenerateSubmit()}
            >
              AI Generate
            </div>
            <div className="undo-btn noselect">Undo</div>
          </div>
        </div>
      )}
      {!props.prompt.auto ? (
        <TextareaAutosize
          className="prompt-params"
          minRows={3}
          placeholder={props.prompt.placeholder + '...'}
        ></TextareaAutosize>
      ) : (
        ''
      )}
      {!props.prompt.auto ? (
        <div className="custom-output">
          <p>Output:</p>
          <div className="btns">
            <div
              className="generate-btn noselect"
              onClick={() => aiGenerateSubmit()}
            >
              AI Generate
            </div>
            <div className="undo-btn noselect">Undo</div>
          </div>
        </div>
      ) : (
        ''
      )}
      <TextareaAutosize
        className="output"
        minRows={3}
        onChange={(e) => updateOutputTextarea(e.target.value)}
        value={outputText}
        placeholder="Press generate to see what happens."
      ></TextareaAutosize>
    </li>
  );
}

export default GenerationBlock;
