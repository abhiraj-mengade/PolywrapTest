// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {

    string[] public dataArray;

    function addToDataArray(string memory _data) public {
        dataArray.push(_data);
    }

    function viewDataArray() public view returns (string[] memory) {
        return dataArray;
    }
}
