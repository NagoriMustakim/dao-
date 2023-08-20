// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoDevsNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string private baseURI; //ipfs/bafybeifmh3qjnfyw5l2tatw5sjj2jkytc4aedotuqbco3ai3goak4jkwty/
    string public baseExtension = ".json";
    uint256 public maxNft = 50;

    // Initialize the ERC-721 contract
    constructor(string memory _initBaseURI) ERC721("Gang Of Wassepur", "GOW") {
        baseURI = _initBaseURI;
    }
     // Have a public mint function anyone can call to get an NFT
    function mint() public {
        require(totalSupply()< maxNft, "All NFT is minted");
        _safeMint(msg.sender, totalSupply());
    } 

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        Strings.toString(tokenId),
                        baseExtension
                    )
                )
                : "";
    }
}
