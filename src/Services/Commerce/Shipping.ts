import {Service} from '@tsed/di';
import CommerceShipping from '../../Entities/ShippingEntity';

@Service()
export default class CommerceShippingService {
	public async calculateShipping(
		method: string,
		shipping: CommerceShipping,
	): Promise<number> {
		return;
	}

	public async getShippingMethods(shipping: CommerceShipping) {}
}
