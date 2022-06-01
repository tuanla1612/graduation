import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

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
              { this.props.images.map((image, key) => {
                return(
                  <div>
                  {image.viewStatus == true && <div className="card mb-4" key={key} >
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
                        {this.props.account != image.author && <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          Support 0.1 ETH
                        </button>}
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Like: {image.like}
                        </small>
                        
                        {this.props.likeRegistry[image.id] == true && <button
                          className="btn btn-link btn-sm float-left pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.unlikeImage(event.target.name)
                          }}
                        >
                          Unlike
                        </button>}

                        {this.props.likeRegistry[image.id] == false && <button
                          className="btn btn-link btn-sm float-left pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.likeImage(event.target.name)
                          }}
                        >
                          Like
                        </button>}

                        {this.props.account != image.author && this.props.followRegistry.includes(image.author) == false && <button
                          className="btn btn-link btn-sm float-left pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.follow(image.author)
                          }}
                        >
                          Follow
                        </button>}

                        {this.props.account != image.author && this.props.followRegistry.includes(image.author) == true && <button
                          className="btn btn-link btn-sm float-left pt-0"
                          name={image.id}
                          onClick={(event) => {
                            this.props.follow(image.author)
                          }}
                        >
                          Unfollow
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

export default Main;