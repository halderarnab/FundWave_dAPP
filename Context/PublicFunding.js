import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { PublicFundingABI, PublicFundingAddress } from './context';


const fetchContract = (signerOrProvider) =>
    new ethers.Contract(PublicFundingAddress, PublicFundingABI, signerOrProvider);

export const PublicFundingContext = React.createContext();

export const PublicFundingProvider = ({ children }) => {
    const titleData = "Contract";

    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadlineOfCampaign } = campaign;
        const w3Modal = new Web3Modal();
        const conn = await w3Modal.connect();
        const provider = new ethers.providers.Web3Provider(conn);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log("Current Account", currentAccount);
        console.log("Amount: ", amount);
        console.log("Title: ", title);
        console.log("Description: ", description);
        console.log("Date: ", new Date(deadlineOfCampaign).getTime());
        try {
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadlineOfCampaign).getTime()
            );
            await transaction.wait();
            console.log("Contract Call Success.", transaction);
        } catch (error) {
            console.log(error);
        }
    };


    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const campaigns = await contract.getCampaigns();

        const parsedCamapigns = campaigns.map((campaign, i) => ({
            ownerOfCampaign: campaign.ownerOfCampaign,
            title: campaign.title,
            description: campaign.description,
            targetOfCampaign: ethers.utils.formatEther(campaign.targetOfCampaign.toString()),
            deadlineOfCampaign: campaign.deadlineOfCampaign.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return parsedCamapigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcBatchProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0];
        const filteredCampaigns = allCampaigns.filter((campaign) =>
            campaign.ownerOfCampaign === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            ownerOfCampaign: campaign.ownerOfCampaign,
            title: campaign.title,
            description: campaign.description,
            targetOfCampaign: ethers.utils.formatEther(campaign.targetOfCampaign.toString()),
            deadlineOfCampaign: campaign.deadlineOfCampaign.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return userData;
    };

    const donate = async (pId, amount) => {
        const w3Modal = new Web3Modal();
        const conn = await w3Modal.connect();
        const provider = new ethers.providers.Web3Provider(conn);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcBatchProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }

        return parsedDonations;
    };

    //Check if wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask:");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("Account Not Found.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();

    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                return console.log("Install MetaMask.");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PublicFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations, 
                connectWallet,
            }}
        >
            {children}
        </PublicFundingContext.Provider>
    );
};