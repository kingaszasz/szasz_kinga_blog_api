
  interface BlogEntry {
        _id?: String;
        tag: String;
        title: String;
        content: String;
        comment: Array<object>;
        createdAt?: Date;
        updatedAt?: Date;
    }
