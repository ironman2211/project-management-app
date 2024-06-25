export interface TaskDetails {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: Date;
  assignId: string;
}



interface User {
  id:  string | null;
  name:  string | null;
  email:  string | null;
  emailVerified: Date | null;
  image:  string | null;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: 'INITIATED' | 'INPROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  deadline: Date;
  createdBy: User;
  updatedBy: User;
  assignedTo: User;
  assignId: string;
  createdAt: Date;
}