export class CreateCartDto {
	customer: number;
	items: Cart[];
}

export class UpdateCartDto {
	items?: Cart[];
	abandoned?: boolean;
}

export class RetrieveCartDto {
	guid: string;
	customer: number | null;
	items: Cart[] | null;
	abandoned: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export class DeleteCartDto {
	// no data
}
