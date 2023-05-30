import Web3 from 'web3';


export default async function handler(req, res) {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/_QcENyPliuTsIYt6c_UBvHmGzU0412Gh'));
    let token_address = "0xb510a7c888095068f1ddd8563ef34981b1eb5c72";
    let to_address = "0xdd9DFB70C43A94B5Af845f737bEDE08e9bB231DE";
    let decimals = web3.utils.toBN(18);
    let amount = web3.utils.toBN(100);

    let from_address = "0x608F5346A55215E1054Ef93969e004Ac15c7a255";

    let minABI = [
        // transfer
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "type": "function"
        }
      ];
    
    // @ts-ignore
    let contract = new web3.eth.Contract(minABI, token_address);

    // calculate ERC20 token amount
    let value = amount.mul(web3.utils.toBN(10).pow(decimals));
    // call transfer function
    contract.methods.transfer(to_address, value).send({from: from_address})
    .on('transactionHash', function(hash){
    console.log(hash);
    });
    //return res.status(200);
}
