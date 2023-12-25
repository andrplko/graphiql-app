import { EditorView } from '@codemirror/view';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Loader from '../Loader';
import styles from './GraphqlExplorer.module.scss';

interface GraphqlExplorerProps extends ReactCodeMirrorProps {
  loading?: boolean;
}

const myTheme = EditorView.theme({
  '.cm-gutters': {
    borderRight: 'none',
  },
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
});

const GraphqlExplorer = ({ loading, ...props }: GraphqlExplorerProps) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <CodeMirror
        height="400px"
        theme={githubLight}
        extensions={[javascript({ jsx: true }), myTheme]}
        basicSetup={{
          autocompletion: false,
        }}
        className={styles.explorer}
        {...props}
      />
    </div>
  );
};

export default GraphqlExplorer;
