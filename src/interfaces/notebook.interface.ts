export interface Notebook {
    id: string;
    title: string;
    type: 'private' | 'public';
    createdAt?: string;
    updatedAt?: string;
    userId: string;
    noteIds: string[] | null;
}