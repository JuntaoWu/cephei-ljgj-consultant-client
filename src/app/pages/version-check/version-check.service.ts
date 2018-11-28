import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";

@Injectable()
export class VersionCheckService {

    constructor(private api: Api) {

    }

    UpdateCheck(phone: string, version: string) {
        return this.api.post('UpdateCheck', {
            phone: phone,
            versionID: version
        });
    }
}