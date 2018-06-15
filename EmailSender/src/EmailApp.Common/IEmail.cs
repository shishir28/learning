namespace EmailApp.Common
{
    public interface IEmail
    {
        string Tos { get; set; }
        string BCCs { get; set; }
        string CCs { get; set; }
        string Body { get; set; }
        string From { get; set; }
    }
}