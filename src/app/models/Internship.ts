export interface InternshipDTO {
  id: number; 
  name: string;
  startDate: string;  
  endDate: string;   
  about?: string;
  technologies?: string;
  skills?: string;
  companyId: number;
  requirements?: string;
  companyName: string;
}