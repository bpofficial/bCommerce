import {PlatformTest} from '@tsed/common';
import CommerceCustomer from '../../src/Entities/CustomerEntity';
import CommerceCustomerService from '../../src/Services/Commerce/Customer';

describe('CommerceCustomerService', () => {
	beforeEach(PlatformTest.create);
	afterEach(PlatformTest.reset);

	describe('Creation', () => {
		it(
			'Should create a customer',
			PlatformTest.inject(
				[CommerceCustomerService],
				async (customerService: CommerceCustomerService) => {
					const customer: Partial<CommerceCustomer> = {
						user: 0,
						billing: {
							firstName: 'Brayden',
							lastName: 'Phillips',
							phone: '0437932890',
							company: null,
							postCode: '4107',
							addressOne: '14 Leah Avenue',
							addressTwo: null,
							suburb: 'Salisbury',
							city: 'Brisbane',
							region: 'QLD',
							country: 'Australia',
						},
					};
					const result = await customerService.createOne(customer);
					expect(result).toBeTruthy();
				},
			),
		);
	});
});
