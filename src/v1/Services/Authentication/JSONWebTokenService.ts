import {Service} from '@tsed/di';
import {sign, verify} from 'jsonwebtoken';

@Service()
export default class JSONWebTokenService {
	public generate(claims: {[key: string]: string | number}) {
		return sign(
			{
				...claims,
			},
			process.env.JWT_SECRET || '',
		);
	}

	public decode(jwt: string) {
		return this.verify(jwt);
	}

	public verify(jwt: string) {
		return verify(jwt, process.env.JWT_SECRET);
	}
}
