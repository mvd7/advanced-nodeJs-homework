import mongoose from "mongoose";
import customerSchema from "../mongo_schemas/customer.schema.js";

class CustomerModel {
  mongo_model;

  constructor() {
    this.mongo_model = mongoose.model("Customer", customerSchema);
  }

  async addCustomer(customerData) {
    const customer = new this.mongo_model(customerData);
    await customer.save();
  }

  async getAllCustomers() {
    const customers = await this.mongo_model.find();
    return customers;
  }

  async getCustomerById(customerId) {
    const customer = await this.mongo_model.findById(customerId);

    return customer;
  }

  async deleteCustomer(customerId) {
    await this.mongo_model.findByIdAndDelete(customerId);
  }

  async updateCostumer(customerId, customerData) {
    const costumer = await this.mongo_model.findById(customerId);

    await this.mongo_model.updateOne(
      { _id: customerId },
      {
        name: customerData.name || costumer.name,
        email: customerData.email || costumer.email,
        address: customerData.address || costumer.address,
        street: customerData.street || costumer.street,
        city: customerData.city || costumer.city,
        country: customerData.country || costumer.country,
        zip: customerData.zip || costumer.zip,
      }
    );
  }

  async deleteOrder(customerId) {
    await this.mongo_model.findByIdAndDelete(customerId);
  }
}

export default CustomerModel;
