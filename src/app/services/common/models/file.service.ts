import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { firstValueFrom, Observable } from "rxjs";
import { BaseUrl } from "../../../contracts/base_url";

@Injectable({
    providedIn: 'root'
})
export class FileService{
    constructor(private httpClientService: HttpClientService)
{}

async getBaseStorageUrl(): Promise<BaseUrl> {
    const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
        controller: "files",
        action: "GetBaseStorageUrl"
    })
    console.log("file service");
    return await firstValueFrom(getObservable);
}

}