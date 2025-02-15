export class Comment{ 
  
  bookid?: string;
  id: number;
  userName: string;
  content: string;
  createDate: string;
}


export class CommentResponse{
  comments: Comment[];
  message: string;
  success: string;
}

export class Create_CommentResponse{
  success: string;
  message: string;
  commenId: string;
}
export class Create_Comment{
   
  BookId: number;
  UserName: string;
  Content: string;

}
