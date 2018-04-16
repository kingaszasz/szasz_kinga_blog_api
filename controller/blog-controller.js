const fs = require('fs');
const blogFile = './model/blog-model.json';

const Blog = {
  // reads and returns full blog content
  getAll: function () {
    let entries = [];
    try {
      const blogContent = fs.readFileSync(blogFile);
      entries = JSON.parse(blogContent);
    } catch (err) {
      return {
        error: err
      };
    }
    return entries; 
  },

  save: function (entries) {
    try {
      fs.writeFileSync(blogFile, JSON.stringify(entries));
    } catch (err) {
      return err;
    }
  },

  getOne: function (id) {
    let entries = this.getAll();
    let entry = entries.filter(entry => entry.id === parseInt(id));
    return entry[0] || {
      error: 'Not found'
    }; 
  },

  addOne: function (data) {
    let entries = this.getAll();
    let id = 0;
    let now = new Date;
    let formatedDate = `${now.getFullYear()}-${(now.getMonth()+1)}-${now.getDate()}
    Idő: ${now.getHours()}:${now.getMinutes()}`;

    entries.forEach(entry => {
      if (entry.id > id)
        id = entry.id;
    });
 
    const entry = {
      id: id + 1,
      title: data.title || 'default title',
      content: data.content || 'default content',
      tag: data.tag || 'none',
      comments: [],
      created: formatedDate,
      updated: formatedDate
    };

    entries.push(entry);
    this.save(entries);
    return entries;
  },

  validator: function (data) {

    return data;
  },

  removeOne: function (id) {
    let entries = this.getAll();
    entries = entries.filter(entry => entry.id !== parseInt(id));
    this.save(entries);
    return entries;
  },

  editOne: function (id, data) {
    let entries = this.getAll();
    let now = new Date;
    let formatedNow = `${now.getFullYear()}-${(now.getMonth()+1)}-${now.getDate()}
    Idő: ${now.getHours()}:${now.getMinutes()}`;

    const index = entries.findIndex(entry => entry.id === parseInt(id));
    if (index !== -1) {
      entries[index].title = data.title || entries[index].title;
      entries[index].content = data.content || entries[index].content;
      entries[index].tag = data.tag || entries[index].tag ;
      entries[index].updated = formatedNow;
      this.save(entries);
      return entries;
    }
    return {
      error: `The given ID: ${id} is not found`
    };
  
  },

  addComment: function (id, data) {
    let entries = this.getAll();
    let now = new Date;
    let formatedNow = `${now.getFullYear()}-${(now.getMonth()+1)}-${now.getDate()}
    Idő: ${now.getHours()}:${now.getMinutes()}`;

    const index = entries.findIndex(entry => entry.id === parseInt(id));
    if (index !== -1) {
         entries[index].updated = formatedNow;
      entries[index].comments.push(data.comments);
      this.save(entries);
      return entries;
    }
    return {
      error: `OOPS somthing went wrong!`
    };
  
  }
};

module.exports = Blog;