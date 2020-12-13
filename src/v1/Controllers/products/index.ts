/**
 *
 * Author: Brayden Phillips
 */
import {Controller, Delete, Get, PathParams, Post, Put} from '@tsed/common';
import Security from '../../Constants/SECURITY';
import JWT from '../../Security/JWT';

@Controller('/products')
export default class CommerceProductsController {
	@Get()
	public async getProducts() {}

	@Get('/:id')
	public async getProduct(@PathParams('id') id: string) {}

	@Post()
	@JWT({security: Security.ADMIN})
	public async createProduct() {}

	@Put()
	@JWT({security: Security.ADMIN})
	public async updateProduct() {}

	@Delete()
	@JWT({security: Security.ADMIN})
	public async deleteProduct() {}
}
