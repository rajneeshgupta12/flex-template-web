import React from 'react';
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], imagePreviewUrl: [] };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let { imagePreviewUrl, files } = this.state;
    Object.values(e.target.files).forEach((imgFile) => {

      imagePreviewUrl.push(reader.result)
      files.push(imgFile)
      this.setState({
        files,
        imagePreviewUrl
      });
    })
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl.length > 0) {
      $imagePreview = imagePreviewUrl.map((img,index) => {
        return (<img key={index} src={imagePreviewUrl} />);
      })
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            multiple="true"
            onChange={(e) => this._handleImageChange(e)} />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}