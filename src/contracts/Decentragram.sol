pragma solidity ^0.5.0;

contract Decentragram {
  string public name;
  uint public imageCount = 0;
  mapping(address => uint) public followCount;
  mapping(uint => Image) public images;
  mapping(address => mapping(uint => bool)) public likeRegistry;
  mapping(address => mapping(uint => address)) public followRegistry;

  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
    string postType;
    uint like;
    bool viewStatus;
    uint256 createAt; 
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author,
    string postType,
    uint like,
    bool viewStatus,
    uint256 createAt
  );

  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author,
    string postType,
    uint like,
    bool viewStatus,
    uint256 createAt
  );

  event ImageLiked(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author,
    string postType,
    uint like,
    bool viewStatus,
    uint256 createAt
  );

  event ImageUnliked(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author,
    string postType,
    uint like,
    bool viewStatus,
    uint256 createAt
  );

  constructor() public {
    name = "Decentragram";
  }

  function uploadImage(string memory _imgHash, string memory _description,string memory _type) public {
    // Make sure the image hash exists
    require(bytes(_imgHash).length > 0);
    // Make sure image description exists
    require(bytes(_description).length > 0);
    // Make sure post type exists
    require(bytes(_type).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment image id
    imageCount ++;

    // Add Image to the contract
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender, _type, 0, true, now);
    // Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender, _type, 0, true, now);
  }

  function tipImageOwner(uint _id) public payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= imageCount);
    // Fetch the image
    Image memory _image = images[_id];
    // Fetch the author
    address payable _author = _image.author;
    // Pay the author by sending them Ether
    address(_author).transfer(msg.value);
    // Increment the tip amount
    _image.tipAmount = _image.tipAmount + msg.value;
    // Update the image
    images[_id] = _image;
    // Trigger an event
    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author, _image.postType, _image.like, _image.viewStatus, _image.createAt);
  }

  function likeImage(uint _id) public {
    require(_id > 0 && _id <= imageCount);
    Image memory _image = images[_id];
    address _voter = msg.sender;
    require (likeRegistry[_voter][_id] == false, "Voter has like this post");
    // Increment the like amount
    _image.like = _image.like + 1;
    likeRegistry[_voter][_id] = true;
    // Update the image
    images[_id] = _image;
    // Trigger an event
    //emit ImageLiked(_id, _image.hash, _image.description, _image.tipAmount, msg.sender, _image.postType, _image.like);
  }

  function unlikeImage(uint _id) public {
    // Make sure the id is valid
    require(_id > 0 && _id <= imageCount);
    // Fetch the image
    Image memory _image = images[_id];
    //Address of voter
    address _voter = msg.sender;
    require (likeRegistry[_voter][_id] == true, "Voter has not like this post");
    // Increment the like amount
    _image.like = _image.like - 1;
    likeRegistry[_voter][_id] = false;
    // Update the image
    images[_id] = _image;
    // Trigger an event
    // emit ImageUnliked(_id, _image.hash, _image.description, _image.tipAmount, msg.sender, _image.postType, _image.like, _image.viewStatus);
  }

  function privateImage(uint _id) public {
    require(_id > 0 && _id <= imageCount);
    Image memory _image = images[_id];
    // Private image
    require(_image.author == msg.sender, "Permission denied");
    if(_image.viewStatus == true){
      _image.viewStatus = false;
    }else{
      _image.viewStatus = true;
    }
    // Update the image
    images[_id] = _image;
  }

  function follow(address payable _follow) public {
    address _follower = msg.sender;
    for(uint i = 1; i <= followCount[_follower]; i++){
      require (followRegistry[_follower][i] != _follow, "Follower has follow this address");
    }
    followCount[_follower]++;
    followRegistry[_follower][followCount[_follower]] = _follow;
  }
}
