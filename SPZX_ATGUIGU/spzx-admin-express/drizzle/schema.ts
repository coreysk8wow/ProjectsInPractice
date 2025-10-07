import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, bigint, varchar, timestamp, tinyint, int, decimal, date, datetime, char, index, text, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const brand = mysqlTable("brand", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	name: varchar({ length: 100 }),
	logo: varchar({ length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "brand_id" }),
	]);

export const category = mysqlTable("category", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	name: varchar({ length: 50 }),
	imageUrl: varchar("image_url", { length: 200 }),
	parentId: bigint("parent_id", { mode: "number" }),
	status: tinyint(),
	orderNum: int("order_num"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "category_id" }),
	]);

export const categoryBrand = mysqlTable("category_brand", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	brandId: bigint("brand_id", { mode: "number" }),
	categoryId: bigint("category_id", { mode: "number" }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "category_brand_id" }),
	]);

export const couponInfo = mysqlTable("coupon_info", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	couponType: tinyint("coupon_type").default(1).notNull(),
	couponName: varchar("coupon_name", { length: 100 }),
	amount: decimal({ precision: 10, scale: 2 }).default('0.00').notNull(),
	conditionAmount: decimal("condition_amount", { precision: 10, scale: 2 }).default('0.00').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startTime: date("start_time", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endTime: date("end_time", { mode: 'string' }),
	rangeType: tinyint("range_type").default(1).notNull(),
	rangeDesc: varchar("range_desc", { length: 200 }),
	publishCount: int("publish_count").default(1).notNull(),
	perLimit: int("per_limit").default(1).notNull(),
	useCount: int("use_count").default(0).notNull(),
	receiveCount: int("receive_count").default(0).notNull(),
	expireTime: datetime("expire_time", { mode: 'string' }),
	publishStatus: tinyint("publish_status"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "coupon_info_id" }),
	]);

export const couponRange = mysqlTable("coupon_range", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	couponId: bigint("coupon_id", { mode: "number" }).notNull(),
	rangeType: tinyint("range_type").default(1).notNull(),
	rangeId: bigint("range_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "coupon_range_id" }),
	]);

export const couponUser = mysqlTable("coupon_user", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	couponId: bigint("coupon_id", { mode: "number" }),
	userId: bigint("user_id", { mode: "number" }),
	orderId: bigint("order_id", { mode: "number" }),
	couponStatus: tinyint("coupon_status"),
	getType: tinyint("get_type").default(2).notNull(),
	getTime: datetime("get_time", { mode: 'string' }),
	usingTime: datetime("using_time", { mode: 'string' }),
	usedTime: datetime("used_time", { mode: 'string' }),
	expireTime: datetime("expire_time", { mode: 'string' }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "coupon_user_id" }),
	]);

export const orderInfo = mysqlTable("order_info", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	nickName: varchar("nick_name", { length: 200 }),
	orderNo: char("order_no", { length: 64 }).default('').notNull(),
	couponId: bigint("coupon_id", { mode: "number" }),
	totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).default('0.00').notNull(),
	couponAmount: decimal("coupon_amount", { precision: 10, scale: 2 }).default('0.00').notNull(),
	originalTotalAmount: decimal("original_total_amount", { precision: 10, scale: 2 }).default('0.00').notNull(),
	feightFee: decimal("feight_fee", { precision: 10, scale: 2 }).default('0.00').notNull(),
	payType: tinyint("pay_type"),
	orderStatus: tinyint("order_status").default(0).notNull(),
	receiverName: varchar("receiver_name", { length: 100 }),
	receiverPhone: varchar("receiver_phone", { length: 32 }),
	receiverTagName: varchar("receiver_tag_name", { length: 32 }),
	receiverProvince: bigint("receiver_province", { mode: "number" }),
	receiverCity: bigint("receiver_city", { mode: "number" }),
	receiverDistrict: bigint("receiver_district", { mode: "number" }),
	receiverAddress: varchar("receiver_address", { length: 200 }),
	paymentTime: datetime("payment_time", { mode: 'string' }),
	deliveryTime: datetime("delivery_time", { mode: 'string' }),
	receiveTime: datetime("receive_time", { mode: 'string' }),
	remark: varchar({ length: 500 }),
	cancelTime: datetime("cancel_time", { mode: 'string' }),
	cancelReason: varchar("cancel_reason", { length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "order_info_id" }),
	]);

export const orderItem = mysqlTable("order_item", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	orderId: bigint("order_id", { mode: "number" }),
	skuId: bigint("sku_id", { mode: "number" }),
	skuName: varchar("sku_name", { length: 255 }),
	thumbImg: varchar("thumb_img", { length: 500 }),
	skuPrice: decimal("sku_price", { precision: 10, scale: 2 }),
	skuNum: int("sku_num"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "order_item_id" }),
	]);

export const orderLog = mysqlTable("order_log", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	orderId: bigint("order_id", { mode: "number" }),
	operateUser: varchar("operate_user", { length: 100 }),
	processStatus: int("process_status"),
	note: varchar({ length: 500 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "order_log_id" }),
	]);

export const orderStatistics = mysqlTable("order_statistics", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	provinceCode: varchar("province_code", { length: 20 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	orderDate: date("order_date", { mode: 'string' }),
	totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
	totalNum: int("total_num"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "order_statistics_id" }),
	]);

export const paymentInfo = mysqlTable("payment_info", {
	id: int().autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }),
	orderNo: varchar("order_no", { length: 50 }).default('').notNull(),
	payType: tinyint("pay_type").default(0).notNull(),
	outTradeNo: varchar("out_trade_no", { length: 50 }),
	amount: decimal({ precision: 10, scale: 2 }),
	content: varchar({ length: 200 }),
	paymentStatus: char("payment_status", { length: 4 }),
	callbackTime: datetime("callback_time", { mode: 'string' }),
	callbackContent: text("callback_content"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		index("uniq_order_no").on(table.orderNo),
		primaryKey({ columns: [table.id], name: "payment_info_id" }),
	]);

export const product = mysqlTable("product", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	name: varchar({ length: 255 }),
	brandId: bigint("brand_id", { mode: "number" }),
	category1Id: bigint("category1_id", { mode: "number" }),
	category2Id: bigint("category2_id", { mode: "number" }),
	category3Id: bigint("category3_id", { mode: "number" }),
	unitName: varchar("unit_name", { length: 50 }),
	sliderUrls: text("slider_urls"),
	specValue: varchar("spec_value", { length: 255 }),
	status: tinyint().default(0).notNull(),
	auditStatus: tinyint("audit_status").default(0).notNull(),
	auditMessage: varchar("audit_message", { length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_id" }),
	]);

export const productAttr = mysqlTable("product_attr", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	productId: bigint("product_id", { mode: "number" }),
	attrKey: varchar("attr_key", { length: 255 }),
	attrValue: varchar("attr_value", { length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_attr_id" }),
	]);

export const productDetails = mysqlTable("product_details", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	productId: bigint("product_id", { mode: "number" }),
	imageUrls: text("image_urls"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_details_id" }),
	]);

export const productSku = mysqlTable("product_sku", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	skuCode: varchar("sku_code", { length: 30 }),
	skuName: varchar("sku_name", { length: 255 }),
	productId: bigint("product_id", { mode: "number" }),
	thumbImg: varchar("thumb_img", { length: 255 }),
	salePrice: decimal("sale_price", { precision: 10, scale: 2 }),
	marketPrice: decimal("market_price", { precision: 10, scale: 2 }),
	costPrice: decimal("cost_price", { precision: 10, scale: 2 }),
	stockNum: int("stock_num"),
	saleNum: int("sale_num").default(0).notNull(),
	skuSpec: varchar("sku_spec", { length: 255 }).default(''),
	weight: decimal({ precision: 10, scale: 2 }),
	volume: decimal({ precision: 10, scale: 2 }),
	status: tinyint(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_sku_id" }),
	]);

export const productSpec = mysqlTable("product_spec", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	specName: varchar("spec_name", { length: 100 }),
	specValue: text("spec_value"),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_spec_id" }),
	]);

export const productUnit = mysqlTable("product_unit", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	name: varchar({ length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "product_unit_id" }),
	]);

export const region = mysqlTable("region", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	code: varchar({ length: 10 }),
	parentCode: bigint("parent_code", { mode: "number" }),
	name: varchar({ length: 20 }),
	level: int(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "region_id" }),
		unique("idx_code").on(table.code),
	]);

export const sysLoginLog = mysqlTable("sys_login_log", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	username: varchar({ length: 50 }).default(''),
	ipaddr: varchar({ length: 128 }).default(''),
	status: tinyint().default(0),
	msg: varchar({ length: 255 }).default(''),
	accessTime: datetime("access_time", { mode: 'string' }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).onUpdateNow(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "sys_login_log_id" }),
	]);

export const sysMenu = mysqlTable("sys_menu", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	parentId: bigint("parent_id", { mode: "number" }).notNull(),
	title: varchar({ length: 20 }).default('').notNull(),
	component: varchar({ length: 100 }),
	sortValue: int("sort_value").default(1).notNull(),
	status: tinyint().default(1).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		index("idx_parent_id").on(table.parentId),
		primaryKey({ columns: [table.id], name: "sys_menu_id" }),
	]);

export const sysOperLog = mysqlTable("sys_oper_log", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	title: varchar({ length: 50 }).default(''),
	method: varchar({ length: 100 }).default(''),
	requestMethod: varchar("request_method", { length: 10 }).default(''),
	operatorType: varchar("operator_type", { length: 20 }).default('0'),
	operName: varchar("oper_name", { length: 50 }).default(''),
	operUrl: varchar("oper_url", { length: 255 }).default(''),
	operIp: varchar("oper_ip", { length: 128 }).default(''),
	operParam: varchar("oper_param", { length: 2000 }).default(''),
	jsonResult: varchar("json_result", { length: 2000 }).default(''),
	status: int().default(0),
	errorMsg: varchar("error_msg", { length: 2000 }).default(''),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).onUpdateNow(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "sys_oper_log_id" }),
	]);

export const sysRole = mysqlTable("sys_role", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	roleName: varchar("role_name", { length: 20 }).default('').notNull(),
	roleCode: varchar("role_code", { length: 20 }),
	description: varchar({ length: 255 }),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "sys_role_id" }),
	]);

export const sysRoleMenu = mysqlTable("sys_role_menu", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	roleId: bigint("role_id", { mode: "number" }).notNull(),
	menuId: bigint("menu_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
	isHalf: tinyint("is_half"),
},
	(table) => [
		index("idx_role_id").on(table.roleId),
		index("idx_menu_id").on(table.menuId),
		primaryKey({ columns: [table.id], name: "sys_role_menu_id" }),
	]);

export const sysUser = mysqlTable("sys_user", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	username: varchar({ length: 20 }).default('').notNull(),
	password: varchar({ length: 32 }).default('').notNull(),
	name: varchar({ length: 50 }),
	phone: varchar({ length: 11 }),
	avatar: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	status: tinyint().default(1).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "sys_user_id" }),
	]);

export const sysUserRole = mysqlTable("sys_user_role", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	roleId: bigint("role_id", { mode: "number" }).notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		index("idx_role_id").on(table.roleId),
		index("idx_admin_id").on(table.userId),
		primaryKey({ columns: [table.id], name: "sys_user_role_id" }),
	]);

export const userAddress = mysqlTable("user_address", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").default(0).notNull(),
	name: varchar({ length: 20 }).default('').notNull(),
	phone: varchar({ length: 11 }).default('').notNull(),
	tagName: varchar("tag_name", { length: 20 }),
	provinceCode: varchar("province_code", { length: 20 }),
	cityCode: varchar("city_code", { length: 20 }),
	districtCode: varchar("district_code", { length: 20 }),
	address: varchar({ length: 100 }).default('').notNull(),
	fullAddress: varchar("full_address", { length: 500 }),
	isDefault: tinyint("is_default").default(1).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "user_address_id" }),
	]);

export const userBrowseHistory = mysqlTable("user_browse_history", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	skuId: bigint("sku_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		index("idx_user_id").on(table.userId),
		primaryKey({ columns: [table.id], name: "user_browse_history_id" }),
	]);

export const userCollect = mysqlTable("user_collect", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	userId: bigint("user_id", { mode: "number" }).notNull(),
	skuId: bigint("sku_id", { mode: "number" }).notNull(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		index("idx_user_id").on(table.userId),
		primaryKey({ columns: [table.id], name: "user_collect_id" }),
	]);

export const userInfo = mysqlTable("user_info", {
	id: bigint({ mode: "number" }).autoincrement().notNull(),
	username: varchar({ length: 50 }),
	password: varchar({ length: 500 }),
	nickName: varchar("nick_name", { length: 100 }),
	phone: varchar({ length: 17 }),
	avatar: varchar({ length: 200 }),
	sex: tinyint(),
	memo: varchar({ length: 100 }),
	openId: varchar("open_id", { length: 45 }),
	unionId: varchar("union_id", { length: 45 }),
	lastLoginIp: varchar("last_login_ip", { length: 50 }),
	lastLoginTime: datetime("last_login_time", { mode: 'string' }),
	status: tinyint(),
	createTime: timestamp("create_time", { mode: 'string' }).defaultNow().notNull(),
	updateTime: timestamp("update_time", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	isDeleted: tinyint("is_deleted").default(0).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "user_info_id" }),
	]);
