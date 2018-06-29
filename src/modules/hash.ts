import crypto from 'crypto';

export default function getHash(passToHash: string, salt: string): string {
    const sha = crypto.createHmac('sha256', salt);
    sha.update(passToHash);
    return sha.digest('hex');
}