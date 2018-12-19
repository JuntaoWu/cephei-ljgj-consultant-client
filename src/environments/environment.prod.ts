export class environment {
  public static production = true;

  public static version = "1.7";
  public static clientType = "Client";

  public static maxRetryCount = 3;
  public static clientEndpoint = "/api";
  public static managementEndpoint = "/api";
  public static endpoint = environment.clientType == "Client" ? environment.clientEndpoint : environment.managementEndpoint;
  public static host = "";
  public static GetUserInfo = "http://gdjzj.hzsdgames.com:8101/api/index.php/Home/Index/GetUserInfo";
  public static UpdateUserInfo = "http://gdjzj.hzsdgames.com:8101/api/Home/Admin/ChangeAdminInfo";
}
