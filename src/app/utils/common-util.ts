export class CommonUtil {
  public static convertDate(date: any) {
    if (!date) return '';
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
}
