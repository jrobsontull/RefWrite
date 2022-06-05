import TextareaAutosize from 'react-textarea-autosize';
import { prompt } from '../../global.types';

function GenerationBlock(props: { prompt: prompt; cb: Function }): JSX.Element {
  return (
    <li key={props.prompt.uniqueId}>
      <h3 className="title">{props.prompt.title}</h3>
      {!props.prompt.auto ? (
        <p className="description">{props.prompt.description}</p>
      ) : (
        <div className="auto-output">
          <p>Text is generated automatically with the generate button.</p>
          <div className="btns">
            <div className="generate-btn">AI Generate</div>
            <div className="undo-btn">Undo</div>
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
            <div className="generate-btn">AI Generate</div>
            <div className="undo-btn">Undo</div>
          </div>
        </div>
      ) : (
        ''
      )}
      <TextareaAutosize
        className="output"
        minRows={3}
        onChange={(e) => props.cb(props.prompt.uniqueId, e.target.value)}
        placeholder="Press generate to see what happens."
      ></TextareaAutosize>
    </li>
  );
}

export default GenerationBlock;
