/**
 *
 * Author: Brayden Phillips
 */
import {Controller, Get} from '@tsed/common';

@Controller('/reports')
export default class CommerceReportController {
	@Get('/sales')
	public getSalesReport() {}

	@Get('/products')
	public getProductReport() {}

	@Get('/coupons')
	public getCouponReport() {}

	@Get('/customer')
	public getCustomerReport() {}

	@Get('/combined')
	public getCombinedReport() {}
}
