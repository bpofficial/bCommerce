export default class Paginated<T> {
    constructor(page: number, pageSize: number, numPages: number, numResources: number, data: T) {
        return {
            Pagination: {
                PageNumber: page,
                PageSize: pageSize,
                NumberOfPages: numPages,
                NumberOfItems: numResources
            },
            Result: data
        }
    }
}