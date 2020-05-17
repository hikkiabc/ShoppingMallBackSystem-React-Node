import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './pictureswallcss.css'
import request from '../../network/network'
// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }
const baseUrl = 'http://localhost:3000/public/'
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [

    ],
  };
  componentDidMount() {
    console.log(this.props);

    this.setState({
      fileList: this.props.imgs.map((i, index) => {
        return { uid: -index, filename: i, status: 'done', url: baseUrl + i }
      })
    })
  }
  handleCancel = () => this.setState({ previewVisible: false });
  removeimg = async (file) => {

    let data = await request('/product/deleimg', { filename: file.response.filename }, 'post')


  }
  getPics = () => {
    console.log(this.state.fileList);

    const data = this.state.fileList.map(i => i.response ? i.response.filename : i.filename)
    return data
  }
  handlePreview = async file => {

    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    this.setState({
      previewImage: file.response.url,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ file, fileList }) => {

    // if (file.response) {
    //   file.url = file.response.url
    // }
    this.setState({ fileList });


  }
  render() {


    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/product/upload"
          listType="picture-card"
          fileList={fileList}
          name='img'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.removeimg}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img className='pwimg' alt="example" style={{ height: '100%', width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}