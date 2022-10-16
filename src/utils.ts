import {
    crypto_generichash, crypto_pwhash,
    crypto_pwhash_ALG_ARGON2ID13, crypto_pwhash_SALTBYTES, ready,
} from 'libsodium-wrappers'


export async function calcAccessKey(email: string, password: string) {
    await ready
    return crypto_pwhash(
        64,
        new Uint8Array(Buffer.from(password)),
        crypto_generichash(
            crypto_pwhash_SALTBYTES,
            password.slice(0, 6) + email + 'novelai_data_access_key',
        ),
        2,
        2e6,
        crypto_pwhash_ALG_ARGON2ID13,
        'base64').slice(0, 64)
}
