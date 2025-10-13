import cors from "cors";
import { config } from "dotenv";
import express from "express";
import logger from "morgan";
import path from "path";
import "reflect-metadata"; // typeDI 需要
import { fileURLToPath } from "url";

// import indexRouterDemo from './routes/demo/index-demo';
// import usersRouterDemo from './routes/demo/users-demo';

import { uploadRouter } from "./routes/file-upload-router";
import { indexRouter } from "./routes/index-router";
import { menuRouter } from "./routes/sys-menu-router";
import { roleRouter } from "./routes/sys-role-router";
import { userRouter } from "./routes/sys-user-router";

import { startScheduledTask } from "@/tasks/OrderStatisticsTask";
import { globalErrorHandlingMW, loginAuthenticationMW } from "./middlewares/common-middleware";
import { brandRouter } from "./routes/brand-router";
import { categoryBrandRouter } from "./routes/category-brand-router";
import { categoryRouter } from "./routes/category-router";
import { orderInfoRouter } from "./routes/order-info-router";
import { productRouter } from "./routes/product-router";
import { productSpecRouter } from "./routes/product-spec-router";
import { productUnitRouter } from "./routes/product-unit-router";

const app = express();
export default app;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * dotenv configuration
 * Specify custom .env path
 */
config({ path: ".env" });

// Initialize scheduled tasks
startScheduledTask();

// app.use(nocache()); // Disable caching for all routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add CORS middleware - place this before your routes
app.use(
	cors({
		origin: ["http://localhost:3001"], // Allow requests from your frontend
		credentials: true, // Allow cookies/auth headers
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "token"], // Add any custom headers you use
	})
);

// Disable caching for all routes for debugging purposes.
app.use((req, res, next) => {
	res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
	res.set("Pragma", "no-cache");
	res.set("Expires", "0");
	next();
});

// Test exception handling
app.get("/error-test", (req, res, next) => {
	// Simulate an error
	throw new Error("Test error handling");
});

app.get("/error-test2", (req, res, next) => {
	setTimeout(() => {
		try {
			throw new Error("-------------------BROKEN---------------------------------");
		} catch (err) {
			next(err);
		}
	}, 100);
});

app.get("/error-test3", (req, res, next) => {
	setTimeout(() => {
		throw new Error("-------------------BROKEN---------------------------------");
	}, 100);
});

app.get("/error-test4", (req, res, next) => {
	Promise.resolve().then(() => {
		throw new Error("-------------------BROKEN---------------------------------");
	});
	// .catch(err => next(err));
});

// Login Authentication Middleware
app.use(loginAuthenticationMW);

// app.use('/', indexRouterDemo);
// app.use('/users', usersRouterDemo);

/** routers */
// 用户接口
app.use("/admin/system/index", indexRouter);

//菜单接口
app.use("/admin/system/sysMenu", menuRouter);

// 角色接口
app.use("/admin/system/sysRole", roleRouter);

// 用户接口
app.use("/admin/system/sysUser", userRouter);

// 文件上传接口
app.use("/admin/system", uploadRouter);

// 商品分类接口
app.use("/admin/product/category", categoryRouter);

// 品牌接口
app.use("/admin/product/brand", brandRouter);

// 分类和品牌关系接口
app.use("/admin/product/categoryBrand", categoryBrandRouter);

// 商品规格管理接口
app.use("/admin/product/productSpecs", productSpecRouter);

// 商品管理接口
app.use("/admin/product/product", productRouter);

// 商品单位接口
app.use("/admin/product/productUnit", productUnitRouter);

// 订单信息管理接口
app.use('/admin/order/orderInfo', orderInfoRouter);

// Global Error Handling Middleware
app.use(globalErrorHandlingMW);


