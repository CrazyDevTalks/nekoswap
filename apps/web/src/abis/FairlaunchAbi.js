const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sale_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_base_token",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "presale_in_native",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_buyback",
                "type": "uint256"
            }, {
                "internalType": "bool",
                "name": "_whitelist",
                "type": "bool"
            }, {
                "internalType": "uint256",
                "name": "_selling_amount",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_softcap",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_liquidityPercent",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_presale_start",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "_presale_end",
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
    },
]

export default abi;