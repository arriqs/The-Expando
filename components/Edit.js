import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { makeStyles } from '@material-ui/core/styles';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';

const useStyles = makeStyles((theme) => ({
    wrapperClass: {
      padding: 1 + 'rem',
      border: 1 + 'px solid #ccc',
    },
    editorClass: {
      backgroundColor: 'lightgray',
      padding: 1 + 'rem',
      border: 1 + 'px solid #ccc',
    },
    toolbarClass: {
      border: 1 + 'px solid #ccc',
    }
  }));

const App = () => {
  // Styles
  const classes = useStyles();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        Edit Your Text Below
      </header>
      <br />
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={classes.wrapperClass}
        editorClassName={classes.editorClass}
        toolbarClassName={classes.toolbarClass}
        />

      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    
    </div>
  )
}
export default App;