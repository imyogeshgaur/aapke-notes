import { decode } from 'jsonwebtoken'

const decodeUser = (token: any) => {
    try {
        const decodedVal: any = decode(token, { complete: true });
        return decodedVal?.payload.userId;
    } catch (error) {
        console.log('Decoding Error : ', error)
    }
}

export default decodeUser;