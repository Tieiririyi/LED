Images = new FS.Collection("images", {
  stores: [
    //new FS.Store.GridFS("original")
      new FS.Store.FileSystem("images", {path: "../../../../../public/product-images"})
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
  },
  update: function(userId, doc, fields, modifier){
    return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
  },
  download:function(){
    return true;
  }
});