record Comment(
    int Id,
    int PostId,
    string Commenter,
    string? Content,
    DateTime CreatedDt
    ) : Identifiable
{ }