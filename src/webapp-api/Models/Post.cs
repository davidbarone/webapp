record Post(
    int Id,
    string Slug,
    string? Teaser,
    string? Content,
    string Author,
    DateTime CreatedDt
    ) : Identifiable
{ }