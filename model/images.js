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

/*
 Avatars = new FS.Collection("avatars", {
 stores: [
 new FS.Store.FileSystem("original", { path: "/public/images/user/avatar" }),
 new FS.Store.FileSystem("thumb", { path: "/public/images/user/avatar" })
 ],
 filter: {
 maxSize: 1000000, //1Mo
 allow: { contentTypes: ['image/*'] }
 },
 onInvalid: function (message) {
 //throw new Meteor.Error(403, message);
 }
 });
 */