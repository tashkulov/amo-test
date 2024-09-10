export interface Deal {
    id: number;
    name: string;
    price: number;
    tasks: Array<{ id: number; complete_till_at: string }>;
}
