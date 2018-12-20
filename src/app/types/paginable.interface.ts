
export interface IPaginable<T> {
    currentPage?: number;
    totalItems?: number;
    itemsPerPage?: number;
    items?: T[] 
}