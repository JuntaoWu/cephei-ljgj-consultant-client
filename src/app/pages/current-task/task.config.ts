import { flatten } from "@angular/compiler";

export const TaskConfig = [
    [
        {
            isprospect: false,
            maxStep: 7,
            maxIndex: 7,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_one_two',
                    name: '任务登记',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工作任务单登记（根据工作票单页面数量确定照片数量），将工作票单后将票单所有页面（不含附票）逐一按顺序照相上传。要求：票单相片要清晰，票单上的文字必须清楚可辨认，在上传前应检查到位。"
                },
                {
                    icon: 'step_one_three',
                    name: '工器具准备',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工器具准备环节（两张照片），1.将填写完善的安全工器具领用记录照相上传；2.所有领用的安全工器具摆放整齐后，照相上传。要求：领用记录相片要清晰，票单上的文字及手工签字内容必须清楚可辨认，在上传前应检查到位。"
                },
                {
                    icon: 'step_one_four',
                    name: '班前会',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "班前会。首先所有作业人员列队整齐后，从工作地点为背景拍照一张上传。要求所有人员均正对面向镜头。其次，拍照后工作负责人打开“选取音频文件”录音功能，全程班前会录音并上传。"
                },
                {
                    icon: 'step_one_five',
                    name: '现场情况',
                    indexId: "4",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: true,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息',
                    notice: "现场情况环节（不低于两张不同角度的照片），1.将作业现场设备情况照相上传；2.故障抢修则应将故障设备及故障点照相上传；3.现场如果有管理人员到场，应选中本环节将管理员以现场检修作业设备为背景拍照上传。要求：如果是线路巡视等开具派工单的工作，则以第一个工作地点拍照上传。"
                },
                {
                    icon: 'step_one_six',
                    name: '安全措施',
                    indexId: "5",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "安全措施环节（根据安全措施情况确定照片数量），1.将安全措施布置情况照相上传手机；2.安全措施布置应包括接地线、围栏、标识牌等票单上写明的安全措施。要求：如果该项工作无需要现场布置的安全措施，可以填写备注信息“无"
                },
                {
                    icon: 'step_one_seven',
                    name: '任务完成',
                    indexId: "6",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "任务完成环节（根据安全措施情况确定照片数量，至少有3张），1.对完成检修的设备进行拍照上传；2.对已经拆除的安全措施的工作地点情况进行拍照上传；3.将已终结的工作票单终结页照相上传。"
                },
                {
                    icon: 'step_one_eight',
                    name: '工器具归还',
                    indexId: "7",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工器具归还环节（至少2张照片），1.将使用完毕的安全工器具整理，归还到安全工器具室并拍照上传手机；2.将完成归还 手续签字的安全工器具领用记录照相上传手机。要求：领用记录相片要清晰 ，票单上的文字用手工签字内容必须清楚可辨认，在上传前应检查到位。"
                },
            ]
        },
        {
            isprospect: true,
            maxStep: 8,
            maxIndex: 7,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_one_one',
                    name: '现场勘察',
                    indexId: "0",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "现场勘察应查看检修（施工）作业需要停电的范围、保留的带电部位、装设接地线的位置、邻近线路、交叉跨越、多电源、自备电源、地下管线设施和作业现场的条件、环境及其他影响作业的危险点，并提出针对性的安全措施和注意事项。"
                },
                {
                    icon: 'step_one_two',
                    name: '任务登记',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工作任务单登记（根据工作票单页面数量确定照片数量），将工作票单后将票单所有页面（不含附票）逐一按顺序照相上传。要求：票单相片要清晰，票单上的文字必须清楚可辨认，在上传前应检查到位。"
                },
                {
                    icon: 'step_one_three',
                    name: '工器具准备',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工器具准备环节（两张照片），1.将填写完善的安全工器具领用记录照相上传；2.所有领用的安全工器具摆放整齐后，照相上传。要求：领用记录相片要清晰，票单上的文字及手工签字内容必须清楚可辨认，在上传前应检查到位。"
                },
                {
                    icon: 'step_one_four',
                    name: '班前会',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "班前会。首先所有作业人员列队整齐后，从工作地点为背景拍照一张上传。要求所有人员均正对面向镜头。其次，拍照后工作负责人打开“选取音频文件”录音功能，全程班前会录音并上传。"
                },
                {
                    icon: 'step_one_five',
                    name: '现场情况',
                    indexId: "4",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: true,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息',
                    notice: "现场情况环节（不低于两张不同角度的照片），1.将作业现场设备情况照相上传；2.故障抢修则应将故障设备及故障点照相上传；3.现场如果有管理人员到场，应选中本环节将管理员以现场检修作业设备为背景拍照上传。要求：如果是线路巡视等开具派工单的工作，则以第一个工作地点拍照上传。"
                },
                {
                    icon: 'step_one_six',
                    name: '安全措施',
                    indexId: "5",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "安全措施环节（根据安全措施情况确定照片数量），1.将安全措施布置情况照相上传手机；2.安全措施布置应包括接地线、围栏、标识牌等票单上写明的安全措施。要求：如果该项工作无需要现场布置的安全措施，可以填写备注信息“无"
                },
                {
                    icon: 'step_one_seven',
                    name: '任务完成',
                    indexId: "6",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "任务完成环节（根据安全措施情况确定照片数量，至少有3张），1.对完成检修的设备进行拍照上传；2.对已经拆除的安全措施的工作地点情况进行拍照上传；3.将已终结的工作票单终结页照相上传。"
                },
                {
                    icon: 'step_one_eight',
                    name: '工器具归还',
                    indexId: "7",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: true,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工器具归还环节（至少2张照片），1.将使用完毕的安全工器具整理，归还到安全工器具室并拍照上传手机；2.将完成归还 手续签字的安全工器具领用记录照相上传手机。要求：领用记录相片要清晰 ，票单上的文字用手工签字内容必须清楚可辨认，在上传前应检查到位。"
                },
            ]
        }
    ],
    [
        {
            maxStep: 3,
            maxIndex: 3,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_two_one',
                    name: '任务登记',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工作任务单登记。首先选择当日计划巡视杆塔数量。其次，根据巡视计划开展巡视工作并按要求巡视并拍照上传。其次，将工作票单所有页面（不含附票）逐一按顺序拍照上传。要求：票票面相片要清晰，票面上的文字应清晰可辩。"
                },
                {
                    icon: 'step_two_two',
                    name: '班前会',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: '班前会。首先所有作业人员列队整齐后，从工作地点为背景拍照一张上传。要求所有人员均正对面向镜头。其次，拍照后工作负责人打开“选取音频文件”录音功能，全程班前会录音并上传。'
                },
                {
                    icon: 'step_two_three',
                    name: '巡视详情',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: '巡视。拍照要求：(1)架空部分：标识牌+挂上设备+小号至大号方向通道。(2)站房部分：设备全景+直流系统。(3)有缺陷的设备、设施：全景+缺陷部位照片'
                },
            ]
        },
        {
            maxStep: 3,
            maxIndex: 3,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_two_one',
                    name: '任务登记',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: "工作任务单登记。首先选择当日计划巡视杆塔数量。其次，根据巡视计划开展巡视工作并按要求巡视并拍照上传。其次，将工作票单所有页面（不含附票）逐一按顺序拍照上传。要求：票票面相片要清晰，票面上的文字应清晰可辩。"
                },
                {
                    icon: 'step_two_two',
                    name: '班前会',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: '班前会。首先所有作业人员列队整齐后，从工作地点为背景拍照一张上传。要求所有人员均正对面向镜头。其次，拍照后工作负责人打开“选取音频文件”录音功能，全程班前会录音并上传。'
                },
                {
                    icon: 'step_two_three',
                    name: '巡视详情',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: false,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改',
                    notice: '巡视。拍照要求：(1)架空部分：标识牌+挂上设备+小号至大号方向通道。(2)站房部分：设备全景+直流系统。(3)有缺陷的设备、设施：全景+缺陷部位照片'
                },
            ]
        }
    ],
    [
        {
            isprospect: false,
            maxStep: 3,
            maxIndex: 10,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_three_one',
                    name: '综合',
                    indexId: ["1", "2", "3", "4"],
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息',
                    childSteps: {
                        "1": { name: '安全教育培训', },
                        "2": { name: '安全工器具', },
                        "3": { name: '反违章', },
                        "4": { name: '安全日志活动', },
                    }
                },
                {
                    icon: 'step_three_two',
                    name: '安全措施',
                    indexId: ["5", "6", "7", "8", "9"],
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息',
                    childSteps: {
                        "5": { name: '春秋安全检查等专项活动', },
                        "6": { name: '应急演示', },
                        "7": { name: '隐患管理', },
                        "8": { name: '工作票单管理', },
                        "9": { name: '工作属地检查情况', },
                    }
                },
                {   icon: 'step_three_three',
                    name: '其他情况', 
                    indexId: "10", 
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息', },
            ]
        },
        {
            isprospect: true,
            maxStep: 6,
            maxIndex: 16,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_four_one',
                    name: '两票',
                    indexId: "11",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
                {
                    icon: 'step_four_two',
                    name: '班前会',
                    indexId: "12",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
                {
                    icon: 'step_four_three',
                    name: '安全措施',
                    indexId: "13",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
                {
                    icon: 'step_four_four',
                    name: '施工工艺',
                    indexId: "14",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
                {
                    icon: 'step_four_five',
                    name: '考问录音',
                    indexId: "15",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
                {
                    icon: 'step_four_six',
                    name: '存在问题',
                    indexId: "16",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: true,
                    enableReviewCamera: true,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: true,
                    savingTips: '请确认上传信息'
                },
            ]
        },
    ],
    [
        {
            maxStep: 4,
            maxIndex: 4,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_five_one',
                    name: '操作票单',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                },
                {
                    icon: 'step_five_two',
                    name: '工器具',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                },
                {
                    icon: 'step_five_three',
                    name: '操作过程',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'

                },
                {
                    icon: 'step_five_four',
                    name: '操作完成',
                    indexId: "4",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                }
            ]
        },
        {
            maxStep: 4,
            maxIndex: 4,
            normalSuffix: "_normal_green.png", checkedSuffix: "_selected_green.png",
            stepArray: [
                {
                    icon: 'step_five_one',
                    name: '操作票单',
                    indexId: "1",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                },
                {
                    icon: 'step_five_two',
                    name: '工器具',
                    indexId: "2",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                },
                {
                    icon: 'step_five_three',
                    name: '操作过程',
                    indexId: "3",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: true,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'

                },
                {
                    icon: 'step_five_four',
                    name: '操作完成',
                    indexId: "4",
                    enableCamera: true,
                    enableGalleray: true,
                    showManagerCamera: false,
                    enableManagerCamera: false,
                    showReviewCamera: false,
                    enableReviewCamera: false,
                    showRecording:true,
                    enableRecording: true,
                    requirePhoto: true,
                    requireAudio: false,
                    enableUpdate: false,
                    savingTips: '请确认上传信息,信息提交后不能修改'
                }
            ]
        },
    ],
];