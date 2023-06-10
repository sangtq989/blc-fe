import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  web3: any;

  constructor(private http: HttpClient) {}

  async getAccount(): Promise<any> {
    this.web3 = new Web3((window as any).ethereum);
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }

  checkConnect() {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }
}
