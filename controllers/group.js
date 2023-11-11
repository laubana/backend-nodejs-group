const url = require("url");
const express = require("express");
const GroupCategory = require("../models/GroupCategory");
const Group = require("../models/Group");
const app = express();
app.use(express.json());

const getCategoryList = async (_, res) => {
  try {
    const groupCategories = await GroupCategory.find(
      {},
      {},
      { sort: { group_category_pk: 1 } }
    );

    res.status(200).json(groupCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGroupList = async (req, res) => {
  try {
    const { groupCategoryPk } = url.parse(req.url, true).query;
    const groups = await Group.find(
      { group_category_pk: groupCategoryPk },
      {},
      { sort: { group_pk: 1 } }
    );

    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCategoryList,
  getGroupList,
};
