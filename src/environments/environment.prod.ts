export class environment {
  public static production = true;

  public static version = "1.7";
  public static clientType = "Client";

  public static maxRetryCount = 3;
  public static clientEndpoint = "https://consultant.51ljgj.com/api";
  public static managementEndpoint = "https://consultant.51ljgj.com/api";
  public static endpoint = environment.clientType == "Client" ? environment.clientEndpoint : environment.managementEndpoint;
  public static host = "https://consultant.51ljgj.com";
  public static GetUserInfo = "https://consultant.51ljgj.com/api/index.php/Home/Index/GetUserInfo";
  public static UpdateUserInfo = "https://consultant.51ljgj.com/api/Home/Admin/ChangeAdminInfo";
}
