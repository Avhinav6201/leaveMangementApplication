import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {
   private encryption_key="encryptleavemangementdata123456";
  constructor() { }
  encryptData(data: string): string {

    return CryptoJS.AES.encrypt(data,this.encryption_key).toString();

  }
  decryptData(data: string): string {

    return CryptoJS.AES.decrypt(data,this.encryption_key).toString(CryptoJS.enc.Utf8);

  }


}
