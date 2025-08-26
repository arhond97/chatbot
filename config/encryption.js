import crypto from "crypto";


const IV_LENGTH = 16;

export const myEncrypt = (text) => {

    //wektor początkowy IV
    let iv = crypto.randomBytes(IV_LENGTH);
    //szyfr AES(Advanced Encryption Standard)
    // -256(klucz 256 bitowy, 32 znaki)
    // -CBC(tryb pracy wykorzystujący sprzężenie zwrotne, samosynchronizujący się)
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SECRET), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    //kodowanie heksadecymalne
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}


