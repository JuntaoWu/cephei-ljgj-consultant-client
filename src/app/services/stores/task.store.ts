import { Injectable } from "@angular/core";
import { Subject, ReplaySubject } from "rxjs";

interface Task {
    id?: string,
    title?: string,
}

@Injectable()
export class TaskStore {
    public currentTask: ReplaySubject<Task> = new ReplaySubject<Task>(1);
    // public workId: ReplaySubject<string> = new ReplaySubject<string>(1);
    private update: Subject<any> = new Subject<any>();

    constructor() {
        this.update.subscribe(this.currentTask);
    }

    public setWorkId(workId): void {
        this.update.next({ id: workId });
    }

    public resetWorkId(): void {
        this.update.next({});
    }

    public setCurrentTask(task): void {
        this.update.next(task);
    }

    public resetCurrentTask(): void {
        this.update.next({});
    }
}