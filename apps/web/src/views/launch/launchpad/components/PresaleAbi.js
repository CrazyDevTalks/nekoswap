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
                "internalType": "uint256[2]",
                "name": "_rates",
                "type": "uint256[2]"
            },
            {
                "internalType": "uint256[2]",
                "name": "_raises",
                "type": "uint256[2]"
            },
            {
                "internalType": "uint256",
                "name": "_softcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_hardcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_liquidityPercent",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_presale_start",
                "type": "uint256"
            },
            {
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
    // You'll need to add the getAllPresales function to your ABI
    {
        "inputs": [],
        "name": "getAllPresales",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "tokenAddress",
                        "type": "address"
                    },
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
                        "internalType": "string",
                        "name": "logoUrl",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "softCap",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "hardCap",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentRaised",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct PresaleInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default abi;
