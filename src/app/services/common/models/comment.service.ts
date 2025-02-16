import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Comment, CommentResponse, Create_Comment } from '../../../contracts/comment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClientService: HttpClientService) {}

  // Yorumları Getir
  get(successCallBack?: () => void, errorCallBack?: () => void, bookId?: string): Observable<CommentResponse> {
    const getObservable: Observable<CommentResponse> = this.httpClientService.get<CommentResponse>({
      controller: "Comment",
      action: "GetComments",
    },bookId);
    if(successCallBack){
      successCallBack();
    }
    else{
      errorCallBack && errorCallBack();
    }
    return getObservable;
  }

  // Yorum Ekle
  create(comment:Create_Comment, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): void {
    this.httpClientService.post({
      controller: "Comment",
      action: "CreateComment"
    }, comment)
    .subscribe(response => {
      console.log("response : ", response);
    });
    
    if(successCallBack){
      successCallBack();
    
    }
    else{
     errorCallBack && errorCallBack("Bir hata oluştu sonra tekrar deneyiniz.");
    
    }
  }

  // Yorum Güncelle
  update(commentId: string, updatedComment: Partial<Comment>, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): void {
    this.httpClientService.put({
      controller: "Comment",
      action: "UpdateComment"
    }, updatedComment, commentId)
    .subscribe(response => {
      console.log("response : ", response);
    });
    if(successCallBack){
      successCallBack();
    }
    else{
      errorCallBack && errorCallBack("Bir hata oluştu sonra tekrar deneyiniz.");
    }
  }

  // Yorum Sil
  async delete(commentId: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<void> {
    const deleteObservable = this.httpClientService.delete({
      controller: "Comment",
      action: "DeleteComment"
    }, commentId)

    if(successCallBack){
      successCallBack();
    }
    else{
      errorCallBack && errorCallBack("Bir hata oluştu sonra tekrar deneyiniz.");
    }
     await firstValueFrom(deleteObservable);
  }
}
