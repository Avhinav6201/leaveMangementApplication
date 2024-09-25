import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptionDecryptionService {
  private encryption_key = 'encryptleavemangementdata123456';
  constructor() {}
  encryptData(data:any){
    return CryptoJS.AES.encrypt(data, this.encryption_key).toString();
  }
  decryptData(data:any){
    try{

      console.log(data.toString())
    return CryptoJS.AES.decrypt(data.toString(), this.encryption_key).toString(
      CryptoJS.enc.Utf8
    );

  }catch(error:any){
    return data;
  }
}

}
