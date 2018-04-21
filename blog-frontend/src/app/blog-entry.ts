
  interface BlogEntry {
        _id?: String;
        userid?: String;
        onlyMeCanSee?: Boolean;
        tag: String;
        title: String;
        content: String;
        comment: Array<object>;
        createdAt?: Date;
        updatedAt?: Date;
    }
