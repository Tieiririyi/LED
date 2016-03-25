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
