export interface ITicket {
    id: number;
    title: string;
    status: string;
    description: string;
    dueDate: Date;
    subtasks: ISubtask[];
    user: number;
}

export interface ISubtask {
    title: string;
}