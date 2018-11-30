
export class environment {
  public static production = false;

  public static version = "1.7";
  public static clientType = "Client";

  public static maxRetryCount = 3;
  public static clientEndpoint = "/api";
  public static managementEndpoint = "/api";
  public static endpoint = environment.clientType == "Client" ? environment.clientEndpoint : environment.managementEndpoint;
  public static host = "";
  public static GetUserInfo = "GetUserInfo";
  public static UpdateUserInfo = "/index.php/Home/Admin/ChangeAdminInfo";
}
