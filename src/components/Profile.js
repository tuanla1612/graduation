import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Post from './Feed/Post/Post';

class Profile extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Create your post now</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4, .mkv .ogg .wmv" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="What do you thinking right now..."
                        required />
                  </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                  <div>
                  {this.props.account == image.author && <Post 
                    key={key}
                    image = {image}
                    images={this.props.images}
                    likeRegistry={this.props.likeRegistry}
                    followRegistry={this.props.followRegistry}
                    account={this.props.account}
                    captureFile={this.props.captureFile}
                    uploadImage={this.props.uploadImage}
                    tipImageOwner={this.props.tipImageOwner}
                    privateImage={this.props.privateImage}
                    likeImage={this.props.likeImage}
                    unlikeImage={this.props.unlikeImage}
                  />}
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Profile;