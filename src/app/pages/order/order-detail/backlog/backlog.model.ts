
export enum BacklogType {
    ConfirmOrder = 0,  // 客服确认
    ContactUser = 1,   // 联系用户
    VisitUser = 2,      //上门查看
    Reviewed = 3,       // 审核完成
    Preparing = 4,     // 准备施工
    InProgress = 5,    // 正在施工
    Completed = 6,     // 施工完成
    Canceled = 7,      // 终止服务
    Others = 8,        // 其他
}

export class Backlog {

    public orderDiaryId?: string;

    public orderId: string;

    public orderDiaryType: BacklogType;

    public orderDiaryContent?: string;

    public diaryPicUrls: Array<string>;

    public orderDiaryContentList?: string[];

    public createdBy?: string;

    public createdAt?: Date;

    public updatedAt?: Date;
}