import { IRepositoryDetails } from '../contracts.js';

export function isRepositoryDetails(value: any): value is IRepositoryDetails {
    return (
        value != null &&
        typeof value === 'object' &&
        value.repository != null &&
        typeof value.repository === 'object' &&
        value.repository.type === 'git' &&
        typeof value.repository.url === 'string'
    );
}
