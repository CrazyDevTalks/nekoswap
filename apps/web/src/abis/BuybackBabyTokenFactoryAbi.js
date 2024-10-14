const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalSupply_",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "rewardToken_",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "router_",
                "type": "address"
            }, {
                "internalType": "uint256[5]",
                "name": "feeSettings_",
                "type": "uint256[5]"
            }
        ],
        "name": "create",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
]

export default abi;
