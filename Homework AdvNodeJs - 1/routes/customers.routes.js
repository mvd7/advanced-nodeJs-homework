import { Router } from "express";
import CustomerController from "../controllers/customer.controller.js";

const customerController = new CustomerController();

const customerRouter = Router();

customerRouter.get("/", customerController.getAllCustomers);

customerRouter.post("/", customerController.addCustomer);

customerRouter.get("/:id", customerController.getCustomerById);

customerRouter.delete("/:id", customerController.deleteCustomer);

customerRouter.patch("/:id", customerController.updateCustomer);

export default customerRouter;
