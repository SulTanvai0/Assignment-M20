const {
  CalculateTotalRevenueByAllTransaction,
  TotalQuantitySoldForEachProduct,
  RetrieveTopFiveProductsHighestRevenue,
  CalculateAveragePriceOfProducts,
  CalculateTotalRevenueByMonthYear,
  HeightsSaleOnSingleDay,
  CalculateTotalSalaryExpenseForeachDepartment,
} = require("../controllers/SalesController");
const { SiteInfoController } = require("../controllers/SiteInfoController");

const router = require("express").Router();

router.get("/", SiteInfoController);
router.get("/total-revenue", CalculateTotalRevenueByAllTransaction);
router.get("/quantity-by-product", TotalQuantitySoldForEachProduct);
router.get("/top-product", RetrieveTopFiveProductsHighestRevenue);
router.get("/average-price", CalculateAveragePriceOfProducts);
router.get("/revenue-by-month", CalculateTotalRevenueByMonthYear);
router.get("/highest-quantity-sold", HeightsSaleOnSingleDay);
router.get("/department-salary-expense", CalculateTotalSalaryExpenseForeachDepartment);

module.exports = router;
