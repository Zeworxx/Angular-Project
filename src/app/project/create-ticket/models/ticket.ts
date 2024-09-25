export interface ITicket {
    id: number;
    title: string;
    status: string;
    description: string;
    dueDate: Date;
    subtasks: ISubtask[];
    user: string;
}

export interface ISubtask {
    title: string;
}