import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  web3: Web3;
  contract: Contract;
  call: any;
  abi: any = require('../../../build/contracts/TicketMarketplace.json').abi;

  constructor() {
    this.web3 = new Web3(window.ethereum);
    window?.ethereum?.enable().catch((err: any) => {
      console.error('User denied account access', err);
    });

    this.contract = new this.web3.eth.Contract(
      this.abi,
      '0x8d765e067bA5bF6596cAAB559567a0080cDa7aE8'
    );
    this.call = this.contract.methods;
  }

  // initContract(address: any) {
  //   this.web3 = new Web3(window.ethereum);
  //   window.ethereum.enable().catch((err: any) => {
  //     console.error('User denied account access', err);
  //   });

  //   this.contract = new this.web3.eth.Contract(
  //     this.abi,
  //     '0x38af30f67A6C1ce290e426C450a17b2fD9cE36A6'
  //   );
  //   this.call = this.contract.methods;
  // }

  async createTicket(
    title: string,
    tags: string,
    date: string,
    description: string,
    targetAddress: string
  ): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .createTicket(title, tags, date, description, targetAddress)
      .send({ from: accounts[0] });
  }

  async cancelTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .cancelTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async startTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .startTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async expertFinishTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .expertFinishTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async customerDoneTicket(ticketIndex: number, rate: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .customerDoneTicket(ticketIndex, rate)
      .send({ from: accounts[0] });
  }

  async getTicketsByAddress(addressString: string): Promise<any> {
    return this.contract.methods.getTicketsByAddress(addressString).call();
  }

  async getYourRequestTicket(addressString: string): Promise<any> {
    return this.contract.methods.getTicketsByAddress(addressString).call();
  }
}
