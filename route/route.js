"use strict";
const express = require("express");
const router = express.Router();
const TokenMiddleware = require("../middleware/token-middleware");
// Require controller modules.
const AuthController = require("../controller/auth.controller");
const RouteController = require("../controller/route.controller");
const VehicleController = require("../controller/vehicle.controller");
const ReportController = require("../controller/report.controller");
const SurveyController = require("../controller/survey.controller");
const CustomerController = require("../controller/customer.controller")
const OrdersController = require("../controller/orders.controller")
const MasterDataController = require("../controller/master-data.controller")
const NotificationController = require("../controller/notification.controller")
const EmployeeController = require("../controller/employee.controller")
// const { route } = require("express/lib/router");

// Auth
router.get("/azure-sas-token", AuthController.azureSasToken);
router.post("/sign-in", AuthController.signIn);
router.put("/change-password", TokenMiddleware.Authorize, AuthController.changePassword)
router.get('/emails', TokenMiddleware.Authorize, AuthController.getEmails)
router.put('/update-email', TokenMiddleware.Authorize, AuthController.updateEmail)

//Vehicle
router.get("/employee-vehicles", TokenMiddleware.Authorize, VehicleController.getEmployeeVehicles);
router.post("/employee-vehicle-inspection", TokenMiddleware.Authorize, VehicleController.vehicleInspection);
router.post("/log-start-end-time", TokenMiddleware.Authorize, VehicleController.logStartEndTime);
router.post("/add-vehicle", TokenMiddleware.Authorize, VehicleController.addVehicle);
router.put('/vehicle-nickname', TokenMiddleware.Authorize, VehicleController.vehicleNickname)
router.delete("/delete-vehicle", TokenMiddleware.Authorize, VehicleController.deleteVehicle);
router.get('/employee-vehicles-am', TokenMiddleware.Authorize, VehicleController.getEmployeeVehiclesAM)
router.post('/add-vehicle-am', TokenMiddleware.Authorize, VehicleController.saveVehicleAM)

//Driver App Route
router.get("/routes", TokenMiddleware.Authorize, RouteController.getRoutes);
router.get("/route-stops", TokenMiddleware.Authorize, RouteController.getRouteStops);
router.get("/incomplete-stop", TokenMiddleware.Authorize, RouteController.getIncompletedStops);
router.get("/completed-stop", TokenMiddleware.Authorize, RouteController.getCompletedStops);
router.get("/skipped-stop", TokenMiddleware.Authorize, RouteController.getSkippedStops);
router.put("/unskipped-stops", TokenMiddleware.Authorize, RouteController.unskippedStops);
router.get("/audit-trail-list", TokenMiddleware.Authorize, RouteController.auditTrailList);
router.put("/update-audit-trial", TokenMiddleware.Authorize, RouteController.updateAuditTrail)

//change sequence
router.post("/change-sequence", TokenMiddleware.Authorize, RouteController.changeSequence);

router.post("/request-route-day", TokenMiddleware.Authorize, RouteController.requestBatchRoute);
router.post("/skip-stop", TokenMiddleware.Authorize, RouteController.skipStop);
router.get("/skip-stop-reason", TokenMiddleware.Authorize, RouteController.skipStopReason);
router.put("/modify-delivery-window", TokenMiddleware.Authorize, RouteController.modifyDeliveryWindow);
router.put("/reassign-skipped-stop", TokenMiddleware.Authorize, RouteController.reassignSkippedStop)
router.get('/states', TokenMiddleware.Authorize, RouteController.getStates);
router.get('/state-routes', TokenMiddleware.Authorize, RouteController.getRouteByState)
router.get('/order-by-batchid', TokenMiddleware.Authorize, RouteController.getOrderbyBatchId)
router.put('/delete-order', TokenMiddleware.Authorize, RouteController.deleteOrder)
router.put('/document-move', TokenMiddleware.Authorize, RouteController.documentMoveToBatchId)
router.get('/batch-ids', TokenMiddleware.Authorize, RouteController.getBatchIds)
router.get('/route-by-statecode', TokenMiddleware.Authorize, RouteController.getRouteByStateCode)
router.get('/route-names', TokenMiddleware.Authorize, RouteController.getRouteNames)
router.put('/reroute-order', TokenMiddleware.Authorize, RouteController.rerouteOrder)
router.get('/routes-stop-status', TokenMiddleware.Authorize, RouteController.routesStopStatus)
router.get('/stop-details', TokenMiddleware.Authorize, RouteController.stopDetails)
router.get('/batch-list-batch-id', TokenMiddleware.Authorize, RouteController.batchListByBatchId)
router.get('/batch-under-cs', TokenMiddleware.Authorize, RouteController.getBatchUnderCS)


// Area Manager Dashbaord
router.get("/dashboard-count-report", TokenMiddleware.Authorize, ReportController.dashboardCountReport);
router.get("/dashboard-count-report-cs", TokenMiddleware.Authorize, ReportController.dashboardCountReportCS);
router.get("/skipped-stops-list", TokenMiddleware.Authorize, RouteController.getUnskippedStopsList);
router.put("/reassign-skipped-stop", TokenMiddleware.Authorize, RouteController.reassignSkippedStop)
router.get('/state', TokenMiddleware.Authorize, RouteController.getStates);
router.get('/route-details-am', TokenMiddleware.Authorize, RouteController.getRouteDetailsAM)
router.get('/route-day-view', TokenMiddleware.Authorize, RouteController.getRouteDayView)
router.get('/modify-route-day-get', TokenMiddleware.Authorize, RouteController.getModifyRouteDay)
router.get('/route-name-am', TokenMiddleware.Authorize, RouteController.getRouteNameAM)
router.put('/modify-location-am', TokenMiddleware.Authorize, RouteController.modifyLocationAM)
router.put('/change-order-sequence', TokenMiddleware.Authorize, OrdersController.changeOrderSequence)
router.get('/eod-report-am', TokenMiddleware.Authorize, OrdersController.getEodReportAM)
router.get('/order-documents', TokenMiddleware.Authorize, OrdersController.getOrderDocuments)
router.post('/one-time-sales-request', TokenMiddleware.Authorize, OrdersController.oneTimeSaleRequest)
router.post('/program', TokenMiddleware.Authorize, OrdersController.modifyCustomerProgram)
router.post('/knife-inventory', TokenMiddleware.Authorize, OrdersController.knifeInventory)
router.post('/modify-customer-contract', TokenMiddleware.Authorize, OrdersController.modifyCustomerContract)
router.get('/driver-details', TokenMiddleware.Authorize, OrdersController.driverDetails)
router.get('/route-to-am', TokenMiddleware.Authorize, OrdersController.routeToAM)


// Report
router.get('/eod-report-batchId', TokenMiddleware.Authorize, ReportController.eodReportBatchId)
router.get('/eod-report-routeName', TokenMiddleware.Authorize, ReportController.eodReportRouteName)
router.get('/payment-report', TokenMiddleware.Authorize, ReportController.paymentReport)
router.get('/delivery-window-cs', TokenMiddleware.Authorize, ReportController.deliveryWindowCS)
router.get('/delivery-window-am', TokenMiddleware.Authorize, ReportController.deliveryWindowAM)
router.post('/open-restaurrants-form', TokenMiddleware.Authorize, ReportController.openRestaurrantsForm)
router.put('/modify-knife-inventory', TokenMiddleware.Authorize, ReportController.modifyKnifeQuantify)
router.put('/modify-program', TokenMiddleware.Authorize, ReportController.modifyProgram)

//drivers
router.get("/drivers", TokenMiddleware.Authorize, RouteController.getDrivers)
router.put("/end-route", TokenMiddleware.Authorize, RouteController.endRoute)

//Survey
router.get("/survey", TokenMiddleware.Authorize, SurveyController.getSurvey);
router.get("/survey-questions", TokenMiddleware.Authorize, SurveyController.getSurveyQuestion);
router.post("/save-servey-answer", TokenMiddleware.Authorize, SurveyController.saveSurveyAnswer);
router.get('/survey-detail-am', TokenMiddleware.Authorize, SurveyController.getSurveyDetailAM)
router.post('/create-survey', TokenMiddleware.Authorize, SurveyController.createSurvey)
router.put('/update-survey', TokenMiddleware.Authorize, SurveyController.updateSurvey)
router.get('/past-survey', TokenMiddleware.Authorize, SurveyController.pastSurvey)
router.get('/survey-by-id', TokenMiddleware.Authorize, SurveyController.getSurveyById)

//customer
router.get("/customers", TokenMiddleware.Authorize, CustomerController.getCustomers)
router.get("/customer-by-id", TokenMiddleware.Authorize, CustomerController.getCustomerById)
router.post("/location-change-request", TokenMiddleware.Authorize, CustomerController.locationChangeRequest)
router.get("/customer-contacts", TokenMiddleware.Authorize, CustomerController.getCustomerContacts)
router.get("/customer-by-routename", TokenMiddleware.Authorize, CustomerController.getCustomerByRouteName)
router.get("/customer-note", TokenMiddleware.Authorize, CustomerController.getCustomerNote)
router.put("/update-customer-note", TokenMiddleware.Authorize, CustomerController.updateCustomerNote)
router.post("/email-invoices", TokenMiddleware.Authorize, CustomerController.emailInvoices)
router.post("/add-customer-card", TokenMiddleware.Authorize, CustomerController.addCustomerCard)

router.get("/customer-contact-list", TokenMiddleware.Authorize, CustomerController.customerContactList)
router.get("/customer-detail-am", TokenMiddleware.Authorize, CustomerController.customerDetailsAM)
router.get('/driver-today-report', TokenMiddleware.Authorize, CustomerController.driverTodayReport)
router.get('/customer-survey', TokenMiddleware.Authorize, CustomerController.getCustomerSurvey)

// router.post("/add-customer-contact", TokenMiddleware.Authorize, yCustomerController.addCustomerContact)
router.post("/add-customer-contact", TokenMiddleware.Authorize, CustomerController.addCustomerContact)
router.post("/delete-customer-contact", TokenMiddleware.Authorize, CustomerController.deleteCustomerContact)

//start delivery 
router.get("/order-details", TokenMiddleware.Authorize, OrdersController.getOrderDetails);
router.post("/complete-delivery", TokenMiddleware.Authorize, OrdersController.savePayment);
router.get("/complete-route-details", TokenMiddleware.Authorize, OrdersController.completeRouteDetails);
router.post("/complete-route", TokenMiddleware.Authorize, OrdersController.completeRoute);
router.put("/quantity-update", TokenMiddleware.Authorize, OrdersController.inventoryQuantityUpdate);

//master
router.get("/master-data", TokenMiddleware.Authorize, MasterDataController.getMasterData);
router.get('/master-request-data', TokenMiddleware.Authorize, MasterDataController.getMasterRequests)
router.post("/master-save-payment", TokenMiddleware.Authorize, MasterDataController.masterSavePayment);

//notification
router.get('/notification-list', TokenMiddleware.Authorize, NotificationController.getNotificationList)
router.get('/notification-filter-data', TokenMiddleware.Authorize,  NotificationController.getNotificationFilterData)
router.get('/notification-filter-value-based-data', TokenMiddleware.Authorize,  NotificationController.getNotificationFilterValueBasedData)
router.get('/notification-orders', TokenMiddleware.Authorize,  NotificationController.getNotificationOrders)
router.post('/notification-save', TokenMiddleware.Authorize, NotificationController.saveNotifications)
router.put('/read-notification', TokenMiddleware.Authorize, NotificationController.readNotifications)
router.get('/notification-by-route-id', TokenMiddleware.Authorize, NotificationController.getNotificationByBatchId)

//Employee
router.post('/driver-health-log', TokenMiddleware.Authorize, EmployeeController.saveDriverHealthLog)
module.exports = router;

