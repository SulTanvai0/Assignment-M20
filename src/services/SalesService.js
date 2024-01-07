const SalesModel = require("../Model/SalesModel");
const SalaryModel = require("../Model/salaryModel");

exports.CalculateTotalRevenueByAllTransactionService = async (req, res) => {
  try {
    const result = await SalesModel.find();

    let totalRevenue = 0;

    result.forEach((element) => {
      // koita sell hoice
      let sellQuantity = element["quantity"];
      //koto kore birkri hoice
      let sale_price = element["sale_price"];
      // koto kore Product kina hoice
      let companyPrice = element["companyPrice"];
      // koto taka lav hoice in every  single product
      let profit = parseFloat(sale_price) - parseFloat(companyPrice);
      //total koto  gula product sell holo and each product ee total sell ee koto profit holo
      let PerProductRev = parseFloat(sellQuantity) * profit;
      //Total revenew added while loop on
      totalRevenue += PerProductRev;
    });

    let data = `Total Revenue By All Transaction is ${totalRevenue} `;

    return { status: "Success", data: data };
  } catch (err) {
    console.error(
      "Error in CalculateTotalRevenueByAllTransactionService:",
      err
    );
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.TotalQuantitySoldForEachProductService = async (req, res) => {
  try {
    const result = await SalesModel.aggregate([
      {
        $project: {
          productName: "$product",
          SoldQuantity: "$quantity",
          LeftStock: { $subtract: ["$stock_qty", "$quantity"] },
        },
      },
    ]);

    return { status: "success", data: result };
  } catch (err) {
    console.error("Error in TotalQuantitySoldForEachProductService:", err);
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.RetrieveTopFiveProductsHighestRevenueService = async (req, res) => {
  try {
    let result = await SalesModel.find();

    let totalRevenue = 0;

    result.forEach(async (element) => {
      sellQuantity = element["quantity"];
      let sale_price = element["sale_price"];

      let companyPrice = element["companyPrice"];

      let profit = parseFloat(sale_price) - parseFloat(companyPrice);

      let PerProductRev = parseFloat(sellQuantity) * profit;

      totalRevenue += PerProductRev;

      let updateRevenueFiled = await SalesModel.updateOne(
        { _id: element["_id"] },
        { sell_revenue: totalRevenue }
      );
      return updateRevenueFiled;
    });

    let data = await SalesModel.aggregate([
      {
        $project: {
          product: 1,
          sell_revenue: 1,
        },
      },
      {
        $sort: {
          sell_revenue: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return {
      status: "Success",
      Message:
        "Retrieve the top 5 products with the highest total revenue, along with their total revenue values",
      data: data,
    };
  } catch (err) {
    console.error(
      "Error in CalculateTotalRevenueByAllTransactionService:",
      err
    );
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.CalculateAveragePriceOfProductsService = async (req, res) => {
  try {
    const result = await SalesModel.aggregate([
      {
        $group: {
          _id: "$product",
          averagePrice: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          product: "$_id",
          averagePrice: 1,
        },
      },
    ]);

    return { status: "success", data: result };
  } catch (err) {
    console.error("Error in CalculateAveragePriceOfProductsService:", err);
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.CalculateTotalRevenueByMonthYearService = async (req, res) => {
  try {
    const result = await SalesModel.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" },
        },
      },
      {
        $project: {
          yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } },
          sell_revenue: { $multiply: ["$quantity", "$price"] },
        },
      },
      {
        $group: {
          _id: "$yearMonth",
          totalRevenue: { $sum: "$sell_revenue" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return { status: "success", data: result };
  } catch (err) {
    console.error("Error in CalculateTotalRevenueByMonthYearService:", err);
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.HeightsSaleOnSingleDayService = async (req, res) => {
  try {
    const result = await SalesModel.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" },
        },
      },
      {
        $project: {
          product: 1,
          date: 1,
          quantity: 1,
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            product: "$product",
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          product: "$_id.product",
          date: "$_id.date",
          totalQuantity: 1,
        },
      },
    ]);

    return { status: "success", data: result[0] };
  } catch (err) {
    console.error("Error in HeightsSaleOnSingleDayService:", err);
    return { status: "fail", error: "Internal Server Error" };
  }
};

exports.CalculateTotalSalaryExpenseForeachDepartmentService = async (req) => {
  try {
    const result = await SalaryModel.aggregate([
      {
        $group: {
          _id: "$department",
          totalSalaryExpense: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "departments", 
          localField: "_id",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: "$departmentDetails",
      },
      {
        $project: {
          department: "$_id",
          totalSalaryExpense: 1,
          departmentDetails: 1,
          _id: 0,
        },
      },
    ]);

    return { status: "success", data: result };
  } catch (err) {
    console.error("Error in CalculateDepartmentSalaryExpenseService:", err);
    return { status: "fail", error: "Internal Server Error" };
  }
};

