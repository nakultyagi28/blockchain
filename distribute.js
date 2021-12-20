

let fs = require("fs");

let BigNumber = require("big-number")

let method = require('./method.js');
let contract = require('./contract.js');


require('dotenv').config()


infuraToken = process.env.INFURA_TOKEN
contractAddress = process.env.CONTRACT_ADDRESS
ownerAddress = process.env.OWNER_ADDRESS
privateKey = Buffer.from(process.env.SUPER_SECRET_PRIVATE_KEY, 'hex')

const distribute = async() => {
    
    let distributionAddresses = fs.readFileSync('./accounts.txt', 'utf8').split('\n');

    console.log(`distro addresses are: ${ distributionAddresses}`);

    
    let ownerBalance = await contract.getBalanceOfAccount(ownerAddress);
    let ob = new BigNumber(ownerBalance);
    console.log(`owner balance is ${ob}`);


    
    let tokenSymbol = await contract.getSymbol();
    console.log(`symbol is ${tokenSymbol}`);

    
    let fivePerCent = ob.div(20);
    console.log(`five per cent of owner balance is ${fivePerCent}`);

    
    let numberOfAddresses = distributionAddresses.length;
    console.log(`number of addresses in file is ${numberOfAddresses}`);

    
    let distributionAmount = fivePerCent.div(numberOfAddresses)
    console.log(`distribution amount per address is ${distributionAmount}`);

    for (looper = 0; looper < numberOfAddresses; looper++) {
        console.log(`about to distribute ${tokenSymbol}, ${distributionAmount} tokens go to ${distributionAddresses[looper]}`)
        
        let retval = await method.transferToken(distributionAddresses[looper], distributionAmount)
    }
    

}

distribute()
