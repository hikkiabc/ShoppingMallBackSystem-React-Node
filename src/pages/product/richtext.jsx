import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

export default class RichText extends Component {
  constructor(props) {
    super(props);
    const html = this.props.detail
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  state = {
    editorState: EditorState.createEmpty(),
  }
  componentDidMount() {
    // this.props.change(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
  }
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/product/upload');

        const data = new FormData();
        data.append('img', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);

          resolve({ data: { link: response.url } });
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  onEditorStateChange = (editorState) => {

    this.props.change(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))

    this.setState({
      editorState,
    });
  };
  getcontent = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  render() {

    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />

      </div>
    );
  }
}