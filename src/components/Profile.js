import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Post from './Feed/Post/Post';

class Profile extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
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
              <Post 
                key='2'
                message='WOW this works!'
                timestamp='This is a timestamp'
                username='devarif'
            />
              { this.props.images.map((image, key) => {
                return(
                <div>
                  {image.author == this.props.account && <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{image.description}</p>
                        {image.postType == 'image' && <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>}
                        {image.postType == 'video' && <p class="text-center"><video controls src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>}
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Supported: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Like: {image.like}
                        </small>
                       
                        {image.viewStatus == true && <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.privateImage(event.target.name)
                          }}
                        >
                          Private image
                        </button>}

                        {image.viewStatus == false && <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.privateImage(event.target.name)
                          }}
                        >
                          Public image
                        </button>}
                      </li>
                    </ul>
                  </div>}
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