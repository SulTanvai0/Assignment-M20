const {
  CalculateTotalRevenueByAllTransactionService, TotalQuantitySoldForEachProductService, RetrieveTopFiveProductsHighestRevenueService, CalculateAveragePriceOfProductsService, CalculateTotalRevenueByMonthYearService, 
  HeightsSaleOnSingleDayService,
  CalculateTotalSalaryExpenseForeachDepartmentService,
} = require("../services/SalesService");

exports.CalculateTotalRevenueByAllTransaction = async (req, res) => {
  const result = await CalculateTotalRevenueByAllTransactionService(req);
  res.status(200).json(result);
};

exports.TotalQuantitySoldForEachProduct = async (req, res) => {
  const result = await TotalQuantitySoldForEachProductService(req);
  res.status(200).json(result);
};

exports.RetrieveTopFiveProductsHighestRevenue = async (req, res) => {

    const result = await RetrieveTopFiveProductsHighestRevenueService(req);
  res.status(200).json(result);

};
exports.CalculateAveragePriceOfProducts = async (req, res) => {
    const result = await CalculateAveragePriceOfProductsService(req);
    res.status(200).json(result); 
};

exports.CalculateTotalRevenueByMonthYear = async (req, res) => {
    const result = await CalculateTotalRevenueByMonthYearService(req);
    res.status(200).json(result); 
    
};
exports.HeightsSaleOnSingleDay = async (req, res) => {
    const result = await HeightsSaleOnSingleDayService(req);
    res.status(200).json(result);
};
exports.CalculateTotalSalaryExpenseForeachDepartment = async (req, res) => {

  const result = await CalculateTotalSalaryExpenseForeachDepartmentService(req);
    res.status(200).json(result);

};
