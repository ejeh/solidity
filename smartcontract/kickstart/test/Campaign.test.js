const assert = require("assert");
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

    await factory.methoods.createCampaign('100')
    .send({
        from: accounts[0],
        gas: '1000000'
    });
    
    [campaignAddress] = await factory.methods.getDeployedCampaign().call();

    campaign = await web3.eth.Contract(JSON.parse(conpiledCampaign.interface),
    campaignAddress
    );

    describe('Campaign', () =>{
        it('deploys a campaign', () =>{
            assert.ok(factory.methods.address);
            assert.ok(campaign.methods.address);
        });
    });
});
