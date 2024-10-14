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
                "internalType": "address[4]",
                "name": "addrs",
                "type": "address[4]"
            }, {
                "internalType": "uint256[3]",
                "name": "feeSettings",
                "type": "uint256[3]"
            }, {
                "internalType": "uint256",
                "name": "minimumTokenBalanceForDividends_",
                "type": "uint256"
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
