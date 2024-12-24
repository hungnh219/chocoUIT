const Order = require("../models/order")
const User = require("../models/user")
const Coupon = require("../models/coupon")
const asyncHandler = require("express-async-handler")

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { products, total, address, status } = req.body
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] })
  }
  const data = { products, total, orderBy: _id }
  if (status) data.status = status
  const rs = await Order.create(data)
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  })
})
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params
  const { status } = req.body
  if (!status) throw new Error("Missing status")
  const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  })
})

// get user order by id
const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query }
  console.log("queries", queries)
  const { _id } = req.user
  console.log(_id);
  console.log(typeof(_id));
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"]
  excludeFields.forEach((el) => delete queries[el])

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries)
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  )
  const formatedQueries = JSON.parse(queryString)
  console.log("formatedQueries", formatedQueries)
  const qr = { ...formatedQueries, orderBy: _id }
  console.log("qr", qr)
  let queryCommand = Order.find(qr)
  // console.log("queryCommand", queryCommand)

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    queryCommand = queryCommand.sort(sortBy)
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ")
    queryCommand = queryCommand.select(fields)
  }

  // Pagination
  const page = +req.query.page || 1
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
  const skip = (page - 1) * limit
  queryCommand.skip(skip).limit(limit)
  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message)
    const counts = await Order.find(qr).countDocuments()
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    })
  })
})

// get all user orders
const getAllUserOrders = asyncHandler(async (req, res) => {
  console.log("req", req)
  const queries = { ...req.query }
  console.log("queries", queries)
  // const userIds = req.query.userIds ? req.query.userIds.split(',') : [];
  const userIds = ["66345e2cce540bed4517751c", "66345e2cce540bed4517751f"]

  const excludeFields = ["limit", "sort", "page", "fields", "userIds"]
  excludeFields.forEach(el => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
  const formatedQueries = JSON.parse(queryString);
  console.log("formatedQueries", formatedQueries)

  const qr = { ...formatedQueries, orderBy: { $in: userIds } };
  console.log("qr", qr)

  let queryCommand = Order.find(qr);
  console.log("queryCommand", queryCommand)

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(qr).countDocuments();
    res.status(200).json({
      success: !!response,
      counts,
      orders: response || "Cannot get products",
    });
  });
})

const getOrders = asyncHandler(async (req, res) => {
  console.log("get all?")
  const queries = { ...req.query }
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"]
  excludeFields.forEach((el) => delete queries[el])

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries)
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  )
  const formatedQueries = JSON.parse(queryString)
  // let colorQueryObject = {}
  // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
  // if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
  // if (queries?.color) {
  //     delete formatedQueries.color
  //     const colorArr = queries.color?.split(',')
  //     const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }))
  //     colorQueryObject = { $or: colorQuery }
  // }
  // let queryObject = {}
  // if (queries?.q) {
  //     delete formatedQueries.q
  //     queryObject = {
  //         $or: [
  //             { color: { $regex: queries.q, $options: 'i' } },
  //             { title: { $regex: queries.q, $options: 'i' } },
  //             { category: { $regex: queries.q, $options: 'i' } },
  //             { brand: { $regex: queries.q, $options: 'i' } },
  //             { description: { $regex: queries.q, $options: 'i' } },
  //         ]
  //     }
  // }
  const qr = { ...formatedQueries }
  let queryCommand = Order.find(qr)

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    queryCommand = queryCommand.sort(sortBy)
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ")
    queryCommand = queryCommand.select(fields)
  }

  // Pagination
  const page = +req.query.page || 1
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
  const skip = (page - 1) * limit
  queryCommand.skip(skip).limit(limit)
  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message)
    const counts = await Order.find(qr).countDocuments()
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    })
  })
})
const momopayment=async (req, res) => {
  const { priceGlobal } = req.body;
  console.log("price: "+priceGlobal);
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  // chuỗi ngẫu nhiên để phân biệt cái request
  var requestId = partnerCode + new Date().getTime() + "id";
  // mã đặt đơn
  var orderId = new Date().getTime() + ":0123456778";
  //
  var orderInfo = "Thanh toán qua ví MoMo";
  // cung cấp họ về một cái pages sau khi thanh toán sẽ trở về trang nớ
  var redirectUrl = "https://clever-tartufo-c324cd.netlify.app/pages/home.html";
  // Trang thank you
  var ipnUrl = "https://clever-tartufo-c324cd.netlify.app/pages/home.html";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  // số tiền
  var amount = priceGlobal;
  // var requestType = "payWithATM";
  // show cái thông tin thẻ, cái dưới quét mã, cái trên điền form
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  // thư viện node js , model tích họp ,liên quan đến mã hóa, giải mã và bảo mật, cung cấp chức năng và phương thức sử lý dữ liệu liên quan đến mật mã
  const crypto = require("crypto");
  var signature = crypto
    // thuật toán tạo ra mới với tham số là secretkey
    .createHmac("sha256", secretkey)
    // thêm biến rawSignature vào băm
    .update(rawSignature)
    // tạo chữ kí và chuyển sang mã hex
    .digest("hex");

  //json object send to MoMo endpoint, gửi cái aip của momo
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  //Create the HTTPS objects, tạo sever, https để call cái aip khác, call tới momo
  const https = require("https");
  // yêu cầu truyền đi
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const reqq = https.request(options, (resMom) => {
    console.log(`Status: ${resMom.statusCode}`);
    console.log(`Headers: ${JSON.stringify(resMom.headers)}`);
    resMom.setEncoding("utf8");
    // trả về body là khi mình call momo
    resMom.on("data", (body) => {
      // url dẫn đến tranh toán của momo
      console.log(JSON.parse(body).payUrl);
      res.json({ payUrl: JSON.parse(body).payUrl });
    });
    resMom.on("end", () => {
      console.log("No more data in response.");
    });
  });

  reqq.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  reqq.write(requestBody);
  reqq.end();
}
module.exports = {
  createOrder,
  updateStatus,
  getUserOrders,
  getAllUserOrders,
  getOrders,
  momopayment
}
