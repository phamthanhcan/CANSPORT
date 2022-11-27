export class Category {
  constructor(data) {
    this.id = data._id || "";
    this.name = data.name || "";
    this.description = data.description || "";
    this.image = data.image || "";
    this.status = data.status;
  }
}
