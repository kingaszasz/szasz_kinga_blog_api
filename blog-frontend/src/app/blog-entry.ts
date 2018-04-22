
interface BlogEntry {
    tag: String;
    title: String;
    content: String;
    comment: Array<object>;
    _id?: String;
    username?: String;
    onlyMeCanSee?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
