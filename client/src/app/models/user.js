export class User {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.dob = data.dob;
    this.address = data.address;
    this.gender = data.gender;
    this.userImage = data.userImage;
    this.status = data.status || false;
  }
}
