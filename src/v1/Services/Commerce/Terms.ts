import {Inject, Service} from '@tsed/di';
import {BadRequest} from '@tsed/exceptions';
import {UseConnection} from '@tsed/typeorm';
import CommerceTerm from '../../Database/Entities/TermEntity';
import CommerceTermRepository from '../../Database/Repositories/TermRepository';

@Service()
export default class CommerceTermService {
	@Inject()
	@UseConnection('default')
	private readonly termRepository: CommerceTermRepository;

	public async createOne(obj: Partial<CommerceTerm>) {
		const isNotUnique = obj?.slug
			? !!(await this.termRepository.findOne({slug: obj?.slug}))
			: false;
		if (isNotUnique) {
			throw new BadRequest('A term with this slug already exists.');
		}
		const term = new CommerceTerm(obj);
		const result = await this.termRepository.save(term);
		return this.termRepository.findOne({id: result.id});
	}

	public async getOne(id: number) {
		return this.termRepository.findOne({id});
	}

	public async getAll() {
		return this.termRepository.find();
	}

	public async updateOne(id: number, term: Partial<CommerceTerm>) {}

	public async deleteOne(id: number) {}
}
