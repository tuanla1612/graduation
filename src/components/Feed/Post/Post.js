import React, { Component } from 'react';
import './Post.css'
import Identicon from 'identicon.js';

// Icons
import { Avatar } from '@material-ui/core';
import { FaThumbsUp, FaCommentAlt, FaDonate, FaEyeSlash, FaEye } from 'react-icons/fa';

class Post extends Component {

  render() {
    var image = this.props.image;
    return (
        <div className="post">
            <div className="postTop">
                <Avatar src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`} className="postAvatar" />

                <div className="postTopInfo">
                    <small>{image.author}</small>
                    <p>{new Date(image.createAt * 1000).toUTCString()}</p>
                </div>

                {image.tipAmount > 0 && <div className="postTopDonateInfo">
                    <small>
                        Supported: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                    </small>
                </div>}
            </div>

            <div className="postBottom">
                <p>{image.description}</p>
            </div>

            <div className="postImage">
                {image.postType == 'image' && <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '100%'}}/></p>}
                {image.postType == 'video' && <p class="text-center"><video controls src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '100%'}}/></p>}
            </div>

            {image.like > 0 && <div className="postLike">
                <FaThumbsUp color='blue'/>
                <span className='postOptionButton'>{image.like}</span>
            </div>}

            <div className="postOptions">
                {this.props.likeRegistry[image.id] == true && <div className="postOption" name={image.id} 
                    onClick={(event) => {
                        this.props.unlikeImage(image.id)
                  }}>
                        <FaThumbsUp color='blue'/>
                        <span className='postOptionButton'>Like</span>
                </div>}

                {this.props.likeRegistry[image.id] == false && <div className="postOption" name={image.id} 
                    onClick={(event) => {
                        this.props.likeImage(image.id)
                  }}>
                        <FaThumbsUp/>
                        <span className='postOptionButton'>Like</span>
                </div>}

                <div className="postOption" name={image.id} >
                    <FaCommentAlt />
                    <span className='postOptionButton'>Comment</span>
                </div>

                {window.location.pathname != '/profile' && <div className="postOption" name={image.id} 
                    onClick={(event) => {
                    let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                    console.log(image.id, tipAmount)
                    this.props.tipImageOwner(image.id, tipAmount)
                  }}>
                        <FaDonate />
                        <span className='postOptionButton'>Donate</span>
                </div>}

                {window.location.pathname == '/profile' && image.viewStatus == true && <div className="postOption" name={image.id} 
                    onClick={(event) => {
                    this.props.privateImage(image.id)
                  }}>
                        <FaEyeSlash />
                        <span className='postOptionButton'>Private post</span>
                </div>}

                {window.location.pathname == '/profile' && image.viewStatus == false && <div className="postOption" name={image.id} 
                    onClick={(event) => {
                    this.props.privateImage(image.id)
                  }}>
                        <FaEye />
                        <span className='postOptionButton'>Public post</span>
                </div>}
            </div>
        </div>
    );
  }
}

export default Post;
