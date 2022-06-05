import TextareaAutosize from 'react-textarea-autosize';
import { prompt } from '../../global.types';

function GenerationBlock(props: { prompt: prompt; cb: Function }): JSX.Element {
  return (
    <li key={props.prompt.uniqueId}>
      <h3 className="title">{props.prompt.title}</h3>
      {!props.prompt.auto ? (
        <p className="description">{props.prompt.description}</p>
      ) : (
        ''
      )}
      {!props.prompt.auto ? (
        <TextareaAutosize
          className="prompt-params"
          minRows={3}
        ></TextareaAutosize>
      ) : (
        ''
      )}
      {!props.prompt.auto ? <p className="output-title">Output:</p> : ''}
      <TextareaAutosize
        className="output"
        minRows={3}
        onChange={(e) => props.cb(props.prompt.uniqueId, e.target.value)}
      ></TextareaAutosize>
    </li>
  );
}

export default GenerationBlock;
