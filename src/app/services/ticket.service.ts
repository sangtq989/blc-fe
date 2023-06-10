import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  call: any;
  abi: any = require('../../../build/contracts/TicketMarketplace.json').abi;

  constructor(private web3: Web3, private contract: Contract) {}

  initContract(address: any) {
    this.web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch((err: any) => {
      console.error('User denied account access', err);
    });

    this.contract = new this.web3.eth.Contract(this.abi, address);
    this.call = this.contract.methods;
  }

  async createTicket(description: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .createTicket(description)
      .send({ from: accounts[0] });
  }

  async assignWorker(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .assignWorker(ticketIndex)
      .send({ from: accounts[0] });
  }

  async startTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .startTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async finishTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .finishTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async getTickets(): Promise<any> {
    return this.contract.methods.getTickets().call();
  }
}
