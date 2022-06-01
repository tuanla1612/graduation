import Decentragram from '../abis/Decentragram.json';
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Main from './Main';
import Header from './Header/Header';
import Web3 from 'web3';
import './App.css';
import Profile from './Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if(networkData) {
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({ decentragram })
      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({ imagesCount })
      const followCount = await decentragram.methods.followCount(this.state.account).call()
      this.setState({ followCount : followCount })
      //Load like
      var likeRegistry = [];
      for (var i = 1; i <= imagesCount; i++) {
        likeRegistry[i] = await decentragram.methods.likeRegistry(this.state.account,i).call()
      }
      this.setState({ likeRegistry: likeRegistry })
      //Load followers
      var followRegistry = [];
     for (var i = 1; i <= followCount; i++) {
        followRegistry[i] = await decentragram.methods.followRegistry(this.state.account,i).call()
      }
      console.log(followRegistry)
      console.log(followCount)
      this.setState({ followRegistry: followRegistry })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await decentragram.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      console.log(this.state.images)
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    const type = file.type.split("/")
    this.setState({ type: type[0] })

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    if(this.state.buffer == undefined){
      this.setState({ loading: true })
      this.state.decentragram.methods.uploadImage("abc", description, "text").send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    }else{
      console.log("Submitting file to ipfs...")
      //adding file to the IPFS
      ipfs.add(this.state.buffer, (error, result) => {
        console.log('Ipfs result', result)
        if(error) {
          console.error(error)
          return
        }

        this.setState({ loading: true })
        if(this.state.type == "image"){
          this.state.decentragram.methods.uploadImage(result[0].hash, description, "image").send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        }else if(this.state.type == "video"){
          this.state.decentragram.methods.uploadImage(result[0].hash, description, "video").send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        }  
      })
    }
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  privateImage(id){
    this.setState({ loading: true })
    this.state.decentragram.methods.privateImage(id).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  likeImage(id){
    this.setState({ loading: true })
    this.state.decentragram.methods.likeImage(id).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  unlikeImage(id){
    this.setState({ loading: true })
    this.state.decentragram.methods.unlikeImage(id).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  follow(follow){
    this.setState({ loading: true })
    this.state.decentragram.methods.follow(follow).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.privateImage = this.privateImage.bind(this)
    this.likeImage = this.likeImage.bind(this)
    this.unlikeImage = this.unlikeImage.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.follow = this.follow.bind(this)
  }

  render() {
    return (
      <div>
        {/* <Navbar account={this.state.account} /> */}
        <Header account={this.state.account}/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
            { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              images={this.state.images}
              likeRegistry={this.state.likeRegistry}
              followRegistry={this.state.followRegistry}
              account={this.state.account}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
              likeImage={this.likeImage}
              unlikeImage={this.unlikeImage}
              follow={this.follow}
            />
        }
            </Route>
          </Switch>
          
          <Switch>
            <Route path="/profile">
            { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Profile
              images={this.state.images}
              likeRegistry={this.state.likeRegistry}
              followRegistry={this.state.followRegistry}
              account={this.state.account}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
              privateImage={this.privateImage}
              likeImage={this.likeImage}
              unlikeImage={this.unlikeImage}
            />
        }
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;