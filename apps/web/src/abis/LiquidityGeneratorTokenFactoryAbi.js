const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalSupply",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "router",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "charity",
                "type": "address"
            }, {
                "internalType": "uint16",
                "name": "taxFeeBps",
                "type": "uint16"
            }, {
                "internalType": "uint16",
                "name": "liquidityFeeBps",
                "type": "uint16"
            }, {
                "internalType": "uint16",
                "name": "charityBps",
                "type": "uint16"
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