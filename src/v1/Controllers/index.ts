import CommerceCouponsController from './coupons';
import CommerceCustomersController from './customers';
import CommerceHealthController from './health';
import CommerceOrdersController from './orders';
import CommerceProductsController from './products';
import CommerceRefundController from './refunds';
import CommerceReportController from './reports';
import CommerceSettingsController from './settings';
import CommerceStatusController from './status';
import CommerceTaxController from './tax';
import CommerceWebhookController from './webhooks';

export default [
	CommerceHealthController,
	CommerceCustomersController,
	CommerceCouponsController,
	CommerceProductsController,
	CommerceOrdersController,
	CommerceRefundController,
	CommerceReportController,
	CommerceSettingsController,
	CommerceStatusController,
	CommerceTaxController,
	CommerceWebhookController,
];
