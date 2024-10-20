import crowdFunding from "./CrowdFunding.json";

export const CrowdFundingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const CrowdFundingABI = crowdFunding.abi;

const networks = {
    localhost: {
        chainId: `0x${Number(31337).toString(16)}`,
        chainName: "localhost",
        nativeCurrency: {
            name: "GO",
            symbol: "GO",
            decimals: 18
        },
        rpcUrls: ["http://127.0.0.1:8545/"],
        blockExplorerUrls: ["https://bscscan.com/"]
    }
}

const changeNetwork = async ({ networkName }) => {
    const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } = networks[networkName];
    console.log(networks[networkName])
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId,
            chainName,
            nativeCurrency,
            rpcUrls,
            blockExplorerUrls
        }]
    });
}


export const handleNetworkSwitch = async () => {
    const networkName = "localhost";
    await changeNetwork({ networkName });
}