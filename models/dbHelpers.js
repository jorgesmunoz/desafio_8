class Contenedor {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async save(product) {
    try {
      const [id] = await this.db(this.table).insert(product);
      return id;
    } catch (error) {
      console.log("Error inserting product in dB");
    }
  }

  async put(idNumber, data) {
    try {
      const product = this.db(this.table).where({ id: idNumber }).update(data);
      return product;
    } catch (error) {
      console.log("error updating product");
    }
  }

  async getById(idNumber) {
    try {
      const product = this.db(this.table).where("id", idNumber);
      return product;
    } catch (error) {
      console.log(`error getting product with id: ${idNumber}`);
      return 0;
    }
  }

  async getAll() {
    try {
      const res = this.db(this.table);
      return res;
    } catch (error) {
      console.log("Error getting all products");
      return 0;
    }
  }

  async deleteAll() {
    try {
      const res = this.db(this.table).del();
      return res;
    } catch (error) {
      console.log("error deleting all products");
      return 0;
    }
  }

  async deleteById(idNumber) {
    try {
      const product = this.db(this.table).where("id", idNumber).del();
      return product;
    } catch (error) {
      console.log(`error getting product with id: ${idNumber}`);
    }
  }
}

module.exports = Contenedor;
