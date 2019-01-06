
export enum BacklogType {
    ConfirmOrder,  // 客服审核确认
    ContactUser,   // 联系用户
    VisitUser,      //上门查看
    Preparing,     // 准备施工
    InProgress,    // 正在施工
    Completed,     // 施工完成
    Canceled,      // 终止服务
    Others,        // 其他
}

export class Backlog {

    public orderDiaryId?: string;

    public orderId: string;

    public orderDiaryType: BacklogType;

    public orderDiaryContent: string;

    public diaryPicUrls: Array<string>;

    public createdBy?: string;

    public createdAt?: Date;

    public updatedAt?: Date;
}