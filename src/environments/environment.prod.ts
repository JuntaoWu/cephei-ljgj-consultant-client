export class environment {
  public static production = true;

  public static version = "1.7";
  public static clientType = "Management";

  public static maxRetryCount = 3;
  public static clientEndpoint = "http://gdjzj.hzsdgames.com:8093/api";
  public static managementEndpoint = "http://gdjzj.hzsdgames.com:8093/api";
  public static endpoint = environment.clientType == "Client" ? environment.clientEndpoint : environment.managementEndpoint;
  public static host = "http://gdjzj.hzsdgames.com:8093";
  public static GetUserInfo = "http://gdjzj.hzsdgames.com:8093/api/index.php/Home/Index/GetUserInfo";
  public static UpdateUserInfo = "http://gdjzj.hzsdgames.com:8093/api/Home/Admin/ChangeAdminInfo";
}
