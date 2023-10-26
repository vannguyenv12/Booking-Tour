class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'name'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  find() {
    if (this.queryString.name) {
      this.query = this.query
        .sort('-createdAt')
        .find({ name: { $regex: this.queryString.name, $options: 'i' } });
    } else {
      console.log('hit');

      this.query = this.query.find();
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // 10 items
    // Mỗi page có 3 sản phẩm
    // Tức là sẽ có 4 pages

    // page = 2
    // limit = 3

    // skip = 3
    // limit = 3

    this.query = this.query
      .sort('ratingsAverage')
      .skip(skip)
      .limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
