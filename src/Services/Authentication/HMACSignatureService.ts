import { Service } from "@tsed/di";
import * as crypto from "crypto";

@Service()
export default class HMACSignatureService {

    public verify(param: string, signature: string, key: string) {
        return this.sign(param, key) === signature;
    }

    public sign(signee: string, key: string) {
        const signature = crypto.createHmac("sha256", key);
        signature.write(signee);
        signature.end();
        return Buffer.from(signature.read()).toString('base64');
    }

}