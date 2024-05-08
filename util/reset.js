const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const GroupCategory = require("../models/GroupCategory");
const Group = require("../models/Group");

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};
db();

mongoose.connection.once("open", async () => {
  await User.deleteMany({});
  new User({
    user_pk: 1,
    user_id: "laubana@gmail.com",
    user_password: "password",
    user_name: "Lucas Ban",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 2,
    user_id: "test1@test.com",
    user_password: "password",
    user_name: "Test User1",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 3,
    user_id: "test2@test.com",
    user_password: "password",
    user_name: "Test User2",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 4,
    user_id: "test3@test.com",
    user_password: "password",
    user_name: "Test User3",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 5,
    user_id: "test4@test.com",
    user_password: "password",
    user_name: "Test User4",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 6,
    user_id: "test5@test.com",
    user_password: "password",
    user_name: "Test User5",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 7,
    user_id: "test6@test.com",
    user_password: "password",
    user_name: "Test User6",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 8,
    user_id: "test7@test.com",
    user_password: "password",
    user_name: "Test User7",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 9,
    user_id: "test8@test.com",
    user_password: "password",
    user_name: "Test User8",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 10,
    user_id: "test9@test.com",
    user_password: "password",
    user_name: "Test User9",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();
  new User({
    user_pk: 11,
    user_id: "test10@test.com",
    user_password: "password",
    user_name: "Test User10",
    user_location_address: "Vancouver, BC, Canada",
    user_location_latitude: 49.2827291,
    user_location_longitude: -123.1207375,
    user_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    user_description:
      "Nullam efficitur suscipit orci, vitae scelerisque velit varius non. Donec auctor sapien non consequat molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus, mi et maximus condimentum, lectus libero dignissim turpis, ut ultricies arcu lorem sit amet urna. Vestibulum ut porttitor nisl. Duis varius euismod porta. Proin auctor dapibus nisl, eu consequat eros aliquet vel. Maecenas eget turpis ut ligula varius efficitur. Phasellus tincidunt fermentum justo hendrerit volutpat. Sed non metus id neque rutrum ultricies.",
  }).save();

  await GroupCategory.deleteMany({});
  new GroupCategory({
    group_category_pk: 1,
    group_category_value: "Malesuada",
  }).save();
  new GroupCategory({
    group_category_pk: 2,
    group_category_value: "Egestas",
  }).save();
  new GroupCategory({
    group_category_pk: 3,
    group_category_value: "Consequat",
  }).save();

  await Group.deleteMany({});
  new Group({
    group_pk: 1,
    group_category_pk: 1,
    user_pk: 1,
    group_name: "Lorem",
    group_location_address: "100 W 49th Ave, Vancouver, BC V5Y 2Z6, Canada",
    group_location_latitude: 49.22442010000001,
    group_location_longitude: -123.1088805,
    group_location_url: "https://maps.google.com/?cid=3918251668961623550",
    group_description:
      "Ut congue in ex non blandit. Ut pretium libero in gravida venenatis. Curabitur eget dui risus. Aenean quam purus, posuere quis nisl pretium, maximus hendrerit nulla. Donec posuere massa ornare enim porta, nec tempor purus volutpat. In sit amet scelerisque mauris. Nam non leo sapien.",
  }).save();
  new Group({
    group_pk: 2,
    group_category_pk: 2,
    user_pk: 2,
    group_name: "Ipsum",
    group_location_address: "5300 No. 3 Rd, Richmond, BC V6X 2X9, Canada",
    group_location_latitude: 49.17643140000001,
    group_location_longitude: -123.1320442,
    group_location_url:
      "https://maps.google.com/?q=Vancouver,+BC,+Canada&ftid=0x548673f143a94fb3:0xbb9196ea9b81f38b",
    group_description:
      "Ut congue in ex non blandit. Ut pretium libero in gravida venenatis. Curabitur eget dui risus. Aenean quam purus, posuere quis nisl pretium, maximus hendrerit nulla. Donec posuere massa ornare enim porta, nec tempor purus volutpat. In sit amet scelerisque mauris. Nam non leo sapien.",
  }).save();

  console.log("Database reset.");
});
