import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../../../services/common/models/comment.service';
import { Comment, Create_Comment } from '../../../../../contracts/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/common/auth.service';
import { DeleteState } from '../../../../../dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from '../../../../../services/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../../services/common/models/product.service';
import { DeleteDialogComponent } from '../../../../../dialogs/delete-dialog/delete-dialog.component';
import { SpinnerType } from '../../../../../base/base.component';
import { UpdateDialogComponent, AcceptState } from '../../../../../dialogs/update-dialog/update-dialog/update-dialog.component';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private productService: ProductService
  ) {}

  currentRoute: string;
  comments: Comment[] ;
  userName: string ;
  content: string ;
  selectedComment: Comment | null = null;

  page: number = 1;
  size: number = 5;

  
  ngOnInit(): void {
    this.loadComments();
    this.currentRoute = this.router.url;
  }

  get getUserName(): string {
    return this.authService.getUser() || "Misafir Kullanıcı";
  }
  
  isAdmin(): boolean {
    return this.authService.isAdmin;
  }
  
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
  // Yorumları yükleme
  loadComments(): void {
    const bookid = this.route.snapshot.paramMap.get("id") || "" ;
    console.log("bookid comment component ",bookid);
    this.commentService.get(() => {}, () => {
      console.log("Yorumları çekerken hata oluştu!");
    }, bookid)
    .subscribe(response => {
      console.log("response comment component ",response.comments);
      this.comments = response.comments;
    });
  }

  // Yeni yorum ekleme
  async addComment() {

      const bookid = this.route.snapshot.paramMap.get("id") || "" ;

      const newComment: Create_Comment = {
      UserName: this.getUserName,
      Content: this.content,
      BookId: parseInt(bookid)
    };

      await this.commentService.create(newComment, () => {
        this.ngOnInit();
        this.userName = '';
        this.content = '';
      }, errorMessage => {
      console.error('Yorum eklenirken hata oluştu:', errorMessage);
    });
   
    
  
  }

  // Yorum silme
  deleteComment(commentId: number): void {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {     
        this.spinner.show(SpinnerType.CubeTransition);
       await this.commentService.delete(commentId.toString(),()=> {
        this.spinner.hide(SpinnerType.CubeTransition);
       });
       this.ngOnInit();
      }
     
    })
    
    this.loadComments()
  }

  // Yorum düzenleme için bilgileri al
  editComment(comment: Comment): void {
    this.selectedComment = { ...comment }; // Seçili yorumu düzenleme için kopyala
  }

  // Güncellenmiş yorumu kaydetme
  saveUpdatedComment(): void {
    if (this.selectedComment) {
      const id = this.selectedComment.id;
      const content = this.selectedComment.content;
      this.dialogService.openDialog({
        componentType: UpdateDialogComponent,
        data: AcceptState.Yes,
        afterClosed: async () => {     
          this.spinner.show(SpinnerType.CubeTransition);
          this.commentService.update(id.toString(), { content }, () => {
            this.spinner.hide(SpinnerType.CubeTransition);
          }, errorMessage => {
            console.error('Yorum güncellenirken hata oluştu:', errorMessage);
          });
         this.ngOnInit();
         this.selectedComment = null;
        }
       
      })
      
      
    }
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.currentRoute} });
  }
}
