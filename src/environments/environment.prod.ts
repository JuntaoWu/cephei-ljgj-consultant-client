export class environment {
  public static production = true;

  public static version = "1.7";
  public static clientType = "Client";

  public static maxRetryCount = 3;
  public static clientEndpoint = "http://localhost:8101/api";
  public static managementEndpoint = "http://localhost:8101/api";
  public static endpoint = environment.clientType == "Client" ? environment.clientEndpoint : environment.managementEndpoint;
  public static host = "http://localhost:8101";
  public static GetUserInfo = "http://gdjzj.hzsdgames.com:8101/api/index.php/Home/Index/GetUserInfo";
  public static UpdateUserInfo = "http://gdjzj.hzsdgames.com:8101/api/Home/Admin/ChangeAdminInfo";
}
