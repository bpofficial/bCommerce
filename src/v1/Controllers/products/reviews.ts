/**
 *
 * Author: Brayden Phillips
 */
import {
	BodyParams,
	Controller,
	Delete,
	Get,
	PathParams,
	Post,
	Put,
} from '@tsed/common';
import CommerceTerm from '../../Database/Entities/TermEntity';

@Controller('/products/reviews')
export default class CommerceProductReviewController {
	@Get('/:id')
	public getReview(@PathParams('id') id: string) {}

	@Get()
	public getReviews() {}

	@Post()
	public createReview() {}

	@Put('/:id')
	public updateReview(
		@PathParams('id') id: string,
		@BodyParams() update: Partial<CommerceTerm>,
	) {}

	@Delete('/:id')
	public deleteReview(@PathParams('id') id: string) {}
}
