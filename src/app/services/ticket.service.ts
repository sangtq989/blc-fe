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

  async createTicket(title:string, tags: string, description: string, targetAddress: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .createTicket(title, tags, description, targetAddress)
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

  async customerDoneTicket(ticketIndex: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    return this.contract.methods
      .customerDoneTicket(ticketIndex)
      .send({ from: accounts[0] });
  }

  async getTicketsByAddress(addressString: string): Promise<any> {
    return this.contract.methods.getTicketsByAddress(addressString).call();
  }
}
