/// <summary>
/// Api settings stored in appsettings json file(s).
/// </summary>
public class ApiSettings
{
    /// <summary>
    /// Path to data file.
    /// </summary>
    public string DataPath { get; set; } = default!;

    /// <summary>
    /// Name of the Api.
    /// </summary>
    public string Name { get; set; } = default!;
}