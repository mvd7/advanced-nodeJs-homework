import CustomerModel from "../models/customer.model.js";

const customerModel = new CustomerModel();

class CustomerController {
  async getAllCustomers(req, res) {
    const customers = await customerModel.getAllCustomers();

    res.send(customers);
  }

  async addCustomer(req, res) {
    const {
      name,
      email,
      phone,
      address: { street, country, city, zip },
    } = req.body;

    const customerData = {
      name: name,
      email: email,
      phone: phone,
      address: { street: street, country: country, city: city, zip: zip },
    };

    await customerModel.addCustomer(customerData);

    res.send({ message: "Customer added." });
  }

  async getCustomerById(req, res) {
    const id = req.params.id;

    try {
      const customer = await customerModel.getCustomerById(id);
      res.send(customer);
    } catch (error) {
      res
        .status(404)
        .send({ message: `Customer with id ${id} was not found.` });
    }
  }

  async deleteCustomer(req, res) {
    const id = req.params.id;

    await customerModel.deleteCustomer(id);

    res.send({ message: `Customer with id ${id} was deleted.` });
  }

  async deleteCustomer(req, res) {
    const customerId = req.params.id;
    await customerModel.deleteCustomer(customerId);
    res.send({ message: `Customer with id: ${customerId} was deleted` });
  }

  async updateCustomer(req, res) {
    const customerId = req.params.id;

    const {
      name,
      email,
      phone,
      address: { street, country, city, zip },
    } = req.body;
    const customerData = {
      name: name,
      email: email,
      phone: phone,
      address: {
        street: street,
        country: country,
        city: city,
        zip: zip,
      },
    };
    try {
      await customerModel.updateCostumer(customerId, customerData);
      res.send({ message: `Customer  wiht id:${customerId} was updated` });
    } catch (err) {
      res.status(404).send({ message: err.message });
    }
  }

  async deleteCustomer(req, res) {
    const customerId = req.params.id;
    console.log(customerId);
    await customerModel.deleteOrder(customerId);
    res.send({ message: `Customer with id: ${customerId} was deleted` });
  }
}

export default CustomerController;
